import * as _ from 'lodash';
import { action, computed } from 'mobx';
import { Vec2, Rect } from '../../common/math';
import { CircuitVisualModel } from '../circuitvisual';
import { CircuitSymbolTemplate } from '../../common/circuit';

export interface CircuitSymbol {

  // Template visual schematic (svg path + pin positions).
  sym: CircuitSymbolTemplate;
  
  // The position in model space.
  pos: { x: number, y: number },
  
  // Rotation angle, in degrees (??)
  rot: number;
  
  // Mirror the component horizontally?
  mirror: boolean;
};

/**
 */
export
class CircuitSymbolModel {
  
  // Ideally all observable state should be in this ProxyObservable.
  state: CircuitSymbol;

  constructor (options: CircuitSymbolModel.IOptions) {

    /* State is passed in from above - this allows for models that act on
       their own portions of a unified state tree. This state will almost
       always be a ProxyObservable. */
    this.state = options.state;
  }
  
  /** The pin positions in model space. */
  @computed get pinPositions () {

    return _.chain(this.state.sym.pins)

      .keyBy((pin) => pin.name)

      .mapValues((pin, name) => {

        return {
          // TODO: factor in rotation and mirroring ...
          x: this.state.pos.x + pin.pos.x,
          y: this.state.pos.y + pin.pos.y
        };
      })

      .value();
  }
  
  // Get the center of the symbol in model space.
  @computed get center () {

    // TODO: factor in rotation and mirroring ???

    return {
      x: this.state.pos.x + this.state.sym.dims.width / 2,
      y: this.state.pos.y + this.state.sym.dims.height / 2
    };
  }
  
  // Set the center of the symbol in model space.
  set center (pos: { x: number, y: number }) {

    this.state.pos = {
      x: pos.x - this.state.sym.dims.width / 2,
      y: pos.y - this.state.sym.dims.height / 2
    };
  }
}

export 
namespace CircuitSymbolModel {
  
  export
  interface IOptions {
    
    circuitVisualModel: CircuitVisualModel;
    state: CircuitSymbol;
  }
}
