import Api from '@/utils/Api'

const fetchSiteByCompanyId = async (siteResult, companyId) => {

    try {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/company/get_site/${companyId}`)
      siteResult.value = api.data.data
      console.log('selesai mengambil data site')
    } catch (error) {
      console.log(error)
    }
    
}

export default fetchSiteByCompanyId