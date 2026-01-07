import { ProgramController } from './Controller/ProgramController.js';

class App {
  async run() {
    const programController = new ProgramController();

    // 프로그램 시작
    programController.play();
  }
}

export default App;
