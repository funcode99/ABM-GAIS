import Api from "@/utils/Api"

const ENDPOINT = "site"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

const fetchSiteByUseID = async (userId) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_user_site/${userId}`)

    return res.data
  } catch (error) {
    console.error(error)
  }
}

export { fetchSiteByUseID }
