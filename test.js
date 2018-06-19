const moment = require('moment');

function fixne (p) {
  const tmm = moment()
.startOf('day')
.seconds(1)
.format('H:mm:ss')

return tmm
}
let fgf = fixne(1);
console.log(`The formatted is: ${fgf}`)
// function format(prop) {
//   let date = new Date(1970, 0, 1);
//   date.setSeconds(prop);
// return  date.toTimeString().replace(/.* (\d{2}:\d{2}:\d{2}).*/, "$1")
// }

// console.log(format(277.786))