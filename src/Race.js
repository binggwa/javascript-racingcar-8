import { MissionUtils } from '@woowacourse/mission-utils';
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

    printEachCycle(times) {
        for (let t = 0; t < times; t++) {
            this.goOneCycle();

            const nowPosition = this.getNowPosition();
            for (let i = 0; i < nowPosition.length; i++) {
                const { name, position } = nowPosition[i];
                MissionUtils.Console.print('${name} : ${'-'.repeat(position)}');
            }

            MissionUtils.Console.print('\n');
        }
    }

    printWinners() {
        let fastest = 0;
        for (let i = 0; i < this.cars.length; i++) {
            const position = this.cars[i].getPosition;
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
        
        MissionUtils.Console.print('최종 우승자 : ${winners.join(', ')}');
    }
}

export default Race;