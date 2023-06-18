import Api from '@/utils/Api'

const fetchWarehouse = async (instanceArray, addWarehouseData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/warehouse')
        instanceArray = api.data.data
        addWarehouseData.value = api.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchWarehouse