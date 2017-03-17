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
 * to render some interface components.
 */
@observer export
class CircuitEditorInterfaceViewComponent extends React.Component<any, any> {
  
  constructor () {
    super();
  }

  render () {

    const options = _.defaults({}, this.props, {
      onMeasure: () => {}
    });

    const absViewProps = {
      items: _.map(options.items, (item: any): any => {
        return {
          id: item.id,
          z: item.z,
          component: item.component,
          pos: modelToView(this.props.uiModel.state.view, item.pos),
        };
      })
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
    onMeasure: any;
  }
}
