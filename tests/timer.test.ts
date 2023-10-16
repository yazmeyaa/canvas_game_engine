import { Timer } from "../src/engine/timer";


test("Timer - initialization", () => {
    const timer = new Timer();
    expect(timer.elapsedTime).toBe(0);
    expect(timer.dt).toBe(0);
  });
  
  test("Timer - update", () => {
    const timer = new Timer();
    timer.update();
    expect(timer.elapsedTime).toBeCloseTo(timer.dt, 5);
  });
  
  test("Timer - multiple updates", () => {
    const timer = new Timer();
    timer.update();
    const initialElapsedTime = timer.elapsedTime;
    timer.update();
    expect(timer.elapsedTime).toBeCloseTo(initialElapsedTime + timer.dt, 5);
  });
  
  test("Timer - reset", () => {
    const timer = new Timer();
    timer.update();
    timer.update();
    timer.reset();
    expect(timer.elapsedTime).toBe(0);
    expect(timer.dt).toBe(0);
  });
