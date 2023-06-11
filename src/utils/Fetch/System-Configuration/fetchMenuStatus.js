import Api from '@/utils/Api'

const fetchMenuStatus = async (instanceArray, addMenuStatusData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/menu/get_status/status')
        instanceArray = api.data.data
        addMenuStatusData.value = instanceArray   
    } catch (error) {
        console.log(error)
    }
}

export default fetchMenuStatus