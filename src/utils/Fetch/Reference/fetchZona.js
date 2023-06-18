import Api from '@/utils/Api'

const fetchZona = async (instanceArray, addZonaData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/zona/get')
        instanceArray.value = api.data.data
        addZonaData.value = api.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchZona