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

listUsers(): string {
        if (this.users.length === 0) {
            return "Não há usuários cadastrados.";
        }
        let userList = "Lista de Usuários:\n";
        this.users.forEach((user, index) => {
            userList += `${index + 1}. Nome: ${user.name}, Email: ${user.email}\n`;
        });
        return userList;
    }

    listRents(): string {
        if (this.rents.length === 0) {
            return "Não há reservas/aluguéis cadastrados.";
        }
        let rentList = "Lista de Reservas/Aluguéis:\n";
        this.rents.forEach((rent, index) => {
            rentList += `${index + 1}. Usuário: ${rent.user.name}, Bicicleta: ${rent.bike.name}, Data Início: ${rent.dateFrom.toDateString()}, Data Fim: ${rent.dateTo.toDateString()}\n`;
        });
        return rentList;
    }

    listBikes(): string {
        if (this.bikes.length === 0) {
            return "Não há bicicletas cadastradas.";
        }
        let bikeList = "Lista de Bicicletas:\n";
        this.bikes.forEach((bike, index) => {
            bikeList += `${index + 1}. Nome: ${bike.name}, Tipo: ${bike.type}, Descrição: ${bike.description}\n`;
        });
        return bikeList;
    }
}
