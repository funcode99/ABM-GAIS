import Api from '@/utils/Api'

const fetchGLAccount = async (addGLAccountData) => {

    try {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get("/gl_account")
        addGLAccountData.value = res.data.data
    } catch (error) {
        console.log(error)
    }

}

export default fetchGLAccount