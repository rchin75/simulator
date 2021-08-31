import Block from "./block.js";
import Entity from "./entity.js";

/**
 * A create-block.
 * Creates new entities.
 */
export default class CreateBlock extends Block {
    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Distribution} distribution The distribution function to use.
     */
    constructor(id, simulator, distribution) {
        super(id, simulator);
        this.initializeOutputChannel(CreateBlock.OUT);
        this.distribution = distribution;
        this.entityCount = 0;
        this.enabled = true;
    }

    /**
     * Starts creating entities.
     */
    start() {
        if (!this.enabled) {
            return;
        }
        this.simulator.schedule('Create: ' + this.id, this.distribution.draw(), () => {
            if (this.outputChannels[CreateBlock.OUT] !== null) {
                this.entityCount++;
                const entity = new Entity(this.entityCount + '', this.simulator.currentTime);
                entity.blockIDs.push(this.id);
                const {nextBlock, inputChannel} = this.outputChannels[CreateBlock.OUT];
                nextBlock.receiveEntity(entity, inputChannel);
            }
            this.start(this.simulator);
        });
    }
}

