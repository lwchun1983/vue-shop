import {config} from '../config/config'
const formatPrice = function (price) {
  // 123.00 => 123  123.10 => 123.1   123.12 => 123.12
  const arr = price.toString().split('.')
  let num = parseInt(arr[1])
  if (isNaN(num) || num === 0) {
    return arr[0]
  }
  return parseInt(arr[0]) + num / 100
}

function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

const validate = function (data, validateObject) {
  for(let key in data) {
    if (Reflect.has(validateObject, key)) {
      const res = validateObject[key](data[key], data.password)
      if (res.error !== 0) {
        return res
      }
    }
  }
  return {error: 0}
}

const getOrderStatus = function (status) {
  const {order: {status: statusOptions}} = config
  return statusOptions[status] || ''
}
export {
  formatPrice,
  dateFormat,
  validate,
  getOrderStatus
}
