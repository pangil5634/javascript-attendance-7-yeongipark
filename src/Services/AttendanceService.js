import { InputView } from '../View/InputView.js';
export class AttendanceService {
  async readName() {
    const originName = await InputView.getName();
  }
}
