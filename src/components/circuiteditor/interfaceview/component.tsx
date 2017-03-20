import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as Measure from 'react-measure';
import { AbsoluteViewComponent } from '../../absoluteview';
import { modelToView } from '../../../common/spaces';
import { CircuitEditorUIModel } from '../../../models/circuiteditorui';

import './component.css';

/**
 * Lke AbsoluteView, but works in model space coordinates. This is used
 * to render some interface components. This also handles mouse interactions
 * with the editor background, for things like panning and zooming.
 * TODO: maybe abstract this controller logic somewhere else?
 */
@observer export
class CircuitEditorInterfaceViewComponent extends React.Component<any, any> {
  
  constructor () {
    super();
  }

  render () {

    const uiModel = this.props.uiModel;

    const options = _.defaults({}, this.props, {
      onMeasure: () => {},
    });

    const absViewProps = {

      items: _.map(options.items, (item: any): any => {
        return {
          id: item.id,
          z: item.z,
          component: item.component,
          pos: modelToView(uiModel.state.view, item.pos),
        };
      }),
      
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
      },
    };

    return <Measure onMeasure={options.onMeasure}>
      <AbsoluteViewComponent {...absViewProps} />
    </Measure>;
  }
}

export
namespace CircuitEditorInterfaceViewComponent {

  /**
   * Represents something to be displayed in the view.
   */
  export interface IItem {

    /** Unique ID, this ideally comes from the model and is not generated
        in a React render function. */
    id: string;

    /** z index (not implemented) */
    z: number;

    /** Component to display. */
    component: any;

    /** Position in model coordinates. */
    pos: { x: number, y: number };
  }

  interface IProps {

    uiModel: CircuitEditorUIModel;
    
    /** Items to display; this should be computed from the model. */
    items: IItem[];

    /** Called when the viewport dimensions are measured. */
    onMeasure?: any;
  }
}
