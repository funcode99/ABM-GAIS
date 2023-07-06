import Api from "@/utils/Api"

const fetchCompany = async (instanceArray, addCompanyData) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/company/get")

    if (instanceArray !== undefined) instanceArray = res.data.data

    if (addCompanyData !== undefined) addCompanyData.value = res.data.data

    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export default fetchCompany
