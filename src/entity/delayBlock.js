import Block from "./block.js";

/**
 * A delay-block.
 * Delays entities before sending them on to the next block.
 */
export default class DelayBlock extends Block {
    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Distribution} distribution The distribution function to use.
     */
    constructor(id, simulator, distribution) {
        super(id, simulator);
        this.initializeOutputChannel(DelayBlock.OUT);
        this.distribution = distribution;
        // Entities in this block.
        this.entities = [];
    }

    /**
     * Removes an entity.
     * @param entity The entity to remove.
     * @private
     */
    _removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    /**
     * Receives an entity.
     * @param {Entity} entity The entity to receive.
     * @param {number} channel
     */
    receiveEntity(entity, channel = DelayBlock.IN) {
        super.receiveEntity(entity, channel);
        this.entities.push(entity);
        this.simulator.schedule('Delay: ' + this.id, this.distribution.draw(), ()=> {
            this._removeEntity(entity);
            if (this.outputChannels[DelayBlock.OUT] !== null) {
                const {nextBlock, inputChannel} = this.outputChannels[DelayBlock.OUT];
                nextBlock.receiveEntity(entity, inputChannel);
            }
        });
    }
}