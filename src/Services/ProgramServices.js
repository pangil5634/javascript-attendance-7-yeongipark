import { InputView } from '../View/InputView.js';
import { OutputView } from '../View/Outputview.js';

export class ProgramService {
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
    const STEP_LIST = ['1', '2', '3', '4', 'q'];

    if (!STEP_LIST.includes(step)) {
      OutputView.printError('잘못된 기능을 입력했습니다.');
      return false;
    }

    return true;
  }
}
