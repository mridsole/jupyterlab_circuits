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

    const circuitViewProps = {

      uiModel: uiModel,
      circuitVisualModel: circuitVisualModel
    };

    const interfaceViewProps = {

      items: [
        {
          // This is now position in model space!
          pos: { x: 100, y: 200 },
          component: <div style={{ color: 'blue' }}>hello</div>,
          z: 0,
          id: '1'
        }
      ],

      uiModel: uiModel,

      onMeasure: (dims) => {
        uiModel.onViewDimsChange(dims);
      }
    };
    
    return <div className='jpcirc-CircuitEditor-root' >
      <CircuitEditorGridComponent {...{ uiModel }} />
      <CircuitEditorCircuitViewComponent {...circuitViewProps} />
      <CircuitEditorInterfaceViewComponent {...interfaceViewProps} />
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <use x={0} xlinkHref={circuitdefs + '#resistor'} />
        <use x={100} xlinkHref={circuitdefs + '#bjtnpn'} />
        <use x={200} xlinkHref={circuitdefs + '#capacitor'} />
        <use x={300} xlinkHref={circuitdefs + '#inductor'} />
        <use x={400} xlinkHref={circuitdefs + '#bjtpnp'} />
        <use x={500} xlinkHref={circuitdefs + '#diode'} />
        <use x={600} xlinkHref={circuitdefs + '#voltagesource'} />
        <use x={700} xlinkHref={circuitdefs + '#currentsource'} />
      </svg>
    </div>;
  }
}

export namespace CircuitEditorComponent {
  
  export interface IProps {

    uiModel: CircuitEditorUIModel;
  }
}
