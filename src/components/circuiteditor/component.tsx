import { observer } from 'mobx-react';
import * as React from 'react';
//import { AbsoluteViewComponent } from '../absoluteview';
import { AbsoluteGridComponent } from '../absolutegrid';
import { CircuitEditorGridComponent } from './grid';
import { CircuitEditorViewComponent } from './view';
import { CircuitEditorUIModel } from '../../models/circuiteditorui';

import './component.css';

@observer export
class CircuitEditorComponent extends React.Component<any, any> {

  constructor () {
    super();
  }

  render () {

    const uiModel = this.props.uiModel;

    const circViewProps = {

      items: [
        {
          // This is now position in model space!
          pos: { x: 100, y: 200 },
          component: <div style={{ color: 'blue' }}>hello</div>,
          z: 0,
          id: '1'
        }
      ],

      pos: uiModel.state.view.pos,
      zoom: uiModel.state.view.zoom,
      dims: uiModel.state.view.dims,

      onMeasure: (dims) => {
        uiModel.onViewDimsChange(dims);
      }
    };
    
    return <div className='jpcirc-CircuitEditor-root' >
      <CircuitEditorGridComponent {...{
        pos: uiModel.state.view.pos,
        zoom: uiModel.state.view.zoom,
        spacing: uiModel.state.grid.spacing
      }} />
      <CircuitEditorViewComponent {...circViewProps} />
    </div>;
  }
}

export namespace CircuitEditorComponent {
  
  export interface IProps {

    uiModel: CircuitEditorUIModel;
  }
}
