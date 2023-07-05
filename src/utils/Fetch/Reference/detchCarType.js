import Api from "@/utils/Api"

const fetchCarType = async (instanceArray, addCompanyData) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`

    const res = await Api.get("/car/get")

    return res.data.data
  } catch (error) {
    console.error(error)
  }
}

export default fetchCompany
