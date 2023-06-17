import Api from '@/utils/Api'

const fetchCity = async (addCityData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/city")
    addCityData.value = res.data.data
    addCityData.value.map((item) => {
      item.value = item.id
    })
}

export default fetchCity