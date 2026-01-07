export class DateService {
  getToday() {
    const today = new Date();

    // 연
    const year = today.getFullYear();

    // 월
    const month = ('0' + (today.getMonth() + 1)).slice(-2);

    // 일
    const day = ('0' + today.getDate()).slice(-2);

    // 요일
    const dayList = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = new Date(year + '-' + month + '-' + day).getDay();
    const label = dayList[dayOfWeek];

    // 문자
    const dateString = month + '월 ' + day + '일 ' + label + '요일';

    return dateString;
  }
}
