import Block from "./block.js";

/**
 * A dispose-block.
 * Disposes entities. Keeps track of stats.
 */
export default class DisposeBlock extends Block {
    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     */
    constructor(id, simulator) {
        super(id, simulator);
    }

    /**
     * Receives an entity.
     * @param {Entity} entity An entity.
     * @param {number} channel The Channel.
     */
    receiveEntity(entity, channel= DisposeBlock.IN) {
        super.receiveEntity(entity, channel);
        // To do: keep track of stats before disposing.
        const time = this.simulator.currentTime;
        console.log('Disposing entity ' + entity.id + ' at ' + time + ', (created at ' + entity.creationTime + ')');

        entity.dispose();
    }
}