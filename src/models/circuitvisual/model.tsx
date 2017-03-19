import * as _ from 'lodash';
import { action, computed } from 'mobx';
import { Vec2, Rect } from '../../common/math';
import { CircuitWireNode, CircuitWireNodeModel } from '../circuitwirenode';
import { CircuitSymbol, CircuitSymbolModel } from '../circuitsymbol';

/**
 */
export class CircuitVisualModel {
  
  // Ideally all observable state should be in this ProxyObservable.
  state: any;

  constructor (options: CircuitVisualModel.IOptions) {

    /* State is passed in from above - this allows for models that act on
       their own portions of a unified state tree. This state will almost
       always be a ProxyObservable. */
    this.state = options.state;

    // Some default state, in case we're not loading from a file or something.
    _.defaultsDeep(this.state, {
      symbols: {},
      wireNodes: {}
    });
  }

  @computed get wireNodeModels () {
    return _.mapValues(this.state.wireNodes, (state, id) => {
      return new CircuitWireNodeModel({
        state: state,
        circuitVisualModel: this
      });
    });
  }

  @computed get symbolModels () {
    return _.mapValues(this.state.symbols, (state, id) => {
      return new CircuitSymbolModel({
        state: state,
        circuitVisualModel: this
      });
    });
  }
}

export
namespace CircuitVisualModel {
  
  export
  interface IOptions {

    state: any;
  }
}
