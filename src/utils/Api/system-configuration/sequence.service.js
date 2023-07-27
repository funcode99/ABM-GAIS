import Swal from "sweetalert2"
import Api from "@/utils/Api"

const ENDPOINT = "sequence"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

const getPReviewSequenceCode = async (params) => {
  try {
    console.log(params)
    const res = await Api.get(`/preview/${ENDPOINT}`, params)

    return res.data || ""
  } catch (error) {
    console.error(error)
  }
}

export { getPReviewSequenceCode }
