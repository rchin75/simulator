import Simulator from "../simulator";
import Entity from "./entity";

/**
 * Value type for output channels.
 */
interface OutputChannelData {
    nextBlock : Block,
    inputChannel: number
}

/**
 * A block (abstract class).
 */
export default class Block {

    /** The default input channel/ */
    static IN = 1;

    /** The default output channel. */
    static OUT = 1;

    readonly id: string
    readonly simulator: Simulator;
    readonly outputChannels: { [key: number] : OutputChannelData | null};

    /**
     * Constructor.
     * @param {string} id The block's ID.
     * @param {Simulator} simulator The simulator.
     */
    constructor(id: string, simulator: Simulator) {
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
    receiveEntity(entity: Entity, channel: number) {
        // To be implemented by sub class.
        entity.blockIDs.push(this.id);
    }

    /**
     * Initializes the output channel.
     * @param {number} channel The channel.
     * @private
     */
    _initializeOutputChannel(channel: number) {
        if (!this.outputChannels.hasOwnProperty(channel)) {
            this.outputChannels[channel] = null;
        }
    }

    /**
     * Pushes an entity to the next block.
     * @param entity The entity.
     * @param outputChannel The output channel of this block to use.
     * @private
     */
    _pushEntityToNextBlock(entity: Entity, outputChannel: number) {
        const outputChannelData: OutputChannelData | null = this.outputChannels[outputChannel];
        if (outputChannelData) {
            const {nextBlock, inputChannel} : OutputChannelData = outputChannelData;
            nextBlock.receiveEntity(entity, inputChannel);
        }
    }

    /**
     * Set a next block.
     * @param {Block} nextBlock The next block.
     * @param {number} outputChannel The output channel.
     * @param {number} inputChannel The next block's input channel.
     */
    setNextBlock(nextBlock: Block, outputChannel: number = Block.OUT, inputChannel: number = Block.IN) {
        if (this.outputChannels.hasOwnProperty(outputChannel)) {
            this.outputChannels[outputChannel] = {nextBlock, inputChannel};
        } else {
            throw 'Block ' + this.id + ' does not have channel ' + outputChannel;
        }
    }


}