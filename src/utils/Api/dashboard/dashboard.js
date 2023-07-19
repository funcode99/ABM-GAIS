import Api from "@/utils/Api";

const token = JSON.parse(localStorage.getItem("token"));
Api.defaults.headers.common.Authorization = `Bearer ${token}`;

const ENDPOINT = "dashboard";
const COMPANY_ENDPOINT = "company";

const getDashboardData = async (params) => {
  try {
    const res = await Api.get(`${ENDPOINT}/get_tms`, { params });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getCostCenter = async (companyId) => {
  try {
    const res = await Api.get(
      `${COMPANY_ENDPOINT}/get_cost_center/${companyId}`
    );

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export { getDashboardData, getCostCenter };
