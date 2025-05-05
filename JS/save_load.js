import { calculateTotalCost } from './utility.js';

function setupSaveLoadHandlers() {
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
                loadGridState(json);
            } catch (err) {
                console.error("Failed to load grid:", err);
            }
        };
        reader.readAsText(file);
    });
}


// Function to save the current grid state
function saveGridState() {
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

    // Reset rows 0–29 only
    rows.forEach((row, rowIndex) => {
        if (rowIndex >= 30) return;
        Array.from(row.children).forEach(cell => {
            const tile = cell.querySelector('.tile');
            if (!tile) return;
            tile.style.backgroundImage = "url('Images/Black_Square32.jpg')";
            tile.style.backgroundPosition = "0px 0px";
            tile.dataset.rotationCount = '0';
            tile.dataset.machineId = '';
            tile.style.transform = 'rotate(0deg)';
        });
    });

    // Load saved data into rows 0–29 only
    data.forEach((rowData, row) => {
        if (row >= 30) return;
        rowData.forEach((cellData, col) => {
            if (!cellData) return;

            const rowEl = rows[row];
            if (!rowEl) return;

            const cell = rowEl.children[col];
            if (!cell) return;

            const tile = cell.querySelector('.tile');
            if (!tile) return;

            tile.style.backgroundImage = cellData.backgroundImage;
            tile.style.backgroundPosition = cellData.backgroundPosition;
            tile.dataset.rotationCount = cellData.rotation;
            tile.dataset.machineId = cellData.machineId;
            tile.style.transform = `rotate(${cellData.rotation * 90}deg)`;
        });
    });

    calculateTotalCost();
}



export { saveGridState, loadGridState, setupSaveLoadHandlers }
