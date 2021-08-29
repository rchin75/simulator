export default class Block {

    /** The default input channel/ */
    static IN = 1;

    /** The default output channel. */
    static OUT = 1;

    /**
     * Constructor.
     * @param {string} id The block's ID.
     * @param {Simulator} simulator The simulator.
     */
    constructor(id, simulator) {
        if (new.target === Block) {
            throw new TypeError("Cannot construct Block instances directly");
        }
        this.id = id;
        this.simulator = simulator;
        this.outputChannels = {};
    }

    /**
     * Receives an entity from a previous block.
     * @param {Entity} entity An entity.
     * @param {number} channel
     */
    receiveEntity(entity, channel) {
        // To be implemented by sub class.
        entity.blockIDs.push(this.id);
    }

    /**
     * Initializes the output channel.
     * @param {number} channel The channel.
     */
    initializeOutputChannel(channel) {
        if (!this.outputChannels.hasOwnProperty(channel)) {
            this.outputChannels[channel] = null;
        }
    }

    /**
     * Set a next block.
     * @param {number} channel The channel.
     * @param {Block} nextBlock The next block.
     * @param {number} inputChannel The next block's input channel.
     */
    setNextBlock(channel, nextBlock, inputChannel = Block.IN) {
        if (this.outputChannels.hasOwnProperty(channel)) {
            this.outputChannels[channel] = {nextBlock, inputChannel};
        } else {
            throw 'Block ' + this.id + ' does not have channel ' + channel;
        }
    }


}