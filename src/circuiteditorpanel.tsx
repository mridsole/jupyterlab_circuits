import { Widget, Panel } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CircuitEditorComponent } from './components/circuiteditor';

export
class CircuitEditorPanel extends Panel {

  /**
   * Construct a GraphDraw panel.
   */
  constructor(options: CircuitEditorPanel.IOptions) {
    super();

    //// HACK: force no outline on the root node.
    this.node.style['outline'] = 'none';

    ReactDOM.render(<CircuitEditorComponent />, this.node);
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
