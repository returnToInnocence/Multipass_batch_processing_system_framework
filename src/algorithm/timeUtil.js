// 将时间中的各个部分拆分出来
const splitTime = time => {
  return time.split(':').map(Number);
};

// 根据时间变化对时间进行进位操作
export const addMinute = (time, minute) => {
  let hours = splitTime(time)[0];
  let minutes = splitTime(time)[1];

  minutes += Number(minute);

  // 对于超出分钟计数60的要进位
  if (minutes >= 60) {
    minutes = 0;
    hours += 1;
    // 同时也要考虑归零情况
    if (hours >= 24) hours = 0;
  }

  // 将数字格式化为字符串，对于数值为个位数的来说
  if (minutes < 10) minutes = '0' + String(minutes);
  if (hours < 10) hours = '0' + String(hours);

  return [hours, minutes].join(':');
};

export const subtractionTime = (time1, time2) => {
  let splitedTime1 = splitTime(time1);
  let hour1 = splitedTime1[0];
  let minute1 = splitedTime1[1];
  minute1 = parseInt(hour1) * 60 + parseInt(minute1);

  let splitedTime2 = splitTime(time2);
  let hour2 = splitedTime2[0];
  let minute2 = splitedTime2[1];
  minute2 = parseInt(hour2) * 60 + parseInt(minute2);

  return minute1 - minute2;
}

// 比较两个时间的大小，用在sort的回调中的规则定义
export const isAfter = (time1, time2) => {
  let splitedTime1 = splitTime(time1);
  let hour1 = splitedTime1[0];
  let minute1 = splitedTime1[1];

  let splitedTime2 = splitTime(time2);
  let hour2 = splitedTime2[0];
  let minute2 = splitedTime2[1];

  // 先比较小时，小时大一定大
  if (hour1 > hour2) {
    return 1;
  } else if (hour1 === hour2) {
    // 小时比较后比较分钟
    if (minute1 > minute2) {
      return 1;
    } else if (minute1 === minute2) {
      return 0;
    }
    return -1;
  }
  // 这就是小时小于的情况
  return -1;
};
