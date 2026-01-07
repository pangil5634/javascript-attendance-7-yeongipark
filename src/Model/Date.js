export class DateModel {
  #year;
  #month;
  #day;
  #label;

  constructor() {
    this.createDate();
  }

  createDate() {
    const today = new Date();

    // 연
    this.#year = today.getFullYear();

    // 월
    this.#month = ('0' + (today.getMonth() + 1)).slice(-2);

    // 일
    this.#day = ('0' + today.getDate()).slice(-2);

    // 요일
    const dayList = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = new Date(
      this.#year + '-' + this.#month + '-' + this.#day,
    ).getDay();
    this.#label = dayList[dayOfWeek];
  }

  getDateKorean() {
    return this.#month + '월 ' + this.#day + '일 ' + this.#label + '요일';
  }

  get label() {
    return this.#label;
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
}
