// app.test.ts
import { App } from "./app";
import { Bike } from "./bike";
import { Location } from "./location";

describe('App', () => {
  it('should throw an exception when trying to move an unregistered bike', () => {
    const app = new App();
    const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);

    // Tente mover a bicicleta antes de registrá-la no aplicativo
    expect(() => app.moveBikeTo(bike.id, new Location(40.753056, -73.983056))).toThrow('Bike not found.');
  });
});
