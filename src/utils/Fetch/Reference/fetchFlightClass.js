import Api from "@/utils/Api";

const fetchFlight = async (addFlightClassData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/flight_class")
    addFlightClassData.value = res.data.data
}

export default fetchFlight