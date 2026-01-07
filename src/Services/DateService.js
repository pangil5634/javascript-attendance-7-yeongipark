import { DateModel } from '../Model/Date.js';
import { OutputView } from '../View/Outputview.js';

export class DateService {
  #date;

  constructor() {
    this.#date = new DateModel();
  }

  getToday() {
    return this.#date.getDateKorean();
  }

  checkToday() {
    if (!this.#date.checkAttendDay() || this.#date.checkSpecialDay()) {
      OutputView.printError('오늘은 출석 가능한 날이 아닙니다.');
    }
  }
}
