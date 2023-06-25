import Api from '@/utils/Api'

const fetchEmployeeByLogin = async (addEmployeeData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get("/employee/get_by_login")
        addEmployeeData.value = res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchEmployeeByLogin