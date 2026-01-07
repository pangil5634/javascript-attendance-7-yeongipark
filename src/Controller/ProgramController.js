import { OutputView } from '../View/Outputview.js';
import { DateController } from './DateController.js';

export class ProgramController {
  #today;
  constructor() {
    const dateController = new DateController();
    this.#today = dateController.getToday();
  }
  // 프로그램 시작 함수
  play() {
    OutputView.printTodayInfo(this.#today);
  }
}
