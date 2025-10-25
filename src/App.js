import { MissionUtils } from '@woowacourse/mission-utils';
import Race from './Race.js';
import UserInput from './UserInput.js';

class App {
  async run() {
    try {
      const carNames = await UserInput.readCarNames();
      const lapCount = await UserInput.readLapCount();

      const race = new Race(carNames, lapCount);

      // 중간 결과 출력
      race.startRace();

      // 최종 우승자 출력
      race.printResult();
    } catch (error) {
      MissionUtils.Console.print(error.message);
      throw error;
    }
  }
}

export default App;
