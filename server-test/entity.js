// Testing the entity framework.

const {Simulator, Triangular, Exponential, CreateBlock, DelayBlock, ProcessBlock, DisposeBlock} = require('../dist/simulator-node');

const rnd = Math.seed(24);
const simulator = new Simulator(0,60);
const exp1 = new Exponential(1, rnd);
const tri2 = new Triangular(10,20,15, rnd);
const tri3 = new Triangular(1,4,7, rnd);

const create01 = new CreateBlock('Create01', simulator, exp1);
const delay01 = new DelayBlock('Delay01', simulator, tri2);
const process01 = new ProcessBlock('Process01', simulator, tri3);
const dispose01 = new DisposeBlock('Dispose01', simulator);

create01.setNextBlock(delay01);
delay01.setNextBlock(process01);
process01.setNextBlock(dispose01);

create01.start();
simulator.run(() => {
    console.log('Simulation finished');
})

