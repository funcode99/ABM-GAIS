import Api from '@/utils/Api'

const fetchDocumentCode = async (addDocumentData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get("/request_trip/get_document_code")
        addDocumentData.value = res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchDocumentCode