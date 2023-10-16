import { Vector2D } from "../src/lib/vector";

// Tests for Vector2D

test("Vector2D - creating a vector", () => {
  const vector = new Vector2D({ x: 1, y: 2 }, { x: 3, y: 4 });
  expect(vector.a.x).toBe(1);
  expect(vector.a.y).toBe(2);
  expect(vector.b.x).toBe(3);
  expect(vector.b.y).toBe(4);
});

test("Vector2D - setting new points", () => {
  const vector = new Vector2D({ x: 1, y: 2 }, { x: 3, y: 4 });
  vector.set({ x: 5, y: 6 }, { x: 7, y: 8 });
  expect(vector.a.x).toBe(5);
  expect(vector.a.y).toBe(6);
  expect(vector.b.x).toBe(7);
  expect(vector.b.y).toBe(8);
});

test("Vector2D - zeroing the vector", () => {
  const vector = new Vector2D({ x: 1, y: 2 }, { x: 3, y: 4 });
  vector.zero();
  expect(vector.a.x).toBe(0);
  expect(vector.a.y).toBe(0);
});

test("Vector2D - adding vectors", () => {
  const vector1 = new Vector2D({ x: 1, y: 2 }, { x: 3, y: 4 });
  const vector2 = new Vector2D({ x: 5, y: 6 }, { x: 7, y: 8 });
  vector1.add(vector2);
  expect(vector1.a.x).toBe(6);
  expect(vector1.a.y).toBe(8);
  expect(vector1.b.x).toBe(10);
  expect(vector1.b.y).toBe(12);
});

test("Vector2D - subtracting vectors", () => {
  const vector1 = new Vector2D({ x: 5, y: 6 }, { x: 10, y: 12 });
  const vector2 = new Vector2D({ x: 1, y: 2 }, { x: 3, y: 4 });
  vector1.substract(vector2);
  expect(vector1.a.x).toBe(4);
  expect(vector1.a.y).toBe(4);
  expect(vector1.b.x).toBe(7);
  expect(vector1.b.y).toBe(8);
});

test("Vector2D - calculating the vector length", () => {
  const vector = new Vector2D({ x: 3, y: 4 }, { x: 7, y: 1 });
  expect(vector.length).toBeCloseTo(5);
});

test("Vector2D - normalizing the vector", () => {
  const vector = new Vector2D({ x: 3, y: 4 }, { x: 7, y: 1 });
  const normalized = vector.normalized;
  expect(normalized.x).toBeCloseTo(0.8);
  expect(normalized.y).toBeCloseTo(-0.6);
});
