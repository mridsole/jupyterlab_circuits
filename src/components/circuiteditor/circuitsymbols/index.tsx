/**
 * Exports circuit symbol SVG data (well, packs it and exports paths to
 * SVG defs) and also metadata like the dimensions and where the pins are.
 */

import { CircuitSymbolTemplate } from '../../../common/circuit';

const defaultSheet = require('./circuitdefs.svg');

export const defaultSymbols: { [id: string]: CircuitSymbolTemplate } = {

  resistor: {
    path: defaultSheet + '#resistor',
    dims: { width: 100, height: 39.22 },
    pins: [
      { name: '+', pos: { x: 0, y: 21.105 } },
      { name: '-', pos: { x: 100, y: 21.105 } }
    ]
  },

  capacitor: {
    path: defaultSheet + '#capacitor',
    dims: { width: 100, height: 40 },
    pins: [
      { name: '+', pos: { x: 0, y: 21.52 } },
      { name: '-', pos: { x: 100, y: 21.52 } }
    ]
  },

  inductor: {
    path: defaultSheet + '#inductor',
    dims: { width: 100, height: 40 },
    pins: [
      { name: '+', pos: { x: 0, y: 17.5 } },
      { name: '-', pos: { x: 100, y: 17.5 } }
    ]
  },

  diode: {
    path: defaultSheet + '#diode',
    dims: { width: 100, height: 40 },
    pins: [
      { name: '+', pos: { x: 0, y: 21.52 } },
      { name: '-', pos: { x: 100, y: 21.52 } }
    ]
  },
};
