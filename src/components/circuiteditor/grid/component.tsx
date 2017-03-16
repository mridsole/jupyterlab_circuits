import { proxyObservable } from 'mobx-proxy';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as Measure from 'react-measure';
import { AbsoluteGridComponent } from '../../absolutegrid';

import './component.css';

/**
 * Grid specific to the circuit editor - this takes coordinates in model
 * space, and handles where the grid offset when panning and so forth.
 *
 * Need to sort out: do we proceed by defining prop interfaces like this,
 * or just pass stores to everything as required?
 *
 * The key factor is whether or not a component is reusable - if not,
 * then we don't worry about interface consistency. This component didn't
 * really need to be reusable I guess, so we could have just passed
 * stores directly.
 */
@observer export
class CircuitEditorGridComponent extends React.Component<any, any> {
  
  constructor () {
    super();
  }

  render () {
    
    // Default props - really the defaults shouldn't happen though.
    const options = _.defaults({}, this.props, {
      viewPos: { x: 0, y: 0 },
      zoom: 1,
      spacing: 12
    });

    // Compute the grid offset.
    const offset = {
      x: (-options.viewPos.x * options.zoom) % (options.zoom * options.spacing),
      y: (-options.viewPos.y * options.zoom) % (options.zoom * options.spacing)
    };

    const absGridProps = {
      thickness: 1,
      spacing: options.zoom * options.spacing,
      color: '#AAAAAA',
      offset: offset
    };
    
    return <AbsoluteGridComponent {...absGridProps} />;
  }
}

export
namespace CircuitEditorGridComponent {

  interface IProps {

    /** Position of the top left corner of the viewport. */
    viewPos: { x: number, y: number };

    /** Zoom factor/multiplier. */
    zoom: number;

    /** Spacing in model space. */
    spacing: number;
  }
}
