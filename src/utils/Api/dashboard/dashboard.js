import Api from "@/utils/Api";

const token = JSON.parse(localStorage.getItem("token"));
Api.defaults.headers.common.Authorization = `Bearer ${token}`;

const ENDPOINT = "dashboard";

const getDashboardData = async (params) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_tms`, params);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export { getDashboardData };
