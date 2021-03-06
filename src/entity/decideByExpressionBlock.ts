import Block from "./block";
import Simulator from "../simulator";
import Entity from "./entity";

/**
 * A block to decide by expression.
 */
export default class DecideByExpressionBlock extends Block {

    static OUT_TRUE = 1;
    static OUT_FALSE = 2;

    readonly expression: Function;
    private _trueEntities: number = 0;
    private _falseEntities: number = 0;

    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Function} expression A function that takes an entity as a parameter and returns true/false.
     */
    constructor(id: string, simulator: Simulator, expression: Function) {
        super(id, simulator);
        this._initializeOutputChannel(DecideByExpressionBlock.OUT_TRUE);
        this._initializeOutputChannel(DecideByExpressionBlock.OUT_FALSE);
        this.expression = expression;
    }

    /**
     * Receives an entity.
     * @param {Entity} entity The entity to receive.
     * @param {number} channel
     */
    receiveEntity(entity: Entity, channel: number = DecideByExpressionBlock.IN) {
        super.receiveEntity(entity, channel);
        const value = this.expression(entity);
        if (value) {
            this._pushEntityToNextBlock(entity, DecideByExpressionBlock.OUT_TRUE);
            this._trueEntities++;
        } else {
            this._pushEntityToNextBlock(entity, DecideByExpressionBlock.OUT_FALSE);
            this._falseEntities++;
        }
    }

    /**
     * Gets the number of entities evaluated as true.
     */
    get trueEntities() {
        return this._trueEntities;
    }

    /**
     * Gets the number of entities evaluated as false.
     */
    get falseEntities() {
        return this._falseEntities;
    }
}