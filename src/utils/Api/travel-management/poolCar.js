import Swal from "sweetalert2"
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

    return res.data
  } catch (error) {
    console.error(error)
  }
}

const fetchPoolCarRequestById = async (requestId) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_data/${requestId}`)

    return res.data
  } catch (error) {
    console.error(error)
  }
}

const saveCarInspection = async (body, progressEvent) => {
  try {
    const res = await Api.post(`${ENDPOINT}/store_check`, body, {
      onUploadProgress: progressEvent,
    })

    return res
  } catch (error) {
    console.error(error)
  }
}

const changeCar = async (requestId, body) => {
  try {
    const res = await Api.post(`${ENDPOINT}/update_data/${requestId}`, body)

    return res
  } catch (error) {
    console.error(error)
  }
}

const fetchDriverCarCheckupByRequesId = async (
  requestId,
  { status, id_car }
) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_check/${requestId}`, {
      params: { status, id_car },
    })

    return res.data
  } catch (error) {
    console.error(error)
  }
}

const fetchP2hHistory = async ({ status, id_car, id_pool_car }) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_p2h_history`, {
      params: { status, id_car, id_pool_car },
    })

    return res.data
  } catch (error) {
    console.error(error)
  }
}

const setPoolRequestStatus = async (requestId) => {
  try {
    return await Api.post(`${ENDPOINT}/update_status/${requestId}`)
  } catch (error) {
    console.error(error)
  }
}

const fetchPoolRequestHistory = async (requestId) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_history/${requestId}`)

    return res.data
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

const fetchPoolCarStatus = async (params) => {
  try {
    const res = await Api.get(`${ENDPOINT}/status`, params)

    return res.data.data || []
  } catch (error) {
    console.error(error)
  }
}

const saveCarData = async (body) => {
  try {
    return await Api.post(`${CAR_ENDPOINT}/store`, body)
  } catch (error) {
    console.error(error)
  }
}

const updateCarData = async (body) => {
  try {
    return await Api.post(`${CAR_ENDPOINT}/update_data`, body)
  } catch (error) {
    console.error(error)
  }
}

const deleteCarById = async (carId) => {
  try {
    const res = await Api.delete(`${CAR_ENDPOINT}/delete_data/${carId}`)

    if (res.data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success to Delete Car Data",
        showConfirmButton: false,
        timer: 1500,
      })
    }

    return res.data
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
  changeCar,
  fetchP2hHistory,
  fetchPoolCarRequest,
  fetchCarMaster,
  getSiteByCompany,
  getAllSite,
  fetchCarType,
  fethDrivers,
  saveCarData,
  deleteCarById,
  fetchPoolCarRequestById,
  fetchDriverCarCheckupByRequesId,
  saveCarInspection,
  setPoolRequestStatus,
  fetchPoolCarStatus,
  updateCarData,
  fetchPoolRequestHistory,
}
