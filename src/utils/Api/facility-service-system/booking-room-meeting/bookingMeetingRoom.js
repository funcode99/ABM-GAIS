import Api from "@/utils/Api"

const ENDPOINT = "book_meeting_room"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

export default {
  startMeeting: async (id, params) => {
    try {
      const res = await Api.post(`${ENDPOINT}/start_meeting/${id}`, params)

      return res.data
    } catch (error) {
      console.error(error)
    }
  },
  endMeeting: async (id, params) => {
    try {
      const res = await Api.post(`${ENDPOINT}/end_meeting/${id}`, params)

      return res.data
    } catch (error) {
      console.error(error)
    }
  },
}
