import Block from "./block";
import Simulator from "../simulator";
import Distribution from "../distributions/distribution";
import Entity from "./entity";
import Queue from "./queue";

/**
 * A process block.
 * This block adds entities to a queue and then processes them one by one.
 */
export default class ProcessBlock extends Block{
    readonly distribution: Distribution;
    public enabled: boolean;
    readonly _queue: Queue;

    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Distribution} distribution The distribution function to use.
     */
    constructor(id: string, simulator: Simulator, distribution: Distribution) {
        super(id, simulator);
        this._initializeOutputChannel(ProcessBlock.OUT);
        this.distribution = distribution;

        // TODO: implement what happens if this value changes.
        this.enabled = true;

        // The queue of entities waiting to be processed by this block.
        this._queue = new Queue(this.simulator);
    }

    /**
     * Receives an entity.
     * @param {Entity} entity The entity to receive.
     * @param {number} channel
     */
    receiveEntity(entity: Entity, channel: number = ProcessBlock.IN) {
        super.receiveEntity(entity, channel);
        this._queue.addEntity(entity);

        // Start processing entities when there is one in the queue.
        // When there are more entities in the queue then processing already started.
        if (this._queue.length === 1) {
            this._processEntities();
        }
    }

    /**
     * Processes the queue of entities.
     * @private
     */
    _processEntities() {
        if (this._queue.length > 0) {
            this.simulator.schedule('Process: ' + this.id, this.distribution.draw(), ()=> {
                // Get the first element from the queue.
                const entity = this._queue.takeEntity();

                this._pushEntityToNextBlock(entity, ProcessBlock.OUT);

                // Proceed with the next entity in the queue, if any.
                this._processEntities();
            })
        }
    }

    /**
     * Gets the queue.
     */
    get queue() {
        return this._queue;
    }
}
