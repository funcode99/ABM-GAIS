import Api from '@/utils/Api'

const fetchTypeOfHotel = async (addTypeofHotelData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/hotel/get_by_type')
        addTypeofHotelData.value = api.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchTypeOfHotel