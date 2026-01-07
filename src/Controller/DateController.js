import { DateService } from '../Services/DateService.js';

export class DateController {
  #dataService;

  constructor() {
    this.#dataService = new DateService();
  }

  getToday() {
    return this.#dataService.getToday();
  }

  checkToday() {
    this.#dataService.checkToday();
  }
}
