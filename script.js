// grid_editor.js
import machineData from './machine_data.js';

document.addEventListener('DOMContentLoaded', () => {
    let selectedImage = 'Black_Square32.jpg';
    let lastClicked = null;
    let globalRotationCount = 0;
    let machineIdCounter = 1;
    let currentHoverCell = null;
    let isMouseDown = false;

    let showPreviewtoggle = true;  // Default to showing preview
    let allowPlacementOver = true;  // Default to allowing placement over machines



    // Load toggle settings from localStorage
    showPreviewtoggle = localStorage.getItem('showPreview') === 'false' ? false : true;
    allowPlacementOver = localStorage.getItem('allowOverlap') === 'false' ? false : true;

    // Set the checkbox states to match loaded settings
    document.getElementById('toggle-preview').checked = showPreviewtoggle;
    document.getElementById('toggle-overlap').checked = allowPlacementOver;

    document.addEventListener('mousedown', () => isMouseDown = true);
    document.addEventListener('mouseup', () => isMouseDown = false);
    
    // Filtering functionality
    document.querySelectorAll('#filter-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            document.querySelectorAll('#image-selector img').forEach(img => {
                if (filter === 'all' || img.dataset.category === filter) {
                    img.style.display = '';
                } else {
                    img.style.display = 'none';
                }
            });

            // Optional: highlight the active filter button
            document.querySelectorAll('#filter-buttons button').forEach(b => b.classList.remove('active-filter'));
            button.classList.add('active-filter');
        });
    });

    
    function rotateMatrix(matrix, rotationCount) {
        let result = matrix;
        for (let i = 0; i < (rotationCount % 4 + 4) % 4; i++) {
            result = result[0].map((_, idx) => result.map(row => row[idx]).reverse());
        }
        return result;
    }

    function rotateCoords(x, y, rotation, width, height) {
        switch (rotation % 4) {
            case 0: return [y, x];
            case 1: return [x, height - 1 - y];
            case 2: return [height - 1 - y, width - 1 - x];
            case 3: return [width - 1 - x, y];
        }
    }
      

    document.querySelectorAll('#image-selector img').forEach(img => {
        img.addEventListener('click', () => {
            selectedImage = img.dataset.img;
            document.querySelectorAll('#image-selector img').forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
        });
        const selectorImages = document.querySelectorAll('#image-selector img');
    
        selectorImages.forEach(img => {
            if (img.complete) {
                handleImageSize(img);
            } else {
                img.onload = () => handleImageSize(img);
            }
        });
    });
    
    function handleImageSize(img) {
        if (img.naturalWidth === 32 && img.naturalHeight === 32) {
            img.classList.add('small-img');
        } else {
            img.classList.add('large-img');
            img.classList.remove('small-img');  // Just in case it was wrongly applied
        }
    }

    function clickableGrid(rows, cols, callback) {
        let i = 0;
        const grid = document.createElement('table');
        grid.className = 'grid';
        
        for (let r = 0; r < rows; r++) {
            const tr = grid.appendChild(document.createElement('tr'));
            for (let c = 0; c < cols; c++) {
                const cell = tr.appendChild(document.createElement('td'));
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.style.backgroundImage = "url('Images/Black_Square32.jpg')"; 
                tile.dataset.rotationCount = '0';
                tile.dataset.machineId = '';
                cell.appendChild(tile);

                const preview = document.createElement('div');
                preview.classList.add('preview');
                tile.appendChild(preview);

                cell.addEventListener('mouseenter', () => {
                    currentHoverCell = { row: r, col: c };
                    showPreview(r, c);
                    if (isMouseDown && dragPlacementEnabled) {
                        placeMachine(r, c);
                        callback(cell, r, c, i);
                    }
                });

                cell.addEventListener('mouseleave', () => {
                    currentHoverCell = null;
                    clearPreview();
                });

                cell.addEventListener('click', () => {
                    placeMachine(r, c);
                    callback(cell, r, c, i);
                });

                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    const tile = cell.querySelector('.tile');
                    tile.style.backgroundImage = "url('Images/Black_Square32.jpg')";
                    tile.style.backgroundPosition = "0px 0px";
                    tile.dataset.rotationCount = '0';
                    tile.style.transform = 'rotate(0deg)';
                    tile.dataset.machineId = '';
                    callback(cell, r, c, i);
                });

                i++;
            }
        }
        // Disable dragging on all tiles
        disableTileDragging();
        
        return grid;
    }
    
    function generateUniqueMachineId() {
        let id = `machine-${machineIdCounter++}`;
        // Check if the ID already exists
        while (document.querySelector(`[data-machine-id="${id}"]`)) {
            id = `machine-${machineIdCounter++}`;  // Increment and try again if the ID exists
        }
        return id;
    }
    
    function placeMachine(r, c) {
        const machine = machineData[selectedImage];
        if (!machine) return;
    
        const originalShape = machine.shape;
        const shapeRows = originalShape.length;
        const shapeCols = originalShape[0].length;
        const allRows = Array.from(document.querySelectorAll('.grid tr'));
    
        // Generate a unique machine ID
        const machineId = generateUniqueMachineId();
    
        // First check placement validity
        let canPlace = true;
        for (let y = 0; y < shapeRows; y++) {
            for (let x = 0; x < shapeCols; x++) {
                if (originalShape[y][x] === 1) {
                    const [dy, dx] = rotateCoords(x, y, globalRotationCount, shapeCols, shapeRows);
                    const row = r + dy;
                    const col = c + dx;
                    const tile = allRows[row]?.children[col]?.querySelector('.tile');
                    if (tile && tile.dataset.machineId && !allowPlacementOver) {
                        canPlace = false;
                        break;
                    }
                }
            }
        }
    
        // Collect all machine IDs that would be overlapped
        const machinesToRemove = new Set();
        for (let y = 0; y < shapeRows; y++) {
            for (let x = 0; x < shapeCols; x++) {
                if (originalShape[y][x] === 1) {
                    const [dy, dx] = rotateCoords(x, y, globalRotationCount, shapeCols, shapeRows);
                    const row = r + dy;
                    const col = c + dx;
                    const tile = allRows[row]?.children[col]?.querySelector('.tile');
                    const existingMachineId = tile?.dataset.machineId;
    
                    if (existingMachineId) {
                        machinesToRemove.add(existingMachineId);
                    }
                }
            }
        }
    
        // Remove all parts of the machines that overlap
        if (allowPlacementOver) {
            for (const row of allRows) {
                for (const cell of row.children) {
                    const tile = cell.querySelector('.tile');
                    if (tile && machinesToRemove.has(tile.dataset.machineId)) {
                        tile.style.backgroundImage = '';
                        tile.style.backgroundPosition = '';
                        tile.style.transform = '';
                        delete tile.dataset.machineId;
                        delete tile.dataset.rotationCount;
                    }
                }
            }
        }
    
        // If placement is not allowed, return early
        if (!canPlace) return;
    
        // Place the new machine
        for (let y = 0; y < shapeRows; y++) {
            for (let x = 0; x < shapeCols; x++) {
                if (originalShape[y][x] === 1) {
                    const cropX = x;
                    const cropY = y;
    
                    const [dy, dx] = rotateCoords(cropX, cropY, globalRotationCount, shapeCols, shapeRows);
                    const row = r + dy;
                    const col = c + dx;
                    const targetTile = allRows[row]?.children[col]?.querySelector('.tile');
                    if (!targetTile) continue;
    
                    targetTile.dataset.machineId = machineId;
                    targetTile.dataset.rotationCount = globalRotationCount;
                    targetTile.style.transform = `rotate(${globalRotationCount * 90}deg)`;
                    targetTile.style.backgroundImage = `url('Images/${selectedImage}')`;
                    targetTile.style.backgroundPosition = `-${cropX * 32}px -${cropY * 32}px`;
                }
            }
        }
    }
    
    
    function rotateCoordsBack(x, y, rotation, width, height) {
        switch (rotation % 4) {
            case 0: return [x, y];
            case 1: return [y, width - 1 - x];
            case 2: return [width - 1 - x, height - 1 - y];
            case 3: return [height - 1 - y, x];
        }
    }

    function showPreview(startRow, startCol) {
        if (!showPreviewtoggle) return;  // If the preview is disabled, do nothing.
    
        const machine = machineData[selectedImage];
        if (!machine) return;
    
        const shape = rotateMatrix(machine.shape, globalRotationCount);
        const shapeRows = shape.length;
        const shapeCols = shape[0].length;
        const allRows = Array.from(document.querySelectorAll('.grid tr'));
    
        let valid = true;
        const previewCells = [];
    
        for (let y = 0; y < shapeRows; y++) {
            for (let x = 0; x < shapeCols; x++) {
                if (shape[y][x] === 1) {
                    const row = startRow + y;
                    const col = startCol + x;
    
                    if (row >= allRows.length || col >= allRows[row].children.length) {
                        valid = false;
                        continue;
                    }
    
                    const tile = allRows[row].children[col].querySelector('.tile');
                    const preview = tile.querySelector('.preview');
    
                    if (!allowPlacementOver && tile.dataset.machineId) {
                        valid = false;
                    }
    
                    preview.style.opacity = '1';
                    previewCells.push(preview);
                }
            }
        }
    
        previewCells.forEach(preview => {
            preview.style.backgroundColor = valid
                ? 'rgba(0, 255, 0, 0.3)'
                : 'rgba(255, 0, 0, 0.4)';
        });
    }

    function clearPreview() {
        document.querySelectorAll('.preview').forEach(p => {
            p.style.opacity = '0';
            p.classList.remove('preview-error');
        });
    }

    const gridContainer = document.getElementById('grid-container');
    const grid = clickableGrid(30, 30, (el, r, c, i) => {
        lastClicked = el;
    });
    gridContainer.appendChild(grid);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            globalRotationCount = (globalRotationCount + 1) % 4;
        } else if (e.key === 'l' || e.key === 'L') {
            globalRotationCount = (globalRotationCount + 3) % 4;
        }

        if (currentHoverCell) {
            clearPreview();
            showPreview(currentHoverCell.row, currentHoverCell.col);
        }
    });

    function removeMachine(machineId) {
        document.querySelectorAll('.grid td').forEach(cell => {
            const tile = cell.querySelector('.tile');
            if (tile && tile.dataset.machineId === machineId) {
                tile.style.backgroundImage = "url('Images/Black_Square32.jpg')";
                tile.style.backgroundPosition = "0px 0px";
                tile.dataset.rotationCount = '0';
                tile.style.transform = 'rotate(0deg)';
                tile.dataset.machineId = '';
            }
        });
    }


    
    const togglePreview = document.getElementById('toggle-preview');
    const togglePlacementOver = document.getElementById('toggle-overlap');
   
    // Listen for changes to the placement preview toggle
    togglePreview.addEventListener('change', () => {
    showPreviewtoggle = togglePreview.checked;
    localStorage.setItem('showPreview', showPreviewtoggle);  // Save to localStorage
    // Optionally, you could re-render the preview if needed
    if (currentHoverCell) {
        clearPreview();
        showPreview && showPreview(currentHoverCell.row, currentHoverCell.col);
    }
    });

    // Listen for changes to the allow placement over other machines toggle
    togglePlacementOver.addEventListener('change', () => {
        allowPlacementOver = togglePlacementOver.checked;
        localStorage.setItem('allowOverlap', allowPlacementOver);  // Save to localStorage
    });

    // Initialize the drag placement toggle based on localStorage or default to true
    let dragPlacementEnabled = localStorage.getItem('dragPlacement') !== 'false';

    // Set the checkbox state on page load
    document.getElementById('toggle-drag').checked = dragPlacementEnabled;

    // Update the variable and localStorage when the checkbox state changes
    document.getElementById('toggle-drag').addEventListener('change', (e) => {
    dragPlacementEnabled = e.target.checked;
    localStorage.setItem('dragPlacement', dragPlacementEnabled);
    });

    function disableTileDragging() {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.setAttribute('draggable', 'false');
            tile.addEventListener('dragstart', e => e.preventDefault());
        });
    }    

});

// Saving and Loading 
document.getElementById('saveButton').addEventListener('click', saveGridState);
document.getElementById('load-button').addEventListener('click', () => {
    document.getElementById('load-file').click();
});

document.getElementById('load-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = e.target.result;
            loadGridState(json); // call the function below
        } catch (err) {
            console.error("Failed to load grid:", err);
        }
    };
    reader.readAsText(file);
});

// Function to save the current grid state
export function saveGridState() {
    const rows = document.querySelectorAll('.grid tr');
    const data = Array.from(rows).map(row => {
        return Array.from(row.children).map(cell => {
            const tile = cell.querySelector('.tile');
            if (!tile.dataset.machineId) return null; // Skip empty tiles
            return {
                backgroundImage: tile.style.backgroundImage,
                backgroundPosition: tile.style.backgroundPosition,
                rotation: tile.dataset.rotationCount || '0',
                machineId: tile.dataset.machineId || ''
            };
        });
    });

    // Flatten and remove nulls (empty tiles)
    const filteredData = data.map(row => row.map(cell => cell || null));

    const blob = new Blob([JSON.stringify(filteredData)], { type: 'application/json' });

    const inputName = document.getElementById('filename')?.value.trim() || 'grid';
    const filename = inputName.endsWith('.json') ? inputName : `${inputName}.json`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}


