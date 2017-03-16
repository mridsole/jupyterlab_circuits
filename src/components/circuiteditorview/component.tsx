import { proxyObservable } from 'mobx-proxy';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as _ from 'lodash';
import { AbsoluteViewComponent } from '../absoluteview';

/**
 * The grid on which the circuit is drawn. The root div
 * is the container.
 */
@observer export
class CircuitEditorViewComponent extends 
  React.Component<CircuitEditorViewComponent.IProps, any> {

  constructor () { super(); }

  render () {

    const components = _.map(this.props.items, (item, id) => {

      /* TODO: We will have some concept of view space and model space,
         regarding the (x, y) coordinates. Where should this transformation
         happen? I guess it would be when we have some concept of a
         circuit model.
       */

      const style = {
        left: item.pos.x + 'px',
        top: item.pos.y + 'px'
      }

      return <div className={'jpcirc-CircuitEditorView-itemcontainer'}
        style={style} key={item.id}>
        {item.component}
      </div>;
    });
    
    return <div className='jpcirc-CircuitEditorView-root'>
      {components}
    </div>;
  }
}

export namespace CircuitEditorViewComponent {
  
  /**
   * Represents something to be displayed in the view.
   */
  export interface IItem {
    id: string;
    component: any;
    pos: { x: number, y: number };
  }
  
  export interface IProps {
    items: { [id: string]: IItem };
  }
}
