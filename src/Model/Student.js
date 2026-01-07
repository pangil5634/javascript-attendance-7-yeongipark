export class Student {
  #name;
  #attendList = [];

  constructor(name, attendList) {
    this.#name = name;
    this.#attendList = attendList;
  }

  getStudentInfo() {
    console.log(this.#name);
    console.log(this.#attendList);
  }
}
