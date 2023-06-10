import Api from '@/utils/Api'

const fetchDocumentCode = async (instanceArray, addDocumentData) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const res = await Api.get("/request_trip/get_document_code");
        instanceArray = res.data.data;
        addDocumentData.value = instanceArray
    } catch (error) {
        console.log(error)
    }
}

export default fetchDocumentCode