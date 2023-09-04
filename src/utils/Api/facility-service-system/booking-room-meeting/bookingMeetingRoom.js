import Api from "@/utils/Api"

const ENDPOINT = "book_meeting_room"
const EMPLOYEE = "employee"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

export default {
  getSecretaryByCompanyId: async (id, params) => {
    try {
      const res = await Api.get(
        `${EMPLOYEE}/get_secretary_by_company/${id}`,
        params
      )

      return res.data
    } catch (error) {
      console.error(error)
    }
  },
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
  approveMeeting: async (id, body) => {
    return await Api.post(`${ENDPOINT}/booked/${id}`, body)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error.response
      })
  },
  rejectMeeting: async (id, body) => {
    return await Api.post(`${ENDPOINT}/cancel/${id}`, body)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error.response
      })
  },
}
