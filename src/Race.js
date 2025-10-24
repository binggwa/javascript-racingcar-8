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

    goOneCycle() {
        for (let i = 0; i < this.cars.length; i++) {
            this.cars[i].tryMove();
        }
    }
    
    getNowPosition() {
        const nowPosition = [];
        for (let i = 0; i < this.cars.length; i++) {
            nowPosition.push({
                name: this.cars[i].getName(),
                position: this.cars[i].getPosition(),
            });
        }
        return nowPosition;
    }
}

export default Race;