import * as _ from 'lodash';
import { Session, Kernel } from '@jupyterlab/services';
import { IServiceManager } from 'jupyterlab/lib/services';
import { JupyterLab, JupyterLabPlugin } from 'jupyterlab/lib/application';
import { ILauncherItem, ILauncher } from 'jupyterlab/lib/launcher';
import { ICommandPalette, IPaletteItem } from 'jupyterlab/lib/commandpalette';
import { IMainMenu } from 'jupyterlab/lib/mainmenu';
import { IDocumentRegistry } from 'jupyterlab/lib/docregistry'; 
import { DockPanel, Panel, Widget, Menu } from '@phosphor/widgets';
import { CircuitEditorPanel } from './circuiteditorpanel';

/**
 * Initialization data for the jupyterlab_circuits extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_circuits',
  requires: [
    ILauncher,
    ICommandPalette,
    IMainMenu,
    IDocumentRegistry
  ],
  autoStart: true,
  activate: activateExtension
};

function activateExtension(
  app: JupyterLab,
  launcher: ILauncher,
  commandPalette: ICommandPalette,
  mainMenu: IMainMenu,
  documentRegistry: IDocumentRegistry
): void {

  /* TODO:
   *  - Register a new launcher item.
   *  - Make the widget.
   */
  
  // Register a command for creating a new circuit editor.
  app.commands.addCommand(
    'circuits:create-new-editor', {
      label: 'Create New Circuit',
      execute: () => { createCircuitEditor(app); }
    }
  );
  
  // Construct and add the launcher item.
  let launcherItem: ILauncherItem = {
    name: 'Circuit',
    command: 'circuits:create-new-editor' 
  };
  
  launcher.add(launcherItem);
}

function createCircuitEditor(app: JupyterLab): void {
  
  // TODO: tracker system for these panels (necessary for ID etc - who manages them?)
  let panel = new CircuitEditorPanel({});
  panel.id = 'hey';
  panel.title.label = 'Circuit Editor';
  panel.title.closable = true;
  app.shell.addToMainArea(panel);
  app.shell.activateMain(panel.id);

  // Make kernel available for some testing in chrome console
  document['Kernel'] = Kernel;
}

export default extension;
