export class DateModel {
  #year;
  #month;
  #day;
  #time;
  #label;

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
