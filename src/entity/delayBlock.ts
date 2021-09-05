import Block from "./block";
import Simulator from "../simulator";
import Distribution from "../distributions/distribution";
import Entity from "./entity";

/**
 * A delay-block.
 * Delays entities before sending them on to the next block.
 */
export default class DelayBlock extends Block {
    readonly distribution: Distribution;
    public entities: Array<Entity>;

    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Distribution} distribution The distribution function to use.
     */
    constructor(id: string, simulator: Simulator, distribution: Distribution) {
        super(id, simulator);
        this._initializeOutputChannel(DelayBlock.OUT);
        this.distribution = distribution;
        // Entities in this block.
        this.entities = [];
    }

    /**
     * Removes an entity.
     * @param entity The entity to remove.
     * @private
     */
    _removeEntity(entity: Entity) {
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
    receiveEntity(entity: Entity, channel: number = DelayBlock.IN) {
        super.receiveEntity(entity, channel);
        this.entities.push(entity);
        this.simulator.schedule('Delay: ' + this.id, this.distribution.draw(), ()=> {
            this._removeEntity(entity);
            this._pushEntityToNextBlock(entity, DelayBlock.OUT);
        });
    }
}