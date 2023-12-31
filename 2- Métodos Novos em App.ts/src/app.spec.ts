import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

   it('should throw bike not found error when trying to move an unregistered bike', () => {
    const app = new App()
    const newYork = new Location(40.753056, -73.983056)
    expect(() => {
      app.moveBikeTo('fake-id', newYork)
    }).toThrow(BikeNotFoundError)
  })

  it('should correctly handle bike rent', async () => {
    const app = new App()
    const user = new User('Jose', 'jose@mail.com', '1234')
    await app.registerUser(user)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
      1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    app.rentBike(bike.id, user.email)
    expect(app.rents.length).toEqual(1)
    expect(app.rents[0].bike.id).toEqual(bike.id)
    expect(app.rents[0].user.id).toEqual(user.id)
  })

  it('should throw unavailable bike error when trying to rent an unavailable bike', async () => {
    const app = new App()
    const user = new User('Jose', 'jose@mail.com', '1234')
    await app.registerUser(user)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
      1234, 1234, 100.0, 'My bike', 5, [])
    app.registerBike(bike)
    app.rentBike(bike.id, user.email)
    expect(() => {
      app.rentBike(bike.id, user.email)
    }).toThrow(UnavailableBikeError)
  })

  it('should throw user not found error when user is not found', () => {
    const app = new App()
    expect(() => {
      app.findUser('fake@mail.com')
    }).toThrow(UserNotFoundError)
  })

  it ('should throw bike not found error when bike is not found', () => {
    const app = new App()
    expect (() =>{
      app.findBike('2171')
    }) .toThrom(BikeNotFoundError)
  })

  
  it('should register a bike', () => {
    const app = new App();
    const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
    const bikeId = app.registerBike(bike);
    
    const registeredBike = app.findBike(bikeId);

    expect(registeredBike).toEqual(bike);
  });

  it('should return a bike', () => {
    const app = new App();
    const bike = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
    const bikeId = app.registerBike(bike);

    const returnedAmount = app.returnBike(bikeId, 'user@mail.com');

    expect(returnedAmount).toEqual(0);
  });

  it('should remove a user', () => {
    const app = new App();
    const user = new User('John', 'john@mail.com', 'password');
    app.registerUser(user);

    app.removeUser('john@mail.com');

    expect(() => {
      app.findUser('john@mail.com');
    }).toThrow(UserNotFoundError); 
  })
    
})
