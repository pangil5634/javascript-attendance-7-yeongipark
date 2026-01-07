import { Console } from '@woowacourse/mission-utils';

export class InputView {
  static getStep() {
    return Console.readLineAsync('');
  }

  static getName() {
    return Console.readLineAsync('닉네임을 입력해 주세요.\n');
  }

  static getTime() {
    return Console.readLineAsync('등교 시간을 입력해 주세요.\n');
  }
}
