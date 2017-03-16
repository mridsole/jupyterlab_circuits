import { Widget, Panel } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';

export
class ReactComponentPanel extends Panel {
  
  // This is appended to the props.
  @observable dims = { x: 0, y: 0 };

  /**
   * Construct a GraphDraw panel.
   */
  constructor(options: ReactComponentPanel.IOptions) {
    super();

    // HACK: force no outline on the root node.
    this.node.style['outline'] = 'none';

    // Render the component.
    ReactDOM.render(options.component, this.node);
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
    this.dispose();
  }

  /**
   * Handle resize events.
   */
  protected onResize(msg: Widget.ResizeMessage): void {
    super.onResize(msg);
    this.dims.x = msg.width;
    this.dims.y = msg.height;
  }
}

export
namespace ReactComponentPanel {

  /**
   * Initialization options for a GraphDraw panel.
   */
  export
  interface IOptions {

    /** The react component to render in the panel. */
    component: any;
  }
}
