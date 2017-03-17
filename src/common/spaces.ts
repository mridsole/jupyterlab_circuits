import { Vec2 } from './math';

/** Transform coordinates from model space to view space. */
export function modelToView(viewState, pos: Vec2): Vec2 {
  
  return {
    x: viewState.zoom * (pos.x - viewState.pos.x) + viewState.dims.width / 2,
    y: viewState.zoom * (pos.y - viewState.pos.y) + viewState.dims.height / 2
  };
}

/** Transform coordinates from view space to model space. */
export function viewToModel(viewState, pos: Vec2): Vec2 {

  return {
    x: (pos.x - viewState.dims.width / 2) / viewState.zoom + viewState.pos.x,
    y: (pos.y - viewState.dims.height / 2) / viewState.zoom + viewState.pos.y
  };
}
