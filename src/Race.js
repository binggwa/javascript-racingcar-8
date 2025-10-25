import { MissionUtils } from '@woowacourse/mission-utils';
import Car from './Car.js';

class Race {
  /**
   * @param { string[] } carNames 자동차 이름 배열
   * @param { number } lapCount 시도할 횟수
   */
  constructor(carNames, lapCount) {
    this.cars = carNames.map((name) => new Car(name));
    this.lapCount = lapCount;
  }

  /**
   * 레이스 Lap을 한 바퀴 진행한다.
   * 모든 자동차에 대해 tryMove() 실행
   * @returns { void }
   */
  processLap() {
    this.cars.forEach((car) => car.tryMove());
  }

  /**
   * 모든 자동차에 대해 이름과 현재 위치를 한 줄씩 출력한다.
   * Lap 별 구분을 위해 빈 줄을 한 줄 출력한다.
   * @returns { void }
   */
  printCurrentPositions() {
    this.cars.forEach((car) => {
      const name = car.getName();
      const position = car.getPosition();
      MissionUtils.Console.print(`${name} : ${'-'.repeat(position)}`);
    });
    MissionUtils.Console.print('');
  }

  /**
   * 호출 시 '\n실행 결과'를 한 줄 출력한다.
   * 레이스를 시작하고 lapCount 수치만큼 processLap()을 실행한다.
   * printCurrentPositions()를 통해 Lap별 결과를 출력한다.
   * @returns { void }
   */
  startRace() {
    MissionUtils.Console.print('\n실행 결과');
    for (let lap = 0; lap < this.lapCount; lap++) {
      this.processLap();
      this.printCurrentPositions();
    }
  }

  /**
   * 가장 멀리 간 자동차의 위치를 반환한다.
   * @returns { number } 가장 먼 거리
   */
  getFarthestPosition() {
    return this.cars.reduce((max, car) => Math.max(max, car.getPosition()), 0);
  }

  /**
   * getFarthestPosition() 을 통해 얻은 가장 먼 거리에 도달한 자동차들을 반환한다.
   * @returns { Car[] } 우승 자동차 목록
   */
  getWinners() {
    const farthestPosition = this.getFarthestPosition();
    const winners = this.cars.filter(
      (car) => car.getPosition() === farthestPosition
    );

    return winners;
  }

  /**
   * 최종 우승자의 이름을 형식에 맞춰 출력한다.
   * @returns { void }
   */
  printResult() {
    const winnerNames = this.getWinners().map((car) => car.getName());
    MissionUtils.Console.print(`최종 우승자 : ${winnerNames.join(', ')}`);
  }
}

export default Race;
