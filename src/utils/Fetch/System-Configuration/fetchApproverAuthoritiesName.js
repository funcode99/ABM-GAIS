import Api from '@/utils/Api'

const fetchApproverAuthoritiesName = async (companyId, approvalAuthId, addAuthoritiesNameData) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            // const api = await Api.get(`/users/get/get_authorities_name?id_company=${companyId}&id_approval_auth=${approvalAuthId}`)
            const api = await Api.get(`/users/get/get_authorities_name?id_company=1&id_approval_auth=1`)
            addAuthoritiesNameData.value = api.data.data
            console.log('berhasil')
        } catch (error) {
            console.log(error)
        }
}

export default fetchApproverAuthoritiesName