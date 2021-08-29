/**
 * An entity processed by the simulation.
 */
export default class Entity {
    /**
     * Constructor.
     * @param {string} id ID.
     * @param {string} type Type.
     * @param {number} creationTime The time of creating this entity.
     */
    constructor(id, type = 'default', creationTime) {
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
    get id() {
        return this._id;
    }

    /**
     * Gets the type.
     * @return {string}
     */
    get type() {
        return this._type;
    }

    /**
     * Gets the creation time of this entity.
     * @return {number}
     */
    get creationTime() {
        return this._creationTime;
    }

    /**
     * Gets the block IDs that processed this entity.
     * @return {*}
     */
    get blockIDs() {
        return this._blockIDs;
    }

    /**
     * Gets the params object.
     * @return {{}}
     */
    get params() {
        return this._params
    }
}