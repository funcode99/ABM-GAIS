import Api from '@/utils/Api'

const fetchBrand = async (instanceArray, addBrandData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/brand')
        instanceArray.value = api.data.data
        addBrandData.value = api.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchBrand