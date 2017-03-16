//import * as _ from 'lodash';
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import { observable, action, autorun } from 'mobx';
//import { observer } from 'mobx-react';
//
//import { Vec2 } from '../../common/vec';
//import { GraphNodeComponent } from '../graphnode';
//import { GraphEdgeComponent } from '../graphedge';
//import * as Actions from '../../common/actions';
//
//import uiStore from '../../stores/uistore';
//import graphStore from '../../stores/graphstore';
//
//require('./component.css');
//
//@observer export
//class GraphViewComponent extends React.Component<GraphViewComponent.IProps, any> {
//
//  static readonly VIEW_CLASS = 'graphdraw-View';
//
//  constructor () {
//    super();
//  }
//
//  render () {
//    
//    let model = this.props.model;
//    let dispatch = this.props.dispatch;
//    let nodeEntries = model.nodes.entries();
//
//    // Map the nodes to an array of node components.
//    let nodeComponents = _.map(nodeEntries, (nodeEntry) => {
//      let [nodeID, node] = nodeEntry;
//      let opts = { graphNodeModel: node, uiStore, graphStore }
//      return <GraphNodeComponent key={'node-' + nodeID}  options={opts}
//        dispatch={dispatch} />;
//    });
//    
//    // Get an array of edge components without duplicates.
//    let edgeComponents = _.chain(nodeEntries)
//      .map((nodeEntry) => {
//        let [nodeID, node] = nodeEntry;
//        return _.map(node.connectedTo, (otherNodeID) => {
//          return { node1ID: nodeID, node2ID: otherNodeID };
//        });
//      })
//      .flatten()
//      .uniqWith((e1, e2) => {
//        let result = (e1 == e2) || (e1.node1ID == e2.node2ID && e1.node2ID == e2.node1ID);
//        return result;
//      })
//      .map((edgeInfo) => {
//        let edgeModel = {
//          node1: model.nodes.get(edgeInfo.node1ID),
//          node2: model.nodes.get(edgeInfo.node2ID)
//        };
//        return <GraphEdgeComponent key={edgeInfo.node1ID + '-' + edgeInfo.node2ID} 
//          model={edgeModel} dispatch={dispatch} />;
//      })
//      .value();
//
//      let onMouseMove = (e) => {
//        dispatch({ type: Actions.MOUSE_MOVE, mouseEvent: e });
//      };
//
//      let onClick = (e) => {
//        dispatch({ type: Actions.NODE_DESELECT_ALL });
//      };
//    
//    return <div className={GraphViewComponent.VIEW_CLASS} onMouseMove={onMouseMove} onClick={onClick} >
//      <div>{edgeComponents}</div>
//      <div>{nodeComponents}</div>
//    </div>;
//  }
//}
//
//export
//namespace GraphViewComponent {
//
//  export
//  interface INodeModel {
//
//    /** The position of the node. */
//    pos: Vec2;
//    
//    /** Array of IDs of connected nodes. */
//    connectedTo: string[];
//  }
//
//  export
//  interface IGraphModel {
//
//    /** Map of node IDs to node data. */
//    nodes: any;
//  }
//  
//  export
//  interface IProps {
//
//    model: IGraphModel;
//    dispatch: (any) => void;
//  }
//}
//
//export default GraphViewComponent;
