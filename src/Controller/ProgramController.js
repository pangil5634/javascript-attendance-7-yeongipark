import { ProgramService } from '../Services/ProgramServices.js';
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
    } while (this.#step !== 'q' && this.#step !== 'Q');
  }
}
