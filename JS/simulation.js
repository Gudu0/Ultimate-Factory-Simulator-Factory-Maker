import machineData from './machine_data.js';

export const activeOres = [];

export class Ore {
    constructor(type, row, col) {
        this.type = type;
        this.row = row;
        this.col = col;
    }
}

export function spawnOre(type, row, col) {
    activeOres.push(new Ore(type, row, col));
}

export function simulationStep() {
    for (const ore of activeOres) {
        moveOre(ore);
    }
    updateOreDisplay();
}

// Basic movement logic (rightward for now)
function moveOre(ore) {
    const nextCol = ore.col + 1;
    const grid = document.querySelector('.grid');
    const rowEl = grid?.rows[ore.row];
    if (!rowEl) return;

    const nextCell = rowEl.cells[nextCol];
    if (nextCell) {
        ore.col = nextCol;
    }
}

// Simple visual debug display for ores
function updateOreDisplay() {
    // Clear previous ore highlights
    const allTiles = document.querySelectorAll('.tile');
    allTiles.forEach(tile => {
        tile.style.outline = '';
    });

    // Highlight active ore locations
    for (const ore of activeOres) {
        const grid = document.querySelector('.grid');
        const cell = grid?.rows[ore.row]?.cells[ore.col];
        const tile = cell?.querySelector('.tile');
        if (tile) {
            tile.style.outline = '2px solid red'; // debug display
        }
    }
}
