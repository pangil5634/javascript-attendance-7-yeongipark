import { Console } from '@woowacourse/mission-utils';

export class OutputView {
  static printTodayInfo(date) {
    Console.print(`오늘은 ${date}입니다. 기능을 선택해주세요.\n`);
  }

  static printStepList() {
    Console.print('1. 출석 확인');
    Console.print('2. 출석 수정');
    Console.print('3. 크루별 출석 기록 확인');
    Console.print('4. 제적 위험자 확인');
    Console.print('Q. 종료');
  }

  static printError(error) {
    Console.print(`[ERROR] ${error}\n`);
  }

  static changeLine() {
    Console.print('');
  }

  static printWarningResult() {
    Console.print('제적 위험자 조회 결과\n');
  }
}
