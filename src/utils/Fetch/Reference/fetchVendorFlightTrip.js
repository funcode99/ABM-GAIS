import Api from "@/utils/Api"

const fetchVendor = async (addVendorData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/flight_trip/get_vendor")
    addVendorData.value = res.data.data
}

export default fetchVendor