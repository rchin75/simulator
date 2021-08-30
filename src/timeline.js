/**
 * A timeline.
 */
export default class TimeLine {
    /**
     * Constructor.
     * @param {number} startTime The start time.
     */
    constructor(startTime) {
        this.currentTime = startTime;
        this.events = new Map();
        this.eventTimes = [];
    }

    /**
     * Adds an event.
     * @param event A function to invoke.
     * @param {string} event.name The name of the event.
     * @param {Function} [event.cb] An optional callback function.
     * @param {number} event.delay Delay after the current time. Must be larger than zero.
     * @param {Function} event.resolve The promise.resolve function.
     */
    addEvent(event) {
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
        this.currentTime = this.eventTimes.shift();
        // Get the events and remove them from the map.
        const events = this.events.get(this.currentTime);
        this.events.delete(this.currentTime);

        // Stop when the current time lies beyond the end time.
        if (this.currentTime > this.endTime) {
            return null;
        }

        return  events;
    }

}