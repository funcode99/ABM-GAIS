import Api from '@/utils/Api'

const fetchMenu = async (instanceArray, ...anotherMenu) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/menu/get')      
        instanceArray = api.data.data
        anotherMenu.map((item) => {
            item.value = instanceArray
        })
    } catch (error) {
        console.log(error)
    }
}

export default fetchMenu