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
    MissionUtils.Console.print('\n실행 결과');
    for (let lap = 0; lap < this.lapCount; lap++) {
      this.processLap();
      this.printCurrentPositions();
    }
  }

  getFarthestPosition() {
    return this.cars.reduce((max, car) => Math.max(max, car.getPosition()), 0);
  }

  getWinners() {
    const farthestPosition = this.getFarthestPosition();
    const winners = this.cars.filter(
      (car) => car.getPosition() === farthestPosition
    );

    return winners;
  }

  printResult() {
    const winnerNames = this.getWinners().map((car) => car.getName());
    MissionUtils.Console.print(`최종 우승자 : ${winnerNames.join(', ')}`);
  }
}

export default Race;
