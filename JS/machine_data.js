// machineData.js

// This object stores metadata for each machine by image filename
const machineData = {
    
    "Black_Square32.jpg": {
      name: "Black Square",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 0,
    },
    "Conveyor.png": {
      name: "Conveyor",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 10,
    },
    "Down_Conveyor_wip.png": {
        name: "Down Conveyor",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 50,
      },
    "Filter_Left.png": {
      name: "Filter Left",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 250,
    },
    "Filter_Right.png": {
      name: "Filter Right",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 250,
    },
    "Ore_Smelter.png": {
      name: "Ore Smelter",
      width: 3,
      height: 1,
      shape: [
        [1, 1, 1],
      ],
      cost: 380,
    },
    "Overflow_Left.png": {
      name: "Overflow Left",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 50,
    },
    "Overflow_Right.png": {
      name: "Overflow Right",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 50,
    },
    "Red_Square32.jpg": {
      name: "Red Square",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 0,
    },
    "Splitter_Left.png": {
      name: "Splitter Left",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 50,
    },
    "Splitter_Right.png": {
      name: "Splitter Right",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 50,
    },
    "Splitter_Three_Way.png": {
      name: "Splitter Three Way",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 50,
    },
    "Up_Conveyor_wip.png": {
      name: "Up Conveyor",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 50,
    },
    "White_Square32.jpg": {
      name: "White Square",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
      cost: 0,
    },
    "Seller.png": {
      name: "Seller",
      width: 3,
      height: 3,
      shape: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      cost: 0,
    },
    "Car_Spawner.png": {
      name: "Car Spawner",
      width: 8,
      height: 10,
      shape: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      cost: 0,
    },
    // ===== Check this one!! Its 2 wide, but only 1 has colision ===== \\
    "Ore_Cleaner.png": {
        name: "Ore Cleaner",
        width: 2,
        height: 1,
        shape: [[1, 0]], // basic square
      },
      cost: 80,
      "Polisher.png": {
        name: "Polisher",
        width: 2,
        height: 1,
        shape: [[1, 1]], // basic square
        cost: 250,
      },
      "Crusher.png": {
        name: "Crusher",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 1750,
      },
      "Coiler.png": {
        name: "Coiler",
        width: 3,
        height: 1,
        shape: [[1, 1, 1]], // basic square
        cost: 1750,
      },
      "Topaz_Prospector.png": {
        name: "Topaz Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 2000,
      },
      "Brick_Mold": {
        name: "Brick Mold",
        width: 2,
        height: 1,
        shape: [[1, 0]],
        cost: 2500,
      },
      "Bolt_Machine.png": {
        name: "Bolt Machine",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 2800,
      },
      "Plate_Stamper.png": {
        name: "",
        width: 3,
        height: 1,
        shape: [[1, 1, 1]], // basic square
        cost: 3000,
      },
      //COME BACK TO THIS AFTER GETTING 3D WORKING, ITS 2 TALL
      //sifter
      "x.png": {
        name: "x",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 10,
      },
      "Pipe_Maker.png": {
        name: "Pipe Maker",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 4000,
      },
      "Kiln.png": {
        name: "Kiln",
        width: 3,
        height: 1,
        shape: [[1, 1, 1]], // basic square
        cost: 4750,
      },
      "Emerald_Prospector.png": {
        name: "Emerald Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 5000,
      },
      "Gem_Cutter.png": {
        name: "Gem Cutter",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 7500,
      },
      "Mechanical_Parts_Maker.png": {
        name: "Mechanical Parts Maker",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 8000,
      },
      "Sapphire_Prospector.png": {
        name: "Sapphire Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 8000,
      },
      "Electronic_Tuner.png": {
        name: "Electronic Tuner",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 8500,
      },
      "Frame_Maker.png": {
        name: "Frame Maker",
        width: 2,
        height: 3,
        shape: [[0, 1],
                [1, 1],
                [0, 1]
        ], // basic square
        cost: 10000,
      },
      "Cement_Mixer.png": {
        name: "Cement Mixer",
        width: 2,
        height: 3,
        shape: [[1, 1],
                [0, 0],
                [1, 0]
        ], // basic square
        cost: 10000,
      },
      "Ruby_Prospector.png": {
        name: "Ruby Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 15000,
      },
      "Ring_Maker.png": {
        name: "Ring Maker",
        width: 2,
        height: 3,
        shape: [[1, 1],
                [1, 1],
                [1, 1]
        ], // basic square
        cost: 15000,
      },
      "Circuit_Maker.png": {
        name: "Circuit Maker",
        width: 3,
        height: 3,
        shape: [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ],
        cost: 20000,
      },
    // Add more
  };
  
  export default machineData;
  
  /*
   ".png": {
        name: "",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
        cost: 10,
      },
  */
