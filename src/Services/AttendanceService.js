import fs from 'fs';
import { Student } from '../Model/Student.js';

import { InputView } from '../View/InputView.js';
export class AttendanceService {
  #studentList = [];
  async readName() {
    const originName = await InputView.getName();
  }

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

      const user = resultArr.find((attend) => attend.name === name);

      if (!user) {
        const attendArr = [];
        attendArr.push(attend);
        const newUser = { name: name, attend: [attend] };
        resultArr.push(newUser);
        continue;
      }

      user.attend = user.attend.concat(attend);
    }

    // 학생 정보를 실제 정보로 저장하기
    for (const user of resultArr) {
      const student = new Student(user.name, user.attend);
      this.#studentList.push(student);
    }
  }
}
