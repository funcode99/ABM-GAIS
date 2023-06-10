import Api from '@/utils/Api'

const fetchCompany = async (instanceArray, addCompanyData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const res = await Api.get("/company/get")
        instanceArray = res.data.data
        addCompanyData.value = instanceArray
    } catch (error) {
        console.log(error)
    }
}

export default fetchCompany