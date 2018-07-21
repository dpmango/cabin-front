// transform the hour:minute to comparable number
const convertTimeStr = (v, utcToLocal, toUTC) => {
  const times = v.split(':');
  let result = Number(times[0]) * 60 + Number(times[1]);
  if (utcToLocal === true){
    result = result - this.clientTimeZoneOffset
  }
  if (toUTC === true){
    result = result + this.clientTimeZoneOffset
  }
  return result
}

export default convertTimeStr
