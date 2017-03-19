import * as _ from 'lodash';
import { action, computed } from 'mobx';
import { Vec2, Rect } from '../../common/math';
import { CircuitVisualModel } from '../circuitvisual';

export interface CircuitWireNode {
  
  // The node's ID.
  id: string;
  
  // The position in model space.
  pos: { x: number, y: number },

  // List of IDs.
  connections: string[];
};

/**
 */
export
class CircuitWireNodeModel {
  
  // Ideally all observable state should be in this ProxyObservable.
  state: CircuitWireNode;

  constructor (options: CircuitWireNodeModel.IOptions) {

    /* State is passed in from above - this allows for models that act on
       their own portions of a unified state tree. This state will almost
       always be a ProxyObservable. */
    this.state = options.state;

    // Some default state, in case we're not loading from a file or something.
    _.defaultsDeep(this.state, {
      
    });
  }

  @computed get isJunction () {
    return this.state.connections.length > 2;
  }

  @action setPos (pos: { x: number, y: number }) {
    this.state.pos = pos;
  }
}

export 
namespace CircuitWireNodeModel {
  
  export
  interface IOptions {
    
    circuitVisualModel: CircuitVisualModel;
    state: CircuitWireNode;
  }
}
