import { Console } from '@woowacourse/mission-utils';

export class OutputView {
  static printTodayInfo(date) {
    Console.print(`오늘은 ${date}입니다. 기능을 선택해주세요.\n\n`);
  }
}
