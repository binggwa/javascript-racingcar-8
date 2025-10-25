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
      {
        name: 'n라운드 1명 우승',
        inputs: ['a,b', '3'],
        randoms: [4, 9, 9, 3, 3, 0], // a 2칸 전진, b 1칸 전진
        expectLogs: ['a : --', 'b : -', '최종 우승자 : a'],
      },
      {
        name: 'n라운드 공동 우승',
        inputs: ['a,b', '3'],
        randoms: [4, 4, 5, 3, 3, 5], // a 2칸 전진, b 2칸 전진
        expectLogs: ['a : --', 'b : --', '최종 우승자 : a, b'],
      },
      {
        name: '인원 증가, 1라운드 공동 우승',
        inputs: ['a,b,c', '1'],
        randoms: [4, 4, 3], // a 1칸 전진, b 1칸 전진, c 0칸 전진
        expectLogs: ['a : -', 'b : -', 'c : ', '최종 우승자 : a, b'],
      },
      {
        name: '한 번도 전진하지 못한 경우',
        inputs: ['a,b,c', '3'],
        randoms: [3, 3, 3, 0, 0, 0, 1, 2, 3], // 모두 그대로
        expectLogs: ['a : ', 'b : ', 'c : ', '최종 우승자 : a, b, c'],
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
      { 
        name: '빈 자동차 이름이 있을 경우', 
        inputs: ['a,b,'] 
      },
      { 
        name: '빈 자동차 이름만 있을 경우', 
        inputs: ['    '] 
      },
      { 
        name: '시도 횟수가 비어있을 경우', 
        inputs: ['a,b', '     '] 
      },
      { 
        name: '시도 횟수가 숫자가 아닐 경우', 
        inputs: ['a,b', 'abcdefg'] 
      },
      { 
        name: '시도 횟수가 정수가 아닐 경우', 
        inputs: ['a,b', '3.333'] 
      },
      { 
        name: '시도 횟수가 0일 경우', 
        inputs: ['a,b', '0'] 
      },
      { 
        name: '시도 횟수가 음수일 경우', 
        inputs: ['a,b', '-1'] 
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
