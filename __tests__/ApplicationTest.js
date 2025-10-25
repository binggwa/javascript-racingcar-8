import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  describe('정상 동작 테스트', () => {
    test.each([
      {
        name: '1라운드 1명 우승',
        inputs: ['a,b', '1'],
        randoms: [4, 3], // a만 전진
        expectLogs: ['a : -', 'b : ', '최종 우승자 : a'],
      },
      {
        name: '1라운드 공동 우승',
        inputs: ['a,b', '1'],
        randoms: [4, 4], // 둘 다 전진
        expectLogs: ['a : -', 'b : -', '최종 우승자 : a, b'],
      },
    ])('%s', async ({ inputs, randoms, expectLogs }) => {
      mockQuestions([...inputs]);
      mockRandoms([...randoms]);
      const logSpy = getLogSpy();

      // when
      const app = new App();
      await app.run();

      // then
      expectLogs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
  });

  describe('예외 테스트', () => {
    test.each([
      { 
        name: '자동차 이름이 5자를 초과할 경우', 
        inputs: ['pobi,javaji'] 
      },
    ])('%s', async ({ inputs }) => {
      mockQuestions([...inputs]);

      // when
      const app = new App();

      // then
      await expect(app.run()).rejects.toThrow(/^\[ERROR\]/);
    });
  });
});
