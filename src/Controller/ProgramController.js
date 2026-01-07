import { ProgramService } from '../Services/ProgramServices.js';
import { OutputView } from '../View/Outputview.js';
import { DateController } from './DateController.js';

export class ProgramController {
  #today;
  #programService;
  #step;
  constructor() {
    const dateController = new DateController();
    this.#today = dateController.getToday();

    this.#programService = new ProgramService();
  }

  async play() {
    this.#programService.printTodayInfo(this.#today);
    do {
      this.#step = await this.#programService.getStep();
      OutputView.changeLine();
      switch (this.#step) {
        case '1':
          // 1. 출석 확인
          await this.#programService.step1();
          break;
        case '2':
          // 2. 출석 수정
          await this.#programService.step2();
          break;
        case '3':
          // 3. 크루별 출석 기록 확인
          this.#programService.step3();
          break;
        case '4':
          // 4. 제적 위험자 확인
          this.#programService.step4();
          break;

        default:
          break;
      }
    } while (this.#step !== 'q' && this.#step !== 'Q');
  }
}
