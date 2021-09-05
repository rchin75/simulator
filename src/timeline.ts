import Event from "./event";

/**
 * A timeline.
 */
export default class TimeLine {
    public currentTime : number;
    public events : Map<number,any>;
    public eventTimes : Array<number>;

    /**
     * Constructor.
     * @param {number} startTime The start time.
     */
    constructor(startTime: number) {
        this.currentTime = startTime;
        this.events = new Map();
        this.eventTimes = [];
    }

    /**
     * Adds an event.
     * @param {Event} event A function to invoke.
     * @param {Function} event.resolve The promise.resolve function.
     */
    addEvent(event: Event) {
        const eventTime = this.currentTime + event.delay;
        const events = this.events.get(eventTime)
        if (events) {
            events.push(event);
        } else {
            this.events.set(eventTime, [event]);
            this.eventTimes.push(eventTime);
        }
    }

    /**
     * Gets the next events.
     * @return {null|Array}
     */
    getNextEvents() {
        // Stop when there are no more events.
        if (this.eventTimes.length === 0) {
            return null;
        }
        // Sort the timeline.
        this.eventTimes.sort( (a,b) =>  {return a - b} );
        // Get the first element from the array and remove it from the array.
        this.currentTime = this.eventTimes.shift() || 0;
        // Get the events and remove them from the map.
        const events = this.events.get(this.currentTime);
        this.events.delete(this.currentTime);

        return  events;
    }

}