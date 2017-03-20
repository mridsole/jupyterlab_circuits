import * as _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import { CircuitSymbolTemplate } from '../../../common/circuit';
import { CircuitEditorUIModel } from '../../../models/circuiteditorui';
import { CircuitVisualModel } from '../../../models/circuitvisual';
import { modelToView } from '../../../common/spaces';

import './component.css';

@observer export
class CircuitEditorCircuitViewComponent extends React.Component<any, any> {

  constructor () {
    super();
  }

  render () {

    const uiModel = this.props.uiModel;
    const circuitVisualModel = this.props.circuitVisualModel;

    const wireNodes = circuitVisualModel.state.wireNodes;
    
    /* Create the wire components. */
    const wireComponents = _.chain(wireNodes)

      .map((wireNode, id) => {
        return _.map(wireNode.connections, (otherid) => {
          return { id1: id, id2: otherid };
        });
      })

      .flatten()

      .uniqWith((c1, c2) => {
        return (c1.id1 == c2.id1 && c1.id2 == c2.id2) || (c1.id2 == c2.id1 && c1.id1 == c2.id2);
      })

      .map((c) => {
        return <WireComponent {...{
          uiModel: uiModel,
          node1: wireNodes[c.id1],
          node2: wireNodes[c.id2],
          circuitVisualModel: circuitVisualModel,
          key: c.id1 + '-' + c.id2
        }} />;
      })

      .value();

    /* Create the wire node components. */
    const wireNodeComponents = _.map(circuitVisualModel.wireNodeModels, (wireNodeModel, id) => {
      return <WireNodeComponent {...{
        uiModel: uiModel,
        wireNodeModel: wireNodeModel,
        key: 'node-' + id
      }} />;
    });

    /* Create the symbol components. */
    const symbolComponents = _.map(circuitVisualModel.symbolModels, (symbolModel, name) => {
      return <SymbolComponent {...{
        uiModel: uiModel,
        circuitSymbolModel: symbolModel,
        key: 'symbol-' + name
      }} />;
    });

    return <svg className='jpcirc-CircuitEditorCircuitView-root'>
      {wireComponents}
      {symbolComponents}
      {wireNodeComponents}
    </svg>;
  }
}

export namespace CircuitEditorCircuitViewComponent {
  
  export interface IProps {

    uiModel: CircuitEditorUIModel;
    circuitVisualModel: CircuitVisualModel;
  }
}

/** Higher order component that transforms an SVG element to view coordinates. */
const ModelToViewComponent = (WrappedComponent) => {

  return observer((props: any) => {

    const view = props.uiModel.state.view;

    const b = 0;
    const c = 0;
    const a = view.zoom;
    const d = view.zoom;
    const e = - view.pos.x * view.zoom + view.dims.width / 2;
    const f = - view.pos.y * view.zoom + view.dims.height / 2;

    return <g transform={
      'matrix(' + [a, b, c, d, e, f].join(',') + ')'
    } >
      <WrappedComponent { ...props } />
    </g>;
  });
}
  
const WireComponent = ModelToViewComponent(
  observer((props: any) => {

    // Wrapped in ModelToView; work in model space!

    const pos1 = props.node1.pos;
    const pos2 = props.node2.pos;

    return <line x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y} 
      strokeWidth={3} stroke={'#000000'} strokeLinecap={'round'} />;
  })
);

const WireNodeComponent = ModelToViewComponent(
  observer((props: any) => {

    const wireNodeModel = props.wireNodeModel;

    // If this is a junction, we render a black circle.
    if (wireNodeModel.isJunction) {
      return <circle cx={wireNodeModel.state.pos.x} onClick={() => { console.log('WAT'); }}
        cy={wireNodeModel.state.pos.y} r={4} />;
    } else {
      return null;
    }
  })
);

const SymbolComponent = ModelToViewComponent(
  observer((props: any) => {

    const symbolModel = props.circuitSymbolModel;

    return <use xlinkHref={symbolModel.state.template.path} 
      x={symbolModel.state.pos.x} y={symbolModel.state.pos.y} />;
  })
);
