import Api from "@/utils/Api"

const ENDPOINT = "pool_car"
const CAR_ENDPOINT = "car"
const SITE_ENDPOINT = "site"

const token = JSON.parse(localStorage.getItem("token"))

Api.defaults.headers.common.Authorization = `Bearer ${token}`

// Pool Car Request
const fetchPoolCarRequest = async (params) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_data`, params)

    return res
  } catch (error) {
    console.error(error)
  }
}

// Pool Car Managemenet
const fetchCarMaster = async (params) => {
  try {
    const res = await Api.get(`${CAR_ENDPOINT}/get`, params)

    return res.data
  } catch (error) {
    console.error(error)
  }
}

const saveCarData = async (body) => {
  try {
    const res = await Api.post(`${CAR_ENDPOINT}/store`, body)

    return res
  } catch (error) {
    console.error(error)
  }
}

const deleteCarById = async (carId) => {
  try {
    const res = await Api.delete(`${CAR_ENDPOINT}/${carId}`)

    return res
  } catch (error) {
    console.error(error)
  }
}

const fethDrivers = async () => {
  try {
    const res = await Api.get(`${CAR_ENDPOINT}/get_driver`)

    return res.data.data
  } catch (error) {
    console.error(error)
  }
}

const fetchCarType = async () => {
  try {
    const res = await Api.get(`${CAR_ENDPOINT}/get_type`)

    return res.data.data
  } catch (error) {
    console.error(error)
  }
}

// Site
const getSiteByCompany = async (companyId) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_by_company/${companyId}`)

    return res
  } catch (error) {
    console.error(error)
  }
}

const getAllSite = async () => {
  try {
    const res = await Api.get(`${SITE_ENDPOINT}/get_data`)

    return res
  } catch (error) {
    console.error(error)
  }
}

export {
  fetchPoolCarRequest,
  fetchCarMaster,
  getSiteByCompany,
  getAllSite,
  fetchCarType,
  fethDrivers,
  saveCarData,
  deleteCarById
}
