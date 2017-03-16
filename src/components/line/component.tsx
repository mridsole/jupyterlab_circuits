import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, action, autorun } from 'mobx';
import { observer } from 'mobx-react';
import { Vec2 } from '../../common/vec';

require('./component.css');

@observer export
class LineComponent extends React.Component<LineComponent.IProps, any> {

  constructor () {
    super();
  }

  render () {
  
    // Render a line.

    // Defaults:
    let opts = this.props.opts;

    _.defaults(opts, {
      pos1: { x: 0, y: 0 },
      pos2: { x: 0, y: 0 },
      color: '#000000',
      thickness: 1,
      opacity: 1
    });

    let length = Vec2.dist(opts.pos1, opts.pos2);
    let angle = Vec2.ang(opts.pos1, opts.pos2);

    let style = {
      left: opts.pos1.x,
      top: opts.pos1.y,
      width: length + 'px',
      borderTopWidth: opts.thickness + 'px',
      borderColor: opts.color,
      transformOrigin: '0% 0%',
      transform: 'rotate(' + angle + 'rad)',
      opacity: opts.opacity
    };

    return <div className={LineComponent.LINE_CLASS} style={style}></div>
  }
}

export
namespace LineComponent {

  export
  const LINE_CLASS = 'graphdraw-Line';

  export
  interface IOptions {

    /** Starting position of the line. */
    pos1?: Vec2;

    /** Ending position of the line. */
    pos2?: Vec2;

    color?: string;
    thickness?: number;
    opacity?: number;
  }
  
  export
  interface IProps {
    
    opts: IOptions;
  }
}

export default LineComponent;
