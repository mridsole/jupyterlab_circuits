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
        //{
        //  // This is now position in model space!
        //  pos: { x: 100, y: 200 },
        //  component: <div style={{ color: 'blue' }}>hello</div>,
        //  z: 0,
        //  id: '1'
        //}
      ],

      uiModel: uiModel,

      onMeasure: (dims) => {
        uiModel.onViewDimsChange(dims);
      }
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
