import { observer } from 'mobx-react';
import * as React from 'react';
import * as _ from 'lodash';
import * as shortid from 'shortid';
import './component.css';

/**
 * A general purpose component for absolutely positioning children.
 */
@observer export
class AbsoluteViewComponent extends 
  React.Component<AbsoluteViewComponent.IProps, any> {

  constructor () { super(); }

  render () {

    // TODO: figure out efficient implementation and compute z ordering.
    // For now just render items ordered as they are.

    const options = _.defaults({}, this.props, {
      onClick: () => { },
      onMouseDown: () => {},
      onMouseUp: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onMouseMove: () => {},
      onWheel: () => {}
    });

    const callbacks = _.pick(options, [
      'onClick', 'onMouseDown', 'onMouseUp', 'onMouseEnter',
      'onMouseLeave', 'onMouseMove', 'onWheel'
    ]);

    const components = _.map(this.props.items, (item) => {
    
      const style = {
        left: item.pos.x + 'px',
        top: item.pos.y + 'px'
      }
    
      return <div className={'jpcirc-AbsoluteView-itemcontainer'}
        style={style} key={item.id}>
        {item.component}
      </div>;
    });

    return <div className='jpcirc-AbsoluteView-root' {...callbacks} >
      {components}
    </div>;
  }
}

export namespace AbsoluteViewComponent {
  
  /**
   * Represents something to be displayed in the view.
   */
  export interface IItem {
    id: string;
    z: number;
    component: any;
    pos: { x: number, y: number };
  }

  export interface IProps {
    
    // List of items to render.
    items: IItem[];

    // Event handlers.
    onClick?: (any) => void;
    onMouseDown?: (any) => void;
    onMouseUp?: (any) => void;
    onMouseEnter?: (any) => void;
    onMouseLeave?: (any) => void;
    onMouseMove?: (any) => void;
    onWheel?: (any) => void;
  }
}
