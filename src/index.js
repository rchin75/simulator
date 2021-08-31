import Simulator from './simulator.js';
import './random.js';
import Triangular from "./distributions/triangular.js";
import Normal from "./distributions/normal.js";
import Exponential from "./distributions/exponential.js";

const simulator = new Simulator(0,10);

(async () => {
    console.log('Start simulation');

    simulator.schedule('ESync1', 5, (event) => {
        console.log(event.name + ": " + simulator.currentTime);
    });
    simulator.schedule('ESync2', 5, (event) => {
        console.log(event.name + ": " + simulator.currentTime);
    });
    simulator.schedule('ESync3', 4.9, (event) => {
        console.log(event.name + ": " + simulator.currentTime);
    });

    const e1 = await simulator.scheduleAsync('E1',1);
    console.log(e1.name + ": " + simulator.currentTime);
    const e2 = await simulator.scheduleAsync('E2', 1);
    console.log(e2.name + ": " + simulator.currentTime);
    const e3 = await simulator.scheduleAsync('E3', 1);
    console.log(e3.name + ": " + simulator.currentTime);
    const e4 = await simulator.scheduleAsync('E4', 2);
    console.log(e4.name + ": " + simulator.currentTime);

    // After sim end time:
    await simulator.scheduleAsync('E5', 9);
    console.log('Fourth event', simulator.currentTime);
    await simulator.scheduleAsync('E6', 1);
    console.log('Fifth event', simulator.currentTime);
})();

simulator.run( () => {
    console.log('Simulation finished');
});

// Test random.
const rnd = Math.seed(23);
const nrm1 = new Normal(0, 2, rnd);
const exp1 = new Exponential(1, rnd);
//const tri2 = triangular(-1,1,0, rnd);
for (let i=0; i<1000; i++) {
    console.log(exp1.draw());
}