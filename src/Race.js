import Car from './Car.js';

class Race {
    static start(names) {
        const cars = [];
        for (let i = 0; i < names.length; i++) {
            cars.push(new Car(names[i]));
        }
        return new Race(cars);
    }

    constructor(cars) {
        this.cars = cars;
    }
}

export default Race;