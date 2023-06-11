import Api from '@/utils/Api'

const fetchEmployee = async (instanceArray, addEmployeeData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get("/employee/get_by_login")
        instanceArray = res.data.data
        addEmployeeData.value = instanceArray
    } catch (error) {
        console.log(error)
    }
}

export default fetchEmployee