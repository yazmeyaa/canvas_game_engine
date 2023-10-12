import { Timer } from "../src/engine/timer";


describe("Test timers", () => {
    let timer = new Timer();

    afterEach(() => {
        //* Reset
        timer = new Timer();
    })

    it("first dt must be 0", () => {
        expect(timer.dt).toBe(0);
    })

    it("Step test. Must be 0.016 for 60 fps.", () => {
        // 60 fps test
        const frameInterval60 = 1000 / 60
        setTimeout(() => {
            timer.update();
            expect(timer.dt).toBe(0.016)  
        }, frameInterval60)
    })

});
