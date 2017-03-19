export interface CircuitSymbolTemplate {

  /** Typically something like:
   *  "labextension/jupyterlab_circuits/circuitdefs.svg#resistor"
   */
  path: string;
  
  /** The dimensions of the component in pixels, used for culling. */
  dims: { width: number, height: number },

  /** Names and positions of the pins. */
  pins: { name: string, pos: { x: number, y: number } }[]
};
