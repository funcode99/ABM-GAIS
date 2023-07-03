import Api from "@/utils/Api"

const ENDPOINT = "pool_car"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

const fetchStatusPoolCarRequest = async () => {
  try {
    const res = await Api.get(`${ENDPOINT}/status`)

    return res
  } catch (error) {
    console.error()
  }
}

export default fetchStatusPoolCarRequest
