const fs = require('fs');

const filePath = './test-models/model1.json';
const model = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//console.log(model);

const {Simulator, Triangular, Exponential, Normal, Uniform, CreateBlock, DelayBlock, ProcessBlock, DisposeBlock} = require('../dist/simulator-node');

// For now we run only the first experiment.
const experiment = model.experiments[0];
const rnd = Math.seed(experiment.initialRandomSeed);
const simulator = new Simulator(model.simulator.startTime, model.simulator.endTime);

// Create the statistical distributions.
const distributions = new Map();
model.distributions.forEach(dist => {
    let distribution = null;
    switch (dist.type) {
        case 'EXPONENTIAL':
            distribution = new Exponential(dist.params[0], rnd);
            break;
        case 'TRIANGULAR':
            distribution = new Triangular(dist.params[0], dist.params[1], dist.params[2], rnd);
            break;
        case 'NORMAL':
            distribution = new Normal(dist.params[0], dist.params[1], rnd);
            break;
        case 'UNIFORM':
            distribution = new Uniform(dist.params[0], dist.params[1], rnd);
            break;
        default:
            // Unknown distribution
            console.log("Unknown distribution type: name=" + dist.name + ", type=" + dist.type);
    }
    distributions.set(dist.name, distribution);
});

// Create the blocks of the entity framework.
const blocks = new Map();
model.blocks.forEach(blk => {
   let block = null;
   switch (blk.type) {
       case 'CREATE':
           block = new CreateBlock(blk.name, simulator, distributions.get(blk.distribution));
           break;
       case 'DELAY':
           block = new DelayBlock(blk.name, simulator, distributions.get(blk.distribution));
           break;
       case 'PROCESS':
           block = new ProcessBlock(blk.name, simulator, distributions.get(blk.distribution));
           break;
       case 'DISPOSE':
           block = new DisposeBlock(blk.name, simulator);
           break;
       default:
           // Unknown block type.
           console.log("Unknown block type: name=" + blk.name + ", type=" + blk.type);
   }
   blocks.set(blk.name, block);
});

// Link the blocks according to the specified logic.
model.logic.forEach(l => {
   const sourceBlock = blocks.get(l.block);
   const nextBlock = blocks.get(l.next);
   if (sourceBlock && nextBlock) {
       sourceBlock.setNextBlock(nextBlock);
   } else {
       console.log('Cannot set link between: ' + l.block + ' and ' + l.next);
   }
});

// Start all create blocks.
blocks.forEach(block => {
    if (block instanceof CreateBlock) {
        block.start();
    }
})
simulator.run(() => {
    console.log('Simulation finished');
})