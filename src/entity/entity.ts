/**
 * An entity processed by the simulation.
 */
export default class Entity {
    readonly _id: string;
    readonly _type: string;
    readonly _creationTime: number;
    readonly _blockIDs: Array<string>;
    readonly _params: any;

    /**
     * Constructor.
     * @param {string} id ID.
     * @param {number} creationTime The time of creating this entity.
     * @param {string} type Type.
     */
    constructor(id: string, creationTime: number, type: string = 'default') {
        this._id = id;
        this._type = type;
        this._creationTime = creationTime;
        // Keep track of the blocks that processed this entity.
        this._blockIDs = [];
        // Optional parameters to add to this entity.
        this._params = {};
    }

    /**
     * Disposes the entity.
     */
    dispose() {
        // nothing yet.
    }

    /**
     * Gets the ID.
     * @return {string}
     */
    get id(): string {
        return this._id;
    }

    /**
     * Gets the type.
     * @return {string}
     */
    get type(): string {
        return this._type;
    }

    /**
     * Gets the creation time of this entity.
     * @return {number}
     */
    get creationTime(): number {
        return this._creationTime;
    }

    /**
     * Gets the block IDs that processed this entity.
     * @return {*}
     */
    get blockIDs(): Array<string> {
        return this._blockIDs;
    }

    /**
     * Gets the params object.
     * @return {{}}
     */
    get params(): any {
        return this._params
    }
}