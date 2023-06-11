import Api from '@/utils/Api'

const fetchRole = async (instanceArray, addRoleData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/role/get')
        instanceArray = api.data.data
        addRoleData.value = instanceArray
    } catch (error) {
        console.log(error)
    }
}

export default fetchRole