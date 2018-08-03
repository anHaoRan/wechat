const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const numberToString = n => {
  return n > 9999 ? n / 10000 + "万" : n;
}

const dateTimeStamp = (dateTimeStamp) => {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    //若日期不符则弹出窗口告之
    //alert("结束日期不能小于开始日期！");
    return '结束日期不能小于开始日期！';
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result = '';
  if (monthC >= 1) {
    result = "发表于" + parseInt(monthC) + "个月前";
  } else if (weekC >= 1) {
    result = "发表于" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "发表于" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "发表于" + parseInt(hourC) + "个小时前";
  } else if (minC >= 1) {
    result = "发表于" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚发表";
  return result;
}
module.exports = {
  formatTime: formatTime,
  dateTimeStamp: dateTimeStamp,
  numToStr: numberToString
}