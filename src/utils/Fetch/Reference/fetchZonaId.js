import Api from '@/utils/Api'

const fetchZonaId = async (addZonaIdData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/zona/get_id")
    addZonaIdData.value = res.data.data
}

export default fetchZonaId