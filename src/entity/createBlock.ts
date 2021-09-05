import Block from "./block";
import Entity from "./entity";
import Simulator from "../simulator";
import Distribution from "../distributions/distribution";

/**
 * A create-block.
 * Creates new entities.
 */
export default class CreateBlock extends Block {
    readonly distribution: Distribution;
    public entityCount: number;
    public enabled: boolean;

    /**
     * Constructor.
     * @param {string} id ID.
     * @param {Simulator} simulator The simulator.
     * @param {Distribution} distribution The distribution function to use.
     */
    constructor(id: string, simulator: Simulator, distribution: Distribution) {
        super(id, simulator);
        this._initializeOutputChannel(CreateBlock.OUT);
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
                this._pushEntityToNextBlock(entity, CreateBlock.OUT);
            }
            this.start();
        }, null);
    }
}

