import Api from '@/utils/Api'

const fetchHotel = async (instanceArray, addHotelData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/warehouse')
        instanceArray = api.data.data
        addHotelData.value = instanceArray
    } catch (error) {
        console.log(error)
    }
}

export default fetchHotel