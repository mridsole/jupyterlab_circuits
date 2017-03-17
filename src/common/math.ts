export interface Vec2 {
  x: number;
  y: number;
}

export
namespace Vec2 {

  export function norm(x: Vec2): number {
    return Math.sqrt(Math.pow(x.x, 2) + Math.pow(x.y, 2));
  }

  export function dist(a: Vec2, b: Vec2): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  export function ang(a: Vec2, b: Vec2): number {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }
}

/** A rectangle between these two points. */
export interface Rect {
  x: Vec2;
  y: Vec2;
}

/** Check if two rectangles intersect partially. */

