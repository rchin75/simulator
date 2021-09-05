import Block from "./block";
import Simulator from "../simulator";
import Entity from "./entity";
import Uniform from "../distributions/uniform";

/**
 * A block to decide by chance.
 */
export default class DecideByChanceBlock extends Block {

    static OUT_TRUE = 1;
    static OUT_FALSE = 2;

    readonly trueValue: number
    readonly uniform : Uniform;

    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {number} trueValue Range for true random values (value included).
     * @param {Uniform} uniform Uniform distribution.
     */
    constructor(id: string, simulator: Simulator, trueValue: number = 0.5, uniform: Uniform) {
        super(id, simulator);
        this._initializeOutputChannel(DecideByChanceBlock.OUT_TRUE);
        this._initializeOutputChannel(DecideByChanceBlock.OUT_FALSE);
        this.trueValue = trueValue;
        this.uniform = uniform;
    }

    /**
     * Receives an entity.
     * @param {Entity} entity The entity to receive.
     * @param {number} channel
     */
    receiveEntity(entity: Entity, channel: number = DecideByChanceBlock.IN) {
        super.receiveEntity(entity, channel);
        const value = this.uniform.draw();
        if (value <= this.trueValue) {
            this._pushEntityToNextBlock(entity, DecideByChanceBlock.OUT_TRUE);
        } else {
            this._pushEntityToNextBlock(entity, DecideByChanceBlock.OUT_FALSE);
        }
    }
}