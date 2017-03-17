import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as Measure from 'react-measure';
import { AbsoluteViewComponent } from '../../absoluteview';

import './component.css';

/**
 * Lke AbsoluteView, but works in model space coordinates.
 */
@observer export
class CircuitEditorViewComponent extends React.Component<any, any> {
  
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
          pos: {
            x: options.zoom * (item.pos.x - options.pos.x) + options.dims.width / 2,
            y: options.zoom * (item.pos.y - options.pos.y) + options.dims.height / 2
          }
        };
      })
    };

    return <Measure onMeasure={options.onMeasure}>
      <AbsoluteViewComponent {...absViewProps} />
    </Measure>;
  }
}

export
namespace CircuitEditorViewComponent {

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

    /** Position of the top left corner of the viewport. */
    /** Now the MIDDLE of the viewport. */
    pos: { x: number, y: number };

    /** Dimensions of the viewport in pixels - obtained either by onMeasure
        or by other means. */
    dims: { width: number, height: number };

    /** Zoom factor/multiplier. */
    zoom: number;
    
    /** Items to display; this should be computed from the model. */
    items: IItem[];

    /** Called when the viewport dimensions are measured. */
    onMeasure: any;
  }
}
