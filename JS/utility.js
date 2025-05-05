import machineData from './machine_data.js';

const variables = setupVariables();

function setupVariables() {
    let selectedImage = 'Black_Square32.jpg';
    let globalRotationCount = 0;
    let machineIdCounter = 1;
    let currentHoverCell = null;
    let isMouseDown = false;
    let lastClicked = '';

    let showPreviewtoggle = true;  // Default to showing preview
    let allowPlacementOver = true;  // Default to allowing placement over machines

    showPreviewtoggle = localStorage.getItem('showPreview') === 'false' ? false : true;
    allowPlacementOver = localStorage.getItem('allowOverlap') === 'false' ? false : true;

    return {
        selectedImage,
        globalRotationCount,
        machineIdCounter,
        currentHoverCell,
        isMouseDown,
        showPreviewtoggle,
        allowPlacementOver,
        lastClicked
    };
}

function calculateTotalCost() {
    const allTiles = document.querySelectorAll('.tile');
    const seenMachines = new Set();
    let totalCost = 0;

    const ignoredImages = ['Black_Square32.jpg', 'Red_Square32.jpg', 'White_Square32.jpg', 'Input.png']; // Add names of images to ignore

    for (const tile of allTiles) {
        const id = tile.dataset.machineId;
        const img = tile.style.backgroundImage;
        if (id && !seenMachines.has(id)) {
            const match = img.match(/Images\/(.+?)['")]/);
            if (match) {
                const imageName = match[1];
                const machine = machineData[imageName];
                if (machine && machine.cost) {
                    totalCost += machine.cost;
                } else if (!ignoredImages.includes(imageName)) {
                    console.warn(`No cost defined for machine: ${imageName}`);
                }
                seenMachines.add(id);
            }
        }
    }

    document.getElementById('costDisplay').textContent = `Total Factory Cost: $${totalCost}`;
}
    
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

function generateUniqueMachineId() {
    let id = `machine-${variables.machineIdCounter++}`;
    // Check if the ID already exists
    while (document.querySelector(`[data-machine-id="${id}"]`)) {
        id = `machine-${variables.machineIdCounter++}`;  // Increment and try again if the ID exists
    }
    return id;
}

function handleImageSize(img) {
    if (img.naturalWidth === 32 && img.naturalHeight === 32) {
        img.classList.add('small-img');
    } else {
        img.classList.add('large-img');
        img.classList.remove('small-img');  // Just in case it was wrongly applied
    }
}

export { calculateTotalCost, setupVariables, generateUniqueMachineId, handleImageSize };