// machineData.js

// This object stores metadata for each machine by image filename
const machineData = {
    
    "Black_Square32.jpg": {
      name: "Black Square",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Conveyor.png": {
      name: "Conveyor",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Down_Conveyor_wip.png": {
        name: "Down Conveyor",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
    "Filter_Left.png": {
      name: "Filter Left",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Filter_Right.png": {
      name: "Filter Right",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Ore_Smelter.png": {
      name: "Ore Smelter",
      width: 3,
      height: 1,
      shape: [
        [1, 1, 1],
      ],
    },
    "Overflow_Left.png": {
      name: "Overflow Left",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Overflow_Right.png": {
      name: "Overflow Right",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Red_Square32.jpg": {
      name: "Red Square",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Splitter_Left.png": {
      name: "Splitter Left",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Splitter_Right.png": {
      name: "Splitter Right",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Splitter_Three_Way.png": {
      name: "Splitter Three Way",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "Up_Conveyor_wip.png": {
      name: "Up Conveyor",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
    },
    "White_Square32.jpg": {
      name: "White Square",
      width: 1,
      height: 1,
      shape: [[1]], // basic square
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
    },
    // ===== Check this one!! Its 2 wide, but only 1 has colision ===== \\
    "Ore_Cleaner.png": {
        name: "Ore Cleaner",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Polisher.png": {
        name: "Polisher",
        width: 2,
        height: 1,
        shape: [[1, 1]], // basic square
      },
      "Crusher.png": {
        name: "Crusher",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Coiler.png": {
        name: "Coiler",
        width: 3,
        height: 1,
        shape: [[1, 1, 1]], // basic square
      },
      "Topaz_Prospector.png": {
        name: "Topaz Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Bolt_Maker.png": {
        name: "Bolt Maker",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Plate_Stamper.png": {
        name: "",
        width: 3,
        height: 1,
        shape: [[1, 1, 1]], // basic square
      },
      //COME BACK TO THIS AFTER GETTING 3D WORKING, ITS 2 TALL
      "x.png": {
        name: "x",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Pipe_Maker.png": {
        name: "Pipe Maker",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Kiln.png": {
        name: "Kiln",
        width: 3,
        height: 1,
        shape: [[1, 1, 1]], // basic square
      },
      "Emerald_Prospector.png": {
        name: "Emerald Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Gem_Cutter.png": {
        name: "Gem Cutter",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Mechanical_Parts_Maker.png": {
        name: "Mechanical Parts Maker",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Sapphire_Prospector.png": {
        name: "Sapphire Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Electronic_Tuner.png": {
        name: "Electronic Tuner",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Frame_Maker.png": {
        name: "Frame Maker",
        width: 2,
        height: 3,
        shape: [[0, 1],
                [1, 1],
                [0, 1]
        ], // basic square
      },
      "Cement_Mixer.png": {
        name: "Cement Mixer",
        width: 2,
        height: 3,
        shape: [[1, 1],
                [1, 0],
                [1, 0]
        ], // basic square
      },
      "Ruby_Prospector.png": {
        name: "Ruby Prospector",
        width: 1,
        height: 1,
        shape: [[1]], // basic square
      },
      "Ring_Maker.png": {
        name: "Ring Maker",
        width: 2,
        height: 3,
        shape: [[1, 1],
                [1, 1],
                [1, 1]
        ], // basic square
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
      },
  */
