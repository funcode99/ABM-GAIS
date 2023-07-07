import moment from "moment"

const numberFilter = (value, option = {}) => {
  if (typeof value !== "number") {
    return value
  }
  const formated = new Intl.NumberFormat("en-ID", {
    currency: "USD",
    ...option,
  }).format(value)
  return formated
}

const toFilterDate = (value, toFormat, fromFormat) => {
  return moment(value, fromFormat).format(toFormat)
}

export { numberFilter, toFilterDate }
