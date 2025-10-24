import { MissionUtils } from '@woowacourse/mission-utils';
import Race from './Race.js';

class App {
  async run() {
    try {
      const namesInput = await MissionUtils.Console.readLineAsync(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
      );

      const trimmedNames = namesInput.trim();
      if (trimmedNames.length === 0) {
        throw new Error('[ERROR] 참가할 자동차가 없습니다!');
      }

      const nameOfCars = trimmedNames.split(',');
      const names = [];
      for (let i = 0; i < nameOfCars.length; i++) {
        const name = nameOfCars[i].trim();

        if (name.length === 0) {
          throw new Error('[ERROR] 이름이 없는 자동차가 있습니다!');
        }

        if (name.length > 5) {
          throw new Error('[ERROR] 자동차의 이름은 5자 이하여야 합니다!');
        }

        names.push(name);
      }

      const cycleCount = await MissionUtils.Console.readLineAsync(
        '시도할 횟수는 몇 회인가요?\n',
      );

      const trimmedCount = cycleCount.trim();
      if (trimmedCount.length === 0) {
        throw new Error('[ERROR] 시도할 횟수를 입력해주세요!');
      }

      MissionUtils.Console.print('\n실행 결과');

      const race = Race.start(names);

      // 중간 결과 출력
      race.printEachCycle(cycleCount);

      // 최종 우승자 출력
      race.printWinners();
    } catch (error) {
      MissionUtils.Console.print(error.message);
      throw error;
    }
  }
}

export default App;
