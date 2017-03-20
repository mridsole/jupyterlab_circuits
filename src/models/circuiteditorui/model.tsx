import * as _ from 'lodash';
import { proxyObservable } from 'mobx-proxy';
import { action, computed } from 'mobx';
import { Vec2, Rect } from '../../common/math';
import { viewToModel, modelToView } from '../../common/spaces';
import { CircuitVisualModel } from '../circuitvisual';

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

  circuitVisualModel: CircuitVisualModel;

  constructor (options: CircuitEditorUIModel.IOptions) {

    /* State is passed in from above - this allows for models that act on
       their own portions of a unified state tree. This state will almost
       always be a ProxyObservable. */
    this.state = options.state;

    /* Store reference to the visual model of the circuit. */
    this.circuitVisualModel = options.circuitVisualModel;

    // Some default state, in case we're not loading from a file or something.
    _.defaultsDeep(this.state, {
      
      /** State related to the user's cursor. */
      mouse: {

        /** Position of the mouse in model space. */
        pos: { x: 0, y: 0 },
        
        /** Position of the mouse when panning started (model space). */
        panStartPos: { x: 0, y: 0 }
      },

      /** State related to the circuit editor viewport. */
      view: {

        /** Position of the center of the viewport in model space. */
        pos: { x: 0, y: 0 },

        /** Dimensions of the viewport in pixels. */
        dims: { width: 0, height: 0 },

        /** Zoom factor of the viewport. */
        zoom: 1,
        
        /** Is the user currently panning? */
        panning: false,
        
        /** Position of the view when panning started (model space). */
        panStartPos: { x: 0, y: 0 }
      },
      
      /** State related to the circuit editor grid. */
      grid: {
        spacing: 20
      },

      /** State related to the user's selection. */
      circuitSelections: {
        symbols: [],
        wireNodes: []
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

  @action setViewPos (pos: { x: number, y: number }) {
    this.state.view.pos = pos;
  }

  @action addToViewPos (pos: { x: number, y: number }) {
    this.state.view.pos.x += pos.x;
    this.state.view.pos.y += pos.y;
  }
  
  // Actions like this might seem a little silly, but it keeps things consistent ...
  @action multiplyZoom (factor: number) {
    this.state.view.zoom *= factor;
  }

  @action startPanning () {
    this.state.view.panning = true;
    this.state.view.panStartPos = this.state.view.pos;
    this.state.mouse.panStartPos = this.state.mouse.pos;
  }

  @action stopPanning () {
    this.state.view.panning = false;
  }

  /** Update the mouse position, given local coordinates in the viewport. */
  @action updateMousePos (pos: { x: number, y: number }) {
    this.state.mouse.pos = viewToModel(this.state.view, pos);
  }

  @action pan () {
    if (this.state.view.panning) {
      this.state.view.pos.x = this.state.view.panStartPos.x - 
        (this.state.mouse.pos.x - this.state.mouse.panStartPos.x);
      this.state.view.pos.y = this.state.view.panStartPos.y - 
        (this.state.mouse.pos.y - this.state.mouse.panStartPos.y);
    }
  }

  /** This doesn't really NEED to be a computed, but why not? */
  @computed get circuitSelectionsModel () {
    return new SelectionsModel(this.state.circuitSelections);
  }
}

export
namespace CircuitEditorUIModel {
  
  export
  interface IOptions {

    state: any;
    circuitVisualModel: CircuitVisualModel;
  }
}

/** TODO: move this elsewhere? no need really */
export class SelectionsModel {

  state: any;
  
  constructor (options: SelectionsModel.IOptions) {
    
    this.state = options.state;
  }

  @action assertCategory (category) {

    if (!(category in this.state)) {
      this.state[category] = [];
      return false;
    } else {
      return true;
    }
  }

  @action select ({ category, item }) {
    
    if (!(this.state[category].includes(item))) {
      this.state[category].push(item);
    }
  }
  
  @action deselect ({ category, item }) {

    _.remove(this.state[category], (x) => item == x);
  }

  @action deselectAll () {

    _.each(this.state, (items, category) => {
      items.length = 0; // lol t-thanks javascript
    });
  }
}

export namespace SelectionsModel {

  export interface IOptions {
    state: any;
  }
}
