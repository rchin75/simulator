import Entity from "./entity";
import Simulator from "../simulator";

/**
 * A queue of entities.
 */
export default class Queue {
    readonly entities: Array<Entity>;
    readonly simulator: Simulator;

    private aggregatedQueueLength: number = 0;
    private aggregatedTimes: number = 0;
    private maximumQueueLength: number = 0;
    private lastUpdate: number = 0;
    private idleTime: number = 0;
    private activeTime: number = 0;

    /**
     * Constructor.
     * @param simulator The simulator.
     */
    constructor(simulator: Simulator) {
        this.entities = [];
        this.simulator = simulator;
        this.lastUpdate = this.simulator.startTime;
    }

    /**
     * Updates the statistics.
     * @private
     */
    _updateStats() {
        const timePassed = this.simulator.currentTime - this.lastUpdate;
        this.aggregatedQueueLength += timePassed * this.entities.length;
        this.aggregatedTimes += timePassed;

        if (this.entities.length > this.maximumQueueLength) {
            this.maximumQueueLength = this.entities.length;
        }

        if (this.entities.length === 0) {
            this.idleTime += timePassed;
        } else {
            this.activeTime += timePassed;
        }

        this.lastUpdate = this.simulator.currentTime;

        this._log('Stats: queue length = ' + this.entities.length);
    }

    /**
     * For debugging.
     * @param text Text to log.
     * @private
     */
    _log(text: string) {
        console.log('Time: ' + this.simulator.currentTime + ', ' + text);
    }

    /**
     * Adds an entity to the queue.
     * @param {Entity} entity An entity.
     */
    addEntity(entity: Entity) {
        this._updateStats();
        this._log('Queue: add ' + entity.id);
        this.entities.push(entity);
    }

    /**
     * Takes the first entity from the queue.
     */
    takeEntity() {
        this._updateStats();

        // Note: splice returns the removed entity, but using that one leads to issues
        // (seems to get garbage collected in Chrome), so we get it separately.
        const entity = this.entities[0];
        this.entities.splice(0, 1);

        this._log('Queue: take entity ' + entity.id);
        return entity;
    }

    /**
     * Gets the weighted average queue length.
     */
    getAverageQueueLength() {
        // Get the weighted average.
        return this.aggregatedQueueLength / this.aggregatedTimes;
    }

    /**
     * Gets the utilization.
     */
    getUtilization() {
        return this.activeTime / (this.activeTime + this.idleTime);
    }

    /**
     * Gets the maximum queue length;
     */
    getMaximumQueueLength() {
        return this.maximumQueueLength;
    }

    /**
     * Gets the current queue length.
     */
    get length() {
        return this.entities.length;
    }
}