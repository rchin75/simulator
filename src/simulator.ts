import TimeLine from "./timeline";
import Event from "./event";

/**
 * The simulator.
 */
export default class Simulator {

    public startTime: number;
    public endTime: number;
    public timeLine: TimeLine;

    /**
     * Constructor.
     * @param {number} startTime Start time.
     * @param {number} endTime End time.
     */
    constructor(startTime: number = 0, endTime: number = 10) {
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
    scheduleAsync(name: string, delay: number, params: any) {
        const promise = (resolve: Function, reject: Function) => {
            this.timeLine.addEvent({
                name,
                delay,
                cb: (result: Event) => {
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
    schedule(name: string, delay: number, cb: Function, params: any) {
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
        events.forEach((event : Event) => {
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
    run(done: Function) {
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
    get currentTime() : number {
        return this.timeLine.currentTime;
    }

}