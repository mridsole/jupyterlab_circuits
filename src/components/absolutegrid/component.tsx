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
      offset: { x: 0, y: 0 }
    });

    // The mathematics following is not as simple as it could be but it works lol

    const nx = Math.round(this.dims.width / options.spacing + 2);
    const ny = Math.round(this.dims.height / options.spacing + 2);

    console.log(nx);

    const vlines = _.map(_.range(nx), (k) => {
      
      const x = k * options.spacing;
      const length = (ny + 1) * options.spacing;
      return <line key={k} x1={x} x2={x} y1={0} y2={length}
        strokeWidth={options.thickness} stroke={options.color} />;
    });

    const hlines = _.map(_.range(ny), (k) => {
      
      const y = k * options.spacing;
      //const length = ((ny + 3) / (ny + 1)) * this.dims.width;
      const length = (nx + 1) * options.spacing;
      return <line key={k} y1={y} y2={y} x1={0} x2={length} 
        strokeWidth={options.thickness} stroke={options.color} />;
    });

    const svgStyle = {
      //width: this.dims.width * (nx + 3) / (nx + 1),
      //height: this.dims.height * (ny + 3) / (ny + 1),
      width: options.spacing * (nx + 1),
      height: options.spacing * (ny + 1),
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
          {/* TODO: crispEdges causes bad rendering on browser-level 
              zoom - alternative? */}
          <svg style={svgStyle} >//shapeRendering={'crispEdges'}>
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
