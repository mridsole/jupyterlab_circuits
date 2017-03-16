import { proxyObservable } from 'mobx-proxy';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as Measure from 'react-measure';

import './component.css';

/**
 * A grid ... that's absolute
 */
@observer export
class AbsoluteGridComponent extends React.Component<any, any> {
  
  // This local state is necessary so that we can just throw this grid anywhere
  // and have it work (and not have to worry about passing down dimensions from
  // above).
  @observable dims = { width: 0, height: 0 };

  constructor () {
    super();
  }

  render () {

    const options = _.defaults({}, this.props, {
      thickness: 1,
      color: '#AAAAAA',
      spacing: 12,
      offset: { x: 5, y: 2 }
    });

    const nx = this.dims.width / options.spacing + 1;
    const ny = this.dims.height / options.spacing + 1;

    const vlines = _.map(_.range(ny), (k) => {
      return <rect key={k} x={0} y={k*options.spacing} fill={options.color}
        width={((nx + 3) / (nx + 1)) * this.dims.width} height={options.thickness} />
    });

    const hlines = _.map(_.range(nx), (k) => {
      return <rect key={k} x={k*options.spacing} y={0} fill={options.color}
        width={options.thickness} height={((ny + 3) / (ny + 1)) * this.dims.height} />
    });

    const svgStyle = {
      width: this.dims.width * (nx + 3) / (nx + 1),
      height: this.dims.height * (ny + 3) / (ny + 1),
      position: 'absolute',
      left: -options.spacing + options.offset.x,
      top: -options.spacing + options.offset.y
    };

    return (
      <Measure
        onMeasure={(dims) => {
          _.assign(this.dims, dims);
        }}
        >
        <div className={'jpcirc-AbsoluteGrid-root'}>
          <svg style={svgStyle} shapeRendering={'crispEdges'}>
            <g> {vlines} </g>
            <g> {hlines} </g>
          </svg>
        </div>
      </Measure>
    );
  }
}

export
namespace AbsoluteGridComponent {
  
  // TODO: IProps
  interface IProps {

    // Thickness of the grid lines, in pixels.
    thickness?: number;
    
    // Color of the grid lines, eg '##FF0000'.
    color?: string;

    // The grid spacing, in pixels.
    spacing: number;
    
    // Offset of the grid in pixels.
    offset: { x: number, y: number };
  }
}
