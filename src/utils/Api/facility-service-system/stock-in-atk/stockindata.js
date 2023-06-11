import Api from "@/utils/Api";

const stockindata = []
const token = JSON.parse(localStorage.getItem("token"));
Api.defaults.headers.common.Authorization = `Bearer ${token}`;
const res = await Api.get("/stock_in/get");
stockindata.value = res.data.data.data

export default stockindata;