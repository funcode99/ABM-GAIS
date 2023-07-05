import Api from "@/utils/Api"

const fetchSite = async (instanceArray, addSiteData) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.get("/site/get_data")

    if (instanceArray !== undefined) instanceArray = api.data.data
    if (addSiteData !== undefined) addSiteData.value = instanceArray

    return api.data.data
  } catch (error) {
    console.log(error)
  }
}

export default fetchSite
