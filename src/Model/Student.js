import { Console } from '@woowacourse/mission-utils';
import { DateModel } from './Date.js';
import { OutputView } from '../View/Outputview.js';

export class Student {
  #name;
  #attendList = [];
  #attendance;
  #late;
  #absenc;

  constructor(name, attendList) {
    this.#name = name;
    this.#attendList = attendList;
    this.#attendance = 0;
    this.#late = 0;
    this.#absenc = 0;
    this.countAttend();
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

  printAllAttend() {
    OutputView.changeLine();
    Console.print(`이번 달 ${this.#name}의 출석 기록입니다.`);
    OutputView.changeLine();

    const reverse = this.#attendList;
    for (const attend of reverse.reverse()) {
      Console.print(attend.getDateInfo());
    }
    OutputView.changeLine();

    this.printSummary();
    OutputView.changeLine();

    const personStatus = this.printPersonStatus();

    const WARNING = ['경고', '면담', '제적'];
    if (WARNING.includes(personStatus)) {
      Console.print(`**${personStatus}**입니다.`);
      OutputView.changeLine();
    }
  }

  countAttend() {
    for (const attend of this.#attendList) {
      switch (attend.status) {
        case '출석':
          this.#attendance++;
          break;
        case '지각':
          this.#late++;
          break;
        case '결석':
          this.#absenc++;
          break;

        default:
          break;
      }
    }
  }

  printSummary() {
    Console.print(`출석: ${this.#attendance}회`);
    Console.print(`지각: ${this.#late}회`);
    Console.print(`결석: ${this.#absenc}회`);
  }

  printPersonStatus() {
    const lateToAbsence = this.#late / 3;
    const totalAbsence = this.#absenc + lateToAbsence;

    if (totalAbsence >= 5) {
      return '제적';
    }
    if (totalAbsence >= 3) {
      return '면담';
    }
    if (totalAbsence >= 2) {
      return '경고';
    }
  }

  getWarningDataSet() {
    return [this.#name, this.#absenc, this.#late, this.printPersonStatus()];
  }
}
