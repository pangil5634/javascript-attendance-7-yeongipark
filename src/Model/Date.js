import { Console } from '@woowacourse/mission-utils';
import { OutputView } from '../View/Outputview.js';

export class DateModel {
  #year;
  #month;
  #day;
  #time;
  #label;
  #status;

  getDateInfo() {
    return (
      this.#month +
      '월 ' +
      this.#day +
      '일 ' +
      this.#label +
      '요일 ' +
      this.#time +
      ' (' +
      this.#status +
      ')'
    );
  }

  createNewAttend(time) {
    this.createDateByNow();
    this.#time = time;

    this.saveStatus();
  }

  createDateByString(string) {
    const [date, time] = string.split(' ');
    const dateArr = date.split('-');

    this.#year = dateArr[0];
    this.#month = dateArr[1];
    this.#day = dateArr[2];

    const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = new Date(date).getDay();
    this.#label = DAY_LIST[dayOfWeek];

    this.#time = time;

    this.saveStatus();
  }

  createDateByNow() {
    const today = new Date();

    // 연
    this.#year = today.getFullYear();

    // 월
    this.#month = ('0' + (today.getMonth() + 1)).slice(-2);

    // 일
    this.#day = ('0' + today.getDate()).slice(-2);

    // 요일
    const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = new Date(
      this.#year + '-' + this.#month + '-' + this.#day,
    ).getDay();
    this.#label = DAY_LIST[dayOfWeek];

    this.saveStatus();
  }

  getDateKorean() {
    return this.#month + '월 ' + this.#day + '일 ' + this.#label + '요일';
  }

  get label() {
    return this.#label;
  }

  get day() {
    return this.#day;
  }

  get status() {
    return this.#status;
  }

  checkAttendDay() {
    const ATTEND_DAYS = ['월', '화', '수', '목', '금'];
    if (ATTEND_DAYS.includes(this.#label)) {
      return true;
    }
  }
  checkSpecialDay() {
    const SPECIAL_DAYS = ['25'];
    if (SPECIAL_DAYS.includes(this.#day)) {
      return true;
    }
  }

  updateTime(time) {
    this.#time = time;
  }

  saveStatus() {
    if (this.#time) {
      const [hour, min] = this.#time.split(':').map(Number);

      if (this.#label === '월') {
        if (hour > 13) {
          this.#status = '결석';
          return;
        }
        if (hour === 13 && min > 30) {
          this.#status = '결석';
          return;
        }
        if (hour === 13 && min > 5) {
          this.#status = '지각';
          return;
        }
        this.#status = '출석';
        return;
      }

      if (hour > 10) {
        this.#status = '결석';
        return;
      }
      if (hour === 10 && min > 30) {
        this.#status = '결석';
        return;
      }
      if (hour === 10 && min > 5) {
        this.#status = '지각';
        return;
      }

      this.#status = '출석';
      return;
    }
  }

  printUpdateResult(before) {
    OutputView.changeLine();
    Console.print(`${before} -> ${this.#time} (${this.#status}) 수정 완료!`);
  }
}
