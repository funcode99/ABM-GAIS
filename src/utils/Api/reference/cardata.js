import Api from "@/utils/Api"

const ENDPOINT = "car"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

const fetchCarRef = async (params) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get`, params)

    return res
  } catch (error) {
    console.error(error)
  }
}

export { fetchCarRef }
