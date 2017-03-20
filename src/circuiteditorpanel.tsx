import { Widget, Panel } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { proxyObservable } from 'mobx-proxy';
import { CircuitEditorComponent } from './components/circuiteditor';
import { CircuitEditorUIModel } from './models/circuiteditorui';
import { CircuitVisualModel } from './models/circuitvisual';
import { defaultSymbols } from './components/circuiteditor/circuitsymbols';

export
class CircuitEditorPanel extends Panel {

  /**
   * Construct a GraphDraw panel.
   */
  constructor(options: CircuitEditorPanel.IOptions) {
    super();

    //// HACK: force no outline on the root node.
    this.node.style['outline'] = 'none';

    // For testing ...
    const uiModel = new CircuitEditorUIModel({ state: proxyObservable({}) });
    document['uiModel'] = uiModel;

    // Do a little test here for computed models ...
    const cvm = new CircuitVisualModel({
      state: proxyObservable({

        symbols: {

          R1: {
            template: defaultSymbols.resistor,
            pos: { x: 200, y: 0 },
            rot: 0,
            mirror: false
          },
        },

        wireNodes: {

          a: {
            pos: { x: 0, y: 0 },
            connections: ['b', 'c', 'd']
          },

          b: {
            pos: { x: 100, y: 0 },
            connections: ['a', 'c']
          },

          c: {
            pos: { x: 100, y: 100 },
            connections: ['a', 'b']
          },

          d: {
            pos: { x: -50, y: 0 },
            connections: ['a']
          }
        }
      })
    });

    ReactDOM.render(<CircuitEditorComponent uiModel={uiModel} circuitVisualModel={cvm} />, this.node);

    // For some debugging
    document['models'] = {
      uiModel: uiModel,
      circuitVisualModel: cvm
    }
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {

    if (this.isDisposed) { return; }

    // Dispose console widget.
    //this._content.dispose();
    //this._content = null;

    super.dispose();
  }

  /**
   * Handle `'activate-request'` messages.
   */
  protected onActivateRequest(msg: Message): void {

    // Not sure why but this is necessary to get the blue bar above the tab.
    this.node.tabIndex = -1;
    this.node.focus();
  }

  /**
   * Handle `'close-request'` messages.
   */
  protected onCloseRequest(msg: Message): void {
    super.onCloseRequest(msg);

    console.log('Closing CircuitEditorPanel.');
    this.dispose();
  }

  /**
   * Handle resize events.
   */
  protected onResize(msg: Widget.ResizeMessage): void {
    super.onResize(msg);
  }
}

export
namespace CircuitEditorPanel {

  /**
   * Initialization options for a GraphDraw panel.
   */
  export
  interface IOptions {

  }
}
