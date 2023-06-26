import Api from '@/utils/Api'

const fetchApproverAuthoritiesUser = async (addAuthoritiesData) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get('/approval/get_approval_type_users') 
            addAuthoritiesData.value = api.data.data
        } catch (error) {
            console.log(error)
        }
}

export default fetchApproverAuthoritiesUser