import { formatPrice } from './function'
const filters = {
  filters: {
    formatPrice (price) {
      return formatPrice(price)
    }
  }
}

export {
  filters
}