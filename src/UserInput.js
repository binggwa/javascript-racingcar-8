import { MissionUtils } from '@woowacourse/mission-utils';

class UserInput {
  static DELIMITER = ',';
  static MAX_NAME_LENGTH = 5;
  static MIN_LAP_COUNT = 1;

  /**
   * 사용자에게 자동차 이름 목록을 입력받아 유효성 검사를 통과한 이름 배열을 반환한다.
   * @returns { string[] } 형식 체크를 완료한 자동차 이름 배열
   * @throws { Error } 형식에 맞지 않는 이름을 받았을 시 [ERROR]로 시작하는 메시지와 함께 오류를 던진다
   */
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

  /**
   * 사용자에게 시도할 횟수를 입력받아 유효성 검사를 통과한 자연수를 반환한다.
   * @returns { number } 레이스를 시도할 횟수만큼의 자연수
   * @throws { Error } 형식에 맞지 않는 횟수를 받았을 시 [ERROR]로 시작하는 메시지와 함께 오류를 던진다
   */
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
