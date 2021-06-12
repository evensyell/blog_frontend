import { date } from 'quasar'

let dateFormat = (a) => date.formatDate(new Date(a), 'YYYY.MM.DD')
let hmsFormat = (a) => date.formatDate(new Date(a), 'YYYY/MM/DD - HH:mm:ss')
function showtime(date1) {
  let now = new Date()
  let diff = date.getDateDiff(now, date1, 'minutes')
  if (diff == 0) {
    return '刚刚'
  } else if (diff < 60) {
    return diff + '分钟前'
  } else if (diff < 60 * 24) {
    return date.getDateDiff(now, date1, 'hours') + '小时前'
  } else {
    return date.getDateDiff(now, date1, 'days') + '天前'
  }
}
let goneTimeFormat = (a) => showtime(a)
export { dateFormat, hmsFormat, goneTimeFormat }