// Function to load a saved grid state
function loadGridState(jsonString) {
    const data = JSON.parse(jsonString);
    const rows = document.querySelectorAll('.grid tr');

    // Reset entire grid to default black square
    rows.forEach(row => {
        Array.from(row.children).forEach(cell => {
            const tile = cell.querySelector('.tile');
            tile.style.backgroundImage = "url('Images/Black_Square32.jpg')";
            tile.style.backgroundPosition = "0px 0px";
            tile.dataset.rotationCount = '0';
            tile.dataset.machineId = '';
            tile.style.transform = 'rotate(0deg)';
        });
    });

    // Apply saved machine tiles
    data.forEach((rowData, row) => {
        rowData.forEach((cellData, col) => {
            if (!cellData) return;
    
            const rowEl = rows[row];
            if (!rowEl) return;
    
            const cell = rowEl.children[col];
            if (!cell) return;
    
            const tile = cell.querySelector('.tile');
            tile.style.backgroundImage = cellData.backgroundImage;
            tile.style.backgroundPosition = cellData.backgroundPosition;
            tile.dataset.rotationCount = cellData.rotation;
            tile.dataset.machineId = cellData.machineId;
            tile.style.transform = `rotate(${cellData.rotation * 90}deg)`;
        });
    });
    
}
