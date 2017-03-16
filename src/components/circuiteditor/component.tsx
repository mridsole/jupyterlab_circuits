import { proxyObservable } from 'mobx-proxy';
import { observer } from 'mobx-react';
import * as React from 'react';
import { AbsoluteViewComponent } from '../absoluteview';
import { AbsoluteGridComponent } from '../absolutegrid';
import { CircuitEditorGridComponent } from './grid';

import './component.css';

@observer export
class CircuitEditorComponent extends React.Component<any, any> {

  constructor () {
    super();
  }

  render () {

    const absViewProps = {
      items: [
        {
          pos: { x: 100, y: 200 },
          component: <div style={{ color: 'blue' }}>hello</div>,
          z: 0,
          id: '1'
        }
      ]
    };
    
    return <div className='jpcirc-CircuitEditor-root' >
      <CircuitEditorGridComponent {...{
        viewPos: { x: 0, y: 0 },
        zoom: 1,
        spacing: 12
      }} />
      <AbsoluteViewComponent {...absViewProps} />
    </div>;
  }
}

export
namespace CircuitEditorComponent {
  
  // TODO: IProps
}
