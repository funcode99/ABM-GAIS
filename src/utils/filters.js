const numberFilter = (number, option = {}) => {
  if (!isNaN(number)) return number

  const formated = new Intl.NumberFormat("en-ID", option).format(number)
  return formated
}

export { numberFilter }
