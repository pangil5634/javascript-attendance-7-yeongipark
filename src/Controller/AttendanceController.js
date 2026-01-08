import { AttendanceService } from '../Services/AttendanceService.js';
import { DateController } from './DateController.js';

export class AttendanceController {
  #attendanceService;
  #dateController;

  constructor() {
    this.#attendanceService = new AttendanceService();
    this.#dateController = new DateController();
    this.#attendanceService.loadData();
  }

  async step1() {
    this.#dateController.checkToday();
    const result = await this.#attendanceService.readNameAndTime();
    if (result) {
      const name = result[0];
      const time = result[1];
      this.#attendanceService.saveAttend(name, time);
    }
  }
  async step2() {
    const result = await this.#attendanceService.readNameAndDateAndTime();
    if (result) {
      const name = result[0];
      const date = result[1];
      const time = result[2];
      this.#attendanceService.updateAttend(name, date, time);
    }
  }
  async step3() {
    await this.#attendanceService.printAllAttendByPerson();
  }
  step4() {
    this.#attendanceService.printWarningResult();
  }
}
