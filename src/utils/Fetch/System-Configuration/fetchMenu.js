import Api from '@/utils/Api'

const fetchMenu = async (instanceArray, responseStatus, responseMessage, ...anotherMenu) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/menu/get')      
        instanceArray.value = api.data.data
        anotherMenu.map((item) => {
            item.value = api.data.data
        })
        responseStatus.value = api.status
    } catch (error) {
        responseStatus.value = error.response.status
        responseMessage.value = error.response.data.message
    }
}

export default fetchMenu