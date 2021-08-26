import {TimeLine} from "./timeline.js";

/**
 * The simulator.
 */
export class Simulator {
    /**
     * Constructor.
     * @param {number} startTime Start time.
     * @param {number} endTime End time.
     */
    constructor(startTime = 0, endTime = 10) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeLine = new TimeLine(startTime);
    }

    /**
     * Schedules an event.
     * @param {string} name Name of the event.
     * @param {number} delay Delay.
     * @param {Object=} params Optional parameters.
     * @return {Promise<unknown>}
     */
    scheduleAsync(name, delay, params) {
        const promise = (resolve, reject) => {
            this.timeLine.addEvent({
                name,
                delay,
                cb: (result) => {
                    resolve(result);
                },
                params
            });
        }
        return new Promise(promise);
    }

    /**
     * Schedules an event.
     * @param {string} name Name of the event.
     * @param {number} delay Delay.
     * @param {Function} cb Callback function.
     * @param {Object=} params Optional parameters.
     */
    schedule(name, delay, cb, params) {
        this.timeLine.addEvent({
            name,
            delay,
            cb,
            params
        })
    }

    /**
     * Processes the next events.
     * @return {boolean} True if there were events to process.
     * @private
     */
    _processNextEvents() {
        const events = this.timeLine.getNextEvents();
        if ((events === null) || (this.timeLine.currentTime > this.endTime)) {
            return false;
        }
        events.forEach(event => {
            //console.log('Processing event', event.name);
            if (event.cb) {
                event.cb(event);
            }
        });
        return true;
    }

    /**
     * Runs the simulation.
     * @param {Function=} done Optional callback function, which will be invoked after completing the run.
     */
    run(done) {
        let goOn = true;
        setTimeout( () => {
            goOn = this._processNextEvents();
            if (goOn && (this.timeLine.currentTime < this.endTime)) {
                this.run(done);
            } else if (done !== undefined) {
                done();
            }
        }, 10);
    }

    /**
     * Gets the current time.
     * @return {number} The current time.
     */
    get currentTime() {
        return this.timeLine.currentTime;
    }
}