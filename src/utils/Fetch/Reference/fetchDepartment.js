import Api from '@/utils/Api'

const fetchDepartment = async (instanceArray, addDepartmentData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/department')
        instanceArray = api.data.data
        addDepartmentData.value = instanceArray
    } catch (error) {
        console.log(error)
    }
}

export default fetchDepartment