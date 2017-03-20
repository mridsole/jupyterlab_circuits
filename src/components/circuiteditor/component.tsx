import { observer } from 'mobx-react';
import * as React from 'react';
//import { AbsoluteViewComponent } from '../absoluteview';
import { AbsoluteGridComponent } from '../absolutegrid';
import { CircuitEditorGridComponent } from './grid';
import { CircuitEditorCircuitViewComponent } from './circuitview';
import { CircuitEditorInterfaceViewComponent } from './interfaceview';
import { CircuitEditorUIModel } from '../../models/circuiteditorui';
import { defaultSymbols } from './circuitsymbols';

import './component.css';

const circuitdefs = require('./circuitsymbols/circuitdefs.svg');

@observer export
class CircuitEditorComponent extends React.Component<any, any> {

  constructor () {
    super();
  }

  render () {

    const uiModel = this.props.uiModel;
    const circuitVisualModel = this.props.circuitVisualModel;

    // need to formalize this a bit more - for now a controller is just a
    // set of event handler functions that link the view to model actions
    const controller = {
      
      // Event handlers for the circuit view background.
      background: {

        onClick: (e) => {
          uiModel.circuitSelectionsModel.deselectAll();
        },

        onWheel: (e) => {
          
          // Zooming behaviour.

          if (!e.ctrlKey) { return; }

          if (e.deltaY < 0 && uiModel.state.view.zoom < 10) {
            uiModel.multiplyZoom(1.2);
          } else if (e.deltaY > 0 && uiModel.state.view.zoom > 0.2) {
            uiModel.multiplyZoom(1/1.2);
          }
          e.preventDefault();
        },

        onMouseMove: (e) => {
          uiModel.updateMousePos({ x: e.clientX, y: e.clientY });

          if (uiModel.state.view.panning) {
            uiModel.pan();
            window.getSelection().removeAllRanges();
          }

          if (!e.ctrlKey) { uiModel.stopPanning(); }
        },

        onMouseDown: (e) => {

          // Start panning.

          if (e.ctrlKey && e.button == 0) {
            uiModel.startPanning();
          }
        },

        onMouseUp: (e) => {
          uiModel.stopPanning();
        },

        onMouseLeave: (e) => {
          uiModel.stopPanning();
        }
      },

      node: {
        onClick: (e) => {

        }
      },

      symbol: {
        onClick: (e, symbolModel) => {
          uiModel.circuitSelectionsModel.select({ category: 'symbols', item: symbolModel.id });
          e.preventDefault();
        }
      }
    };

    const circuitViewProps = {

      uiModel: uiModel,
      circuitVisualModel: circuitVisualModel,

      onMeasure: (dims) => {
        uiModel.onViewDimsChange(dims);
      },

      controller
    };

    const interfaceViewProps = {

      items: [
        //{
        //  // This is now position in model space!
        //  pos: { x: 100, y: 200 },
        //  component: <div style={{ color: 'blue' }}>hello</div>,
        //  z: 0,
        //  id: '1'
        //}
      ],

      uiModel: uiModel,

    };
    
    return <div className='jpcirc-CircuitEditor-root'>
      <CircuitEditorGridComponent {...{ uiModel }} />
      <CircuitEditorCircuitViewComponent {...circuitViewProps} />
      <CircuitEditorInterfaceViewComponent {...interfaceViewProps} />
    </div>;
  }
}

export namespace CircuitEditorComponent {
  
  export interface IProps {

    uiModel: CircuitEditorUIModel;
  }
}
