import { observer } from 'mobx-react';
import * as React from 'react';
//import { AbsoluteViewComponent } from '../absoluteview';
import { AbsoluteGridComponent } from '../absolutegrid';
import { CircuitEditorGridComponent } from './grid';
import { CircuitEditorInterfaceViewComponent } from './interfaceview';
import { CircuitEditorUIModel } from '../../models/circuiteditorui';

import './component.css';

const circuitdefs = require('./circuitsymbols/circuitdefs.svg');

@observer export
class CircuitEditorComponent extends React.Component<any, any> {

  constructor () {
    super();
  }

  render () {

    const uiModel = this.props.uiModel;

    const circInterfaceViewProps = {

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
      <CircuitEditorInterfaceViewComponent {...circInterfaceViewProps} />
      <svg style={{ position: 'absolute', left: 0, top: 0 }}>
        <use x={100} xlinkHref={circuitdefs + '#bjtnpn'} />
        <use x={0} xlinkHref={circuitdefs + '#resistor'} />
      </svg>
    </div>;
  }
}

export namespace CircuitEditorComponent {
  
  export interface IProps {

    uiModel: CircuitEditorUIModel;
  }
}
