import Api from '@/utils/Api'

const fetchGrupCompany = async (instanceArray, addGrupCompanyData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/group_company/get")
    instanceArray.value = res.data.data
    addGrupCompanyData = res.data.data
    // try {
    //     const token = JSON.parse(localStorage.getItem('token'))
    //     Api.defaults.headers.common.Authorization = `Bearer ${token}`
    //     const api = await Api.get('/group_company/get')
    //     instanceArray.value = api.data.data
    //     addGrupCompanyData.value = api.data.data
    // } catch (error) {
    //     console.log(error)
    // }
}

export default fetchGrupCompany