import Block from "./block.js";

/**
 * A process block.
 * This block adds entities to a queue and then processes them one by one.
 */
export default class ProcessBlock extends Block{
    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Distribution} distribution The distribution function to use.
     */
    constructor(id, simulator, distribution) {
        super(id, simulator);
        this.initializeOutputChannel(ProcessBlock.OUT);
        this.distribution = distribution;

        // TODO: implement what happens if this value changes.
        this.enabled = true;

        // The queue of entities waiting to be processed by this block.
        this.entities = [];
    }

    /**
     * Receives an entity.
     * @param {Entity} entity The entity to receive.
     * @param {number} channel
     */
    receiveEntity(entity, channel = DelayBlock.IN) {
        super.receiveEntity(entity, channel);
        this.entities.push(entity);

        // Start processing entities when there is one in the queue.
        // When there are more entities in the queue then processing already started.
        if (this.entities.length === 1) {
            this._processEntities();
        }
    }

    /**
     * Processes the queue of entities.
     * @private
     */
    _processEntities() {
        if (this.entities.length > 0) {
            this.simulator.schedule('Process: ' + this.id, this.distribution.draw(), ()=> {
                // Note: splice returns the removed entity, but using that one leads to issues
                // (seems to get garbage collected in Chrome), so we get it separately.
                // Get the first element from the queue.
                const entity = this.entities[0];
                this.entities.splice(0, 1);

                if (this.outputChannels[ProcessBlock.OUT] !== null) {
                    const {nextBlock, inputChannel} = this.outputChannels[ProcessBlock.OUT];
                    nextBlock.receiveEntity(entity, inputChannel);
                }

                // Proceed with the next entity in the queue, if any.
                this._processEntities();
            })
        }
    }
}