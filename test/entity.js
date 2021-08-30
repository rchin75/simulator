// Testing the entity framework.

import Simulator from "../src/simulator.js";
import "../src/random.js";
import {triangular} from "../src/distributions/triangular.js";
import {exponential} from "../src/distributions/exponential.js";

import CreateBlock from "../src/entity/createBlock.js";
import DelayBlock from "../src/entity/delayBlock.js";
import DisposeBlock from "../src/entity/disposeBlock.js";

const rnd = Math.seed(24);
const simulator = new Simulator(0,60);
const exp1 = exponential(1, rnd);
const tri2 = triangular(10,20,15, rnd);

const create01 = new CreateBlock('Create01', simulator, exp1);
const delay01 = new DelayBlock('Delay01', simulator, tri2);
const dispose01 = new DisposeBlock('Dispose01', simulator);

create01.setNextBlock(CreateBlock.OUT, delay01);
delay01.setNextBlock(DelayBlock.OUT, dispose01);

create01.start();
simulator.run(() => {
    console.log('Simulation finished');
})

