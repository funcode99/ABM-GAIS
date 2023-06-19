import Api from "@/utils/Api"

const fetchJobBand = async (addJobBandData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/job_band")
    addJobBandData.value = res.data.data
}

export default fetchJobBand