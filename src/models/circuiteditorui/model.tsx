import * as _ from 'lodash';
import { proxyObservable } from 'mobx-proxy';
import { action, computed } from 'mobx';
import { Vec2, Rect } from '../../common/math';

/**
 * @brief State and logic for a circuit editor.
 *
 * Note that this is not aware of it's container (e.g. a panel) so state like
 * the panel ID and title is stored elsewhere.
 */
export
class CircuitEditorUIModel {
  
  // Ideally all observable state should be in this ProxyObservable.
  state: any;

  constructor (options: CircuitEditorUIModel.IOptions) {

    /* State is passed in from above - this allows for models that act on
       their own portions of a unified state tree. This state will almost
       always be a ProxyObservable. */
    this.state = options.state;

    // Some default state, in case we're not loading from a file or something.
    _.defaultsDeep(this.state, {
      
      view: {

        /** Position of the center of the viewport in model space. */
        pos: { x: 0, y: 0 },

        /** Dimensions of the viewport in pixels. */
        dims: { width: 0, height: 0 },

        /** Zoom factor of the viewport. */
        zoom: 1
      },

      grid: {
        spacing: 12
      }

    });
  }

  /** Get the model space rectangle of the viewport. */
  @computed get viewRect () {
    return { 
      x: this.state.view.pos,
      y: {
        x: this.state.view.pos.x + this.state.view.dims.width,
        y: this.state.view.pos.y + this.state.view.dims.height
      }
    };
  }
  
  /** Note: this does NOT resize the view - it's called in response to a change. */
  @action onViewDimsChange (dims) {
    _.assign(this.state.view.dims, dims);
  }
}

export
namespace CircuitEditorUIModel {
  
  export
  interface IOptions {

    state: any;
  }
}
