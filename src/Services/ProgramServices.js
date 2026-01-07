import { AttendanceController } from '../Controller/AttendanceController.js';
import { InputView } from '../View/InputView.js';
import { OutputView } from '../View/Outputview.js';

export class ProgramService {
  #attendanceController;

  constructor() {
    this.#attendanceController = new AttendanceController();
  }

  printTodayInfo(today) {
    OutputView.printTodayInfo(today);
  }

  async getStep() {
    let originStep;
    do {
      OutputView.printStepList();
      originStep = await InputView.getStep();
    } while (this.validateStep(originStep) === false);

    return originStep;
  }

  validateStep(step) {
    const STEP_LIST = ['1', '2', '3', '4', 'q', 'Q'];

    if (!STEP_LIST.includes(step)) {
      OutputView.printError('잘못된 기능을 입력했습니다.');
      return false;
    }

    return true;
  }

  async step1() {
    await this.#attendanceController.step1();
  }
  step2() {
    this.#attendanceController.step2();
  }
  step3() {
    this.#attendanceController.step3();
  }
  step4() {
    this.#attendanceController.step4();
  }
}
