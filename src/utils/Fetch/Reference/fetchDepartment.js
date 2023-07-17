import Api from "@/utils/Api";

const fetchDepartment = async (instanceArray, addDepartmentData) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get("/department");
    if (instanceArray) instanceArray = api.data.data;
    if (addDepartmentData) addDepartmentData.value = instanceArray;

    return api.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchDepartment;
