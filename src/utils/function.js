const formatPrice = function (price) {
  // 123.00 => 123  123.10 => 123.1   123.12 => 123.12
  const arr = price.toString().split('.')
  let num = parseInt(arr[1])
  if (isNaN(num) || num === 0) {
    return arr[0]
  }
  return parseInt(arr[0]) + num / 100
}

export {
  formatPrice
}
