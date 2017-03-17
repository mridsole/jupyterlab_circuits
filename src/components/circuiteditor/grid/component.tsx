import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as Measure from 'react-measure';
import { AbsoluteGridComponent } from '../../absolutegrid';
import { modelToView } from '../../../common/spaces';
import { CircuitEditorUIModel } from '../../../models/circuiteditorui';

import './component.css';

/**
 * Grid specific to the circuit editor - this takes coordinates in model
 * space, and handles where the grid offset when panning/zooming.
 */
@observer export
class CircuitEditorGridComponent extends React.Component<any, any> {
  
  constructor () {
    super();
  }

  render () {

    const uiModel = this.props.uiModel;
    const viewState = uiModel.state.view;
    
    const viewSpacing = viewState.zoom * uiModel.state.grid.spacing;
    
    /* Goal: always have grid lines intersecting { x: 0, y: 0 }. */
    const offset = {
      x: (-viewState.pos.x * viewState.zoom + viewState.dims.width / 2) % viewSpacing,
      y: (-viewState.pos.y * viewState.zoom + viewState.dims.height / 2) % viewSpacing
    };

    const absGridProps = {
      thickness: 1,
      spacing: viewSpacing,
      color: '#BBBBBB',
      offset: offset
    };
    
    return <AbsoluteGridComponent {...absGridProps} />;
  }
}

export
namespace CircuitEditorGridComponent {

  interface IProps {

    uiModel: CircuitEditorUIModel;
  }
}
