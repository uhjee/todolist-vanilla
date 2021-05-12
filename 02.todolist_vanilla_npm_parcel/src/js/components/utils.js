// ! Utilsity Functions

export default {
  /**
   * 요일(num)에 따른 약어 요일(String)을 반환한다.
   * @author  uhjee
   * @param   {[type]}  day  숫자형 day(Date.getDay() 반환값)
   *
   * @return  {[type]}       약어 요일(String) e.g. Sun
   */
  getDayString: (day) => {
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wen';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        throw new Error('Not exist the day!');
    }
  },
};
