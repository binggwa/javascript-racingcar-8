import { MissionUtils } from '@woowacourse/mission-utils';

class Car {
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
        const value = MissionUtils.Random.pickNumberInRange(0, 9);

        if (value >= 4) {
            this.position += 1;
        }
    }
}

export default Car;