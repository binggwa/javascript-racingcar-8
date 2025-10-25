import { MissionUtils } from '@woowacourse/mission-utils';
import Car from './Car.js';

class Race {
    constructor(carNames, lapCount) {
        this.cars = carNames.map((name) => new Car(name));
        this.lapCount = lapCount;
    }

    processLap() {
        this.cars.forEach((car) => car.tryMove());
    }
    
    printCurrentPositions() {
        this.cars.forEach((car) => {
            const name = car.getName();
            const position = car.getPosition();
            MissionUtils.Console.print(`${name} : ${'-'.repeat(position)}`);
        });
        MissionUtils.Console.print('');
    }

    startRace() {
        for (let lap = 0; lap < this.lapCount; lap++) {
            this.processLap();
            this.printCurrentPositions();
        }
    }

    printWinners() {
        let fastest = 0;
        for (let i = 0; i < this.cars.length; i++) {
            const position = this.cars[i].getPosition();
            if (position > fastest) {
                fastest = position;
            }
        }

        const winners = [];
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i].getPosition() === fastest) {
                winners.push(this.cars[i].getName());
            }
        }
        
        MissionUtils.Console.print(`최종 우승자 : ${winners.join(', ')}`);
    }
}

export default Race;