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

  async readName() {
    const originName = await this.readUserName();
    if (originName === false) {
      return;
    }
    if (this.checkName(originName) === false) {
      return;
    }
    if (!this.checkAttend(originName)) {
      return;
    }
  }

  async readUserName() {
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
    if (!user.checkAttendToday()) {
      OutputView.printError('이미 출석이 완료된 상태입니다.');
      return false;
    }
  }
}
