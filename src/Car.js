import { MissionUtils } from "@woowacourse/mission-utils";

class Car {
  static MIN_VALUE_TO_MOVE = 4;
  static MOVE_DISTANCE = 1;
  static RANDOM_MIN = 0;
  static RANDOM_MAX = 9;

  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  getName() {
    return this.name;
  }

  getPosition() {
    return this.position;
  }

  tryMove() {
    const value = MissionUtils.Random.pickNumberInRange(
      Car.RANDOM_MIN,
      Car.RANDOM_MAX
    );

    if (value >= Car.MIN_VALUE_TO_MOVE) {
      this.position += Car.MOVE_DISTANCE;
    }
  }
}

export default Car;
