import Api from "@/utils/Api"

const ENDPOINT = "currency"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

const fetchCurrencyList = async () => {
  try {
    const res = await Api.get(`${ENDPOINT}`)

    return res?.data?.data || []
  } catch (error) {
    console.error(error)
  }
}

export { fetchCurrencyList }
