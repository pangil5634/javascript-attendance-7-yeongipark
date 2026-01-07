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
    await this.#attendanceService.readNameAndTime();
  }
  step2() {
    console.log('step2');
  }
  step3() {
    console.log('step3');
  }
  step4() {
    console.log('step4');
  }
}
