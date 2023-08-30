import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    registerUser(user: User): void {
        if (this.users.some(existingUser => existingUser.email === user.email)) {
            throw new Error('Duplicate user.');
        }
        this.users.push(user);
    }

    registerBike(bike: Bike): void {
        this.bikes.push(bike);
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }

    rentBike(user: User, bike: Bike, startDate: Date, endDate: Date): Rent {
        const existingUser = this.users.find(u => u.email === user.email);
        if (!existingUser) {
            throw new Error('User not found.');
        }

        if (!this.bikes.includes(bike)) {
            throw new Error('Bike not found.');
        }

        const rent = Rent.create(this.rents, bike, existingUser, startDate, endDate);
        this.rents.push(rent);
        return rent;
    }

    returnBike(rent: Rent): void {
        const rentIndex = this.rents.findIndex(existingRent => existingRent === rent);
        if (rentIndex !== -1) {
            this.rents.splice(rentIndex, 1);
        }
        rent.dateReturned = new Date();
    }
}
