import { proxyObservable } from 'mobx-proxy';

/**
 * @brief State and logic for a circuit editor.
 *
 * Note that this is not aware of it's container (e.g. a panel) so state like
 * the panel ID and title is stored elsewhere.
 */
export
class CircuitEditorUIModel {
  
  // Ideally all observable state should be in this ProxyObservable.
  state: any;

  constructor (options: CircuitEditorUIModel.IOptions) {
    this.state = proxyObservable({});
  }
}

export
namespace CircuitEditorUIModel {
  
  export
  interface IOptions {
    
  }
}
