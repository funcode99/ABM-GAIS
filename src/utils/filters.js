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

export { numberFilter }
