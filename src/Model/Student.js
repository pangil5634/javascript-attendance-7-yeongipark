import { DateModel } from './Date.js';

export class Student {
  #name;
  #attendList = [];

  constructor(name, attendList) {
    this.#name = name;
    this.#attendList = attendList;
  }

  getStudentInfo() {
    console.log(this.#name);
    for (const attend of this.#attendList) {
      console.log(attend.getDateInfo());
    }
  }

  get name() {
    return this.#name;
  }

  checkAttendToday() {
    const date = new DateModel();
    date.createDateByNow();

    for (const attend of this.#attendList) {
      if (attend.day === date.day) {
        return false;
      }
    }
  }

  addAttend(date) {
    this.#attendList.push(date);
  }

  updateAttend(day, time) {
    const findAttend = this.#attendList.find(
      (attend) => Number(attend.day) === Number(day),
    );

    const before = findAttend.getDateInfo();

    findAttend.updateTime(time);
    findAttend.saveStatus();
    findAttend.printUpdateResult(before);
  }
}
