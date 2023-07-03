import Api from "@/utils/Api"

const ENDPOINT = "pool_car"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

const fetchPoolCarRequest = async (params) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_data`, params)

    return res
  } catch (error) {
    console.error(error)
  }
}

export { fetchPoolCarRequest }
