import Block from "./block";
import Simulator from "../simulator";
import Entity from "./entity";

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
    constructor(id: string, simulator: Simulator) {
        super(id, simulator);
    }

    /**
     * Receives an entity.
     * @param {Entity} entity An entity.
     * @param {number} channel The Channel.
     */
    receiveEntity(entity: Entity, channel: number= DisposeBlock.IN) {
        super.receiveEntity(entity, channel);
        // To do: keep track of stats before disposing.
        const time = this.simulator.currentTime;
        console.log('Disposing entity ' + entity.id + ' at ' + time);
        console.log(' - created:' + entity.creationTime);
        console.log(' - blocks: ' + entity.blockIDs);

        entity.dispose();
    }
}