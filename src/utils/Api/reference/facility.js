import Api from "@/utils/Api"

const ENDPOINT = "facility"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

export default {
  list: async (params) => {
    try {
      const res = await Api.get(`${ENDPOINT}`, params)

      return res.data.data || []
    } catch (error) {
      console.error(error)
    }
  },
}
