import Api from '@/utils/Api'

const fetchApproverAuthorities = async (instanceArray, addAuthoritiesData) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.get('/approval/get_approval_type')
            instanceArray = api.data.data 
            addAuthoritiesData.value = api.data.data
            // console.log(addAuthoritiesData.value)
        } catch (error) {
            console.log(error)
        }
}

export default fetchApproverAuthorities