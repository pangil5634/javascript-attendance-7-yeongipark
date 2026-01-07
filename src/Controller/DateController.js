import { DateService } from '../Services/DateService.js';

export class DateController {
  #dateService;

  constructor() {
    this.#dateService = new DateService();
  }

  getToday() {
    return this.#dateService.getToday();
  }

  checkToday() {
    this.#dateService.checkToday();
  }
}
