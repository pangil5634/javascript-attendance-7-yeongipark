import { Console } from '@woowacourse/mission-utils';

export class InputView {
  static getStep() {
    return Console.readLineAsync('');
  }
}
