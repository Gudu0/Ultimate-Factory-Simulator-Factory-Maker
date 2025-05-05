//pls work
// grid_editor.js
import machineData from './JS/machine_data.js';
import { setupSaveLoadHandlers } from './JS/save_load.js';
import { setupVariables, handleImageSize, calculateTotalCost } from './JS/utility.js';
import { spawnOre, simulationStep } from './JS/simulation.js';
//import { clickableGrid } from './JS/grid_generation.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSaveLoadHandlers();
    const variables = setupVariables();
   
    document.getElementById('toggle-preview').checked = variables.showPreviewtoggle;
    document.getElementById('toggle-overlap').checked = variables.allowPlacementOver;

    document.addEventListener('mousedown', () => variables.isMouseDown = true);
    document.addEventListener('mouseup', () => variables.isMouseDown = false);
    
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
            variables.selectedImage = img.dataset.img;
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

                if (r >= 30 && c === 23) {
                    tile.classList.add('Input');
                    tile.style.backgroundImage = "url('Images/Input.png')"; 
                    tile.dataset.rotationCount = '0';
                    tile.dataset.machineId = 'input';
                    tile.style.backgroundPosition = "top"
                };
                if (r === 31 && c === 23) {
                    tile.classList.add('Input');
                    tile.style.backgroundImage = "url('Images/Input.png')"; 
                    tile.dataset.rotationCount = '0';
                    tile.dataset.machineId = 'input';
                    tile.style.backgroundPosition = "center"
                };
                if (r === 32 && c === 23) {
                    tile.classList.add('Input');
                    tile.style.backgroundImage = "url('Images/Input.png')"; 
                    tile.dataset.rotationCount = '0';
                    tile.dataset.machineId = 'input';
                    tile.style.backgroundPosition = "bottom"
                };
                if (r >= 30 && c != 23) {
                    tile.classList.remove('tile');
                    tile.classList.add('invisible-tile')
                    tile.id = 'crazy';
                    tile.style.cursor = 'default';
                    tile.style.backgroundImage = ''; 
                    delete tile.dataset.machineId;
                    delete tile.dataset.rotationCount;
                    
                }
                if (r <= 29 ) {
                    const preview = document.createElement('div');
                    preview.classList.add('preview');
                    tile.appendChild(preview);
                }
                

                cell.addEventListener('mouseenter', () => {
                    variables.currentHoverCell = { row: r, col: c };
                    showPreview(r, c);
                    if (variables.isMouseDown && dragPlacementEnabled) {
                        placeMachine(r, c);
                        callback(cell, r, c, i);
                    }
                });

                cell.addEventListener('mouseleave', () => {
                    variables.currentHoverCell = null;
                    clearPreview();
                });

                cell.addEventListener('click', () => {
                    placeMachine(r, c);
                    callback(cell, r, c, i);
                });

                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    
                    const tile = cell.querySelector('.tile');
                    const machineId = tile.dataset.machineId;
                    
                    // If there's no machine to delete, do nothing
                    if (!machineId) return;
                
                    const allRows = Array.from(document.querySelectorAll('.grid tr'));
                
                    // Loop through all rows and cells to remove the machine
                    allRows.forEach((row) => {
                        Array.from(row.children).forEach((cell) => {
                            const targetTile = cell.querySelector('.tile');
                            if (targetTile && targetTile.dataset.machineId === machineId) {
                                // Clear the tile data for each part of the multi-cell machine
                                targetTile.style.backgroundImage = "url('Images/Black_Square32.jpg')";
                                targetTile.style.backgroundPosition = "0px 0px";
                                targetTile.style.transform = 'rotate(0deg)';
                                targetTile.dataset.machineId = '';
                                targetTile.dataset.rotationCount = '0';
                            }
                        });
                    });
                    
                    // Recalculate the total cost after removing the machine
                    calculateTotalCost();
                });
                

                i++;
            }
        }
        // Disable dragging on all tiles
        disableTileDragging();
        
        return grid;
    }
    document.querySelectorAll('.invisible-tile').forEach(tile => {
        tile.style.setProperty('cursor', 'default', 'important');
      });
    /* Moved to grid_generation.js */
    function generateUniqueMachineId() {
        let id = `machine-${variables.machineIdCounter++}`;
        // Check if the ID already exists
        while (document.querySelector(`[data-machine-id="${id}"]`)) {
            id = `machine-${machineIdCounter++}`;  // Increment and try again if the ID exists
        }
        return id;
    }
    
    /* Moved to grid_generation */ 
    function placeMachine(r, c) {
        const machine = machineData[variables.selectedImage];
        if (!machine) return;
    
        const originalShape = machine.shape;
        const shapeRows = originalShape.length;
        const shapeCols = originalShape[0].length;
        const allRows = Array.from(document.querySelectorAll('.grid tr'));
    
        // Generate a unique machine ID
        const machineId = generateUniqueMachineId();
    
        // First check placement validity
        let canPlace = true;
        const reservedRowCount = 3; // Adjust this if you change the number of reserved rows
        for (let y = 0; y < shapeRows; y++) {
            for (let x = 0; x < shapeCols; x++) {
                if (originalShape[y][x] === 1) {
                    const [dy, dx] = rotateCoords(x, y, variables.globalRotationCount, shapeCols, shapeRows);
                    const row = r + dy;
                    const col = c + dx;

                    // Prevent placement into rows that are reserved
                    if (row >= allRows.length - reservedRowCount || row < 0 || col < 0 || col >= allRows[row]?.children.length) {
                        canPlace = false;
                        break;
                    }

                    const tile = allRows[row]?.children[col]?.querySelector('.tile');
                    if (tile && tile.dataset.machineId && !variables.allowPlacementOver) {
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
                    const [dy, dx] = rotateCoords(x, y, variables.globalRotationCount, shapeCols, shapeRows);
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
        if (variables.allowPlacementOver) {
            for (const row of allRows) {
                for (const cell of row.children) {
                    const tile = cell.querySelector('.tile');
                    if (tile && machinesToRemove.has(tile.dataset.machineId)) {
                        tile.style.backgroundImage = "url('Images/Black_Square32.jpg')";
                        tile.style.backgroundPosition = '';
                        tile.style.transform = '';
                        delete tile.dataset.machineId;
                        delete tile.dataset.rotationCount;
                    }
                }
            }
        }
        //recalculate when removing a tiles
        calculateTotalCost();
    
        // If placement is not allowed, return early
        if (!canPlace) return;
    
        // Place the new machine
        for (let y = 0; y < shapeRows; y++) {
            for (let x = 0; x < shapeCols; x++) {
                if (originalShape[y][x] === 1) {
                    const cropX = x;
                    const cropY = y;
    
                    const [dy, dx] = rotateCoords(cropX, cropY, variables.globalRotationCount, shapeCols, shapeRows);
                    const row = r + dy;
                    const col = c + dx;
                    const targetTile = allRows[row]?.children[col]?.querySelector('.tile');
                    if (!targetTile) continue;
    
                    targetTile.dataset.machineId = machineId;
                    targetTile.dataset.rotationCount = variables.globalRotationCount;
                    targetTile.style.transform = `rotate(${variables.globalRotationCount * 90}deg)`;
                    targetTile.style.backgroundImage = `url('Images/${variables.selectedImage}')`;
                    targetTile.style.backgroundPosition = `-${cropX * 32}px -${cropY * 32}px`;
                }
            }
        }
        //recalculate cost after placing
        calculateTotalCost();
    }

    /* Moved to grid_generation.js */
    function showPreview(startRow, startCol) {
        if (!variables.showPreviewtoggle) return;  // If the preview is disabled, do nothing.
    
        const machine = machineData[variables.selectedImage];
        if (!machine) return;
    
        const shape = rotateMatrix(machine.shape, variables.globalRotationCount);
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
                    
                    if (row >= allRows.length - 3 || col >= allRows[row].children.length) {
                        valid = false;
                        continue;
                    }
                    
                    const tile = allRows[row].children[col].querySelector('.tile');
                    const preview = tile.querySelector('.preview');
    
                    if (!variables.allowPlacementOver && tile.dataset.machineId) {
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
    const grid = clickableGrid(33, 30, (el, r, c, i) => {
        variables.lastClicked = el;
    });
    gridContainer.appendChild(grid);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            variables.globalRotationCount = (variables.globalRotationCount + 1) % 4;
        } else if (e.key === 'l' || e.key === 'L') {
            variables.globalRotationCount = (variables.globalRotationCount + 3) % 4;
        }

        if (variables.currentHoverCell) {
            clearPreview();
            showPreview(variables.currentHoverCell.row, variables.currentHoverCell.col);
        }
    });
    
    const togglePreview = document.getElementById('toggle-preview');
    const togglePlacementOver = document.getElementById('toggle-overlap');
   
    // Listen for changes to the placement preview toggle
    togglePreview.addEventListener('change', () => {
    variables.showPreviewtoggle = togglePreview.checked;
    localStorage.setItem('showPreview', variables.showPreviewtoggle);  // Save to localStorage
    // Optionally, you could re-render the preview if needed
    if (variables.currentHoverCell) {
        clearPreview();
        showPreview && showPreview(variables.currentHoverCell.row, variables.currentHoverCell.col);
    }
    });

    // Listen for changes to the allow placement over other machines toggle
    togglePlacementOver.addEventListener('change', () => {
        variables.allowPlacementOver = togglePlacementOver.checked;
        localStorage.setItem('allowOverlap', variables.allowPlacementOver);  // Save to localStorage
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
