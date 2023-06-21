import Api from '@/utils/Api'

const fetchUnregisteredEmployee = async (addUnregisteredEmployeeData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get("/employee/get_register")
        addUnregisteredEmployeeData.value = res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUnregisteredEmployee