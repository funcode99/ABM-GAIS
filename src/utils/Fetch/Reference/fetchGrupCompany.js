import Api from '@/utils/Api'

const fetchGrupCompany = async (addGrupCompanyData) => {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get("/group_company/get")
    addGrupCompanyData.value = res.data.data
}

export default fetchGrupCompany