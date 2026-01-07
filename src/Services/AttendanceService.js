import fs from 'fs';
import { Student } from '../Model/Student.js';

import { InputView } from '../View/InputView.js';
import { OutputView } from '../View/Outputview.js';
import { DateModel } from '../Model/Date.js';
export class AttendanceService {
  #studentList = [];

  loadData() {
    const file = fs.readFileSync('./public/attendances.csv', 'utf-8');

    const lines = file
      .trim()
      .split('\n')
      .map((line) => line.trim());

    const [, ...data] = lines;
    const allRecord = data.map((data) => data.split(','));
    const orderAllRecord = allRecord.sort((a, b) =>
      a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1,
    );

    const resultArr = [];

    // 학생 정보를 객체로 만들기
    for (const data of orderAllRecord) {
      const name = data[0];
      const attend = data[1];
      const date = new DateModel();
      date.createDateByString(attend);

      const user = resultArr.find((attend) => attend.name === name);
      if (!user) {
        const attendArr = [];
        attendArr.push(date);

        const newUser = { name: name, attend: [date] };
        resultArr.push(newUser);
        continue;
      }

      user.attend = user.attend.concat(date);
    }

    // 학생 정보를 실제 정보로 저장하기
    for (const user of resultArr) {
      const student = new Student(user.name, user.attend);
      this.#studentList.push(student);
    }
  }

  async readNameAndTime() {
    const originName = await this.readName();
    if (originName === false) {
      return;
    }

    if (this.checkName(originName) === false) {
      return;
    }

    if (this.checkAttend(originName) === false) {
      return;
    }

    const originTime = await this.readTime();
    if (originTime === false) {
      return;
    }

    if (this.checkTime(originTime) === false) {
      return;
    }

    return [originName, originTime];
  }

  async readName() {
    const originName = await InputView.getName();
    if (this.validateName(originName) === false) {
      return false;
    }
    return originName;
  }

  validateName(name) {
    if (name.length < 1) {
      OutputView.printError('이름을 입력해주세요.');
      return false;
    }
  }

  checkName(originName) {
    const user = this.#studentList.find((user) => user.name === originName);
    if (!user) {
      OutputView.printError('등록되지 않은 사용자입니다.');
      return false;
    }
  }
  checkAttend(originName) {
    const user = this.#studentList.find((user) => user.name === originName);
    if (user.checkAttendToday() === false) {
      OutputView.printError('이미 출석이 완료된 상태입니다.');
      return false;
    }
  }

  async readTime() {
    const originTime = await InputView.getTime();
    if (this.validateTime(originTime) === false) {
      return false;
    }
    return originTime;
  }

  validateTime(time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!time) {
      OutputView.printError('시간을 입력해주세요.');
      return false;
    }
    if (!timeRegex.test(time)) {
      OutputView.printError('형식에 맞지 않습니다. (HH:RR)');
      return false;
    }
  }

  checkTime(time) {
    const [hour, min] = time.split(':').map(Number);

    if (hour < 8) {
      OutputView.printError('운영 시간이 아닙니다. (HH:RR)');
      return false;
    }

    if (hour >= 23) {
      OutputView.printError('운영 시간이 아닙니다. (HH:RR)');
      return false;
    }
  }

  saveAttend(name, time) {
    const user = this.#studentList.find((user) => user.name === name);
    const date = new DateModel();
    date.createNewAttend(time);
    user.addAttend(date);

    OutputView.changeLine();
  }
}
