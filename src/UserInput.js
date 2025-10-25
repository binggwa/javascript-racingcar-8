import { MissionUtils } from '@woowacourse/mission-utils';

class UserInput {
  static DELIMITER = ',';
  static MAX_NAME_LENGTH = 5;
  static MIN_LAP_COUNT = 1;

  static async readCarNames() {
    const carNameStr = await MissionUtils.Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
    );

    if (!carNameStr.trim()) {
      throw new Error('[ERROR] 참가할 자동차가 없습니다!');
    }

    const carNames = carNameStr
      .split(UserInput.DELIMITER)
      .map((name) => name.trim());

    if (
      carNames.filter(
        (name) => !name || name.length > UserInput.MAX_NAME_LENGTH
      ).length
    ) {
      throw new Error('[ERROR] 자동차의 이름은 1자 이상 5자 이하여야 합니다!');
    }

    return carNames;
  }

  static async readLapCount() {
    const lapCountStr = await MissionUtils.Console.readLineAsync(
      '시도할 횟수는 몇 회인가요?\n'
    );

    if (!lapCountStr.trim()) {
      throw new Error('[ERROR] 시도할 횟수가 없습니다!');
    }

    const lapCount = Number(lapCountStr.trim());
    if (Number.isNaN(lapCount)) {
      throw new Error('[ERROR] 시도할 횟수가 숫자여야 합니다!');
    }

    if (lapCount < UserInput.MIN_LAP_COUNT || !Number.isInteger(lapCount)) {
      throw new Error('[ERROR] 시도할 횟수는 1 이상의 자연수여야 합니다!');
    }

    return lapCount;
  }
}

export default UserInput;
