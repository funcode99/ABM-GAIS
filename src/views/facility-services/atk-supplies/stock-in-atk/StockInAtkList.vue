<script setup>
  import Navbar from "@/components/layout/Navbar.vue";
  import Sidebar from "@/components/layout/Sidebar.vue";
  import Footer from "@/components/layout/Footer.vue";

  import icon_filter from "@/assets/icon_filter.svg";
  import icondanger from "@/assets/Danger.png";
  import iconClose from "@/assets/navbar/icon_close.svg";
  import icon_reset from "@/assets/icon_reset.svg";
  import arrowicon from "@/assets/navbar/icon_arrow.svg";
  import icon_receive from "@/assets/icon-receive.svg";
  import deleteicon from "@/assets/navbar/delete_icon.svg";
  import editicon from "@/assets/navbar/edit_icon.svg";
  import gearicon from "@/assets/system-configuration-not-selected.png";

  import ModalAdd from "@/components/facility-services/atk-supplies/stock-in-atk/ModalAdd.vue";

  // import stockindata from "@/utils/Api/facility-service-system/stock-in-atk/stockindata.js";

  import {
    ref,
    onBeforeMount,
    computed
  } from "vue";
  import Api from "@/utils/Api";
  import {
    useSidebarStore
  } from "@/stores/sidebar.js";
  import Swal from "sweetalert2";
  import moment from 'moment';
  const sidebar = useSidebarStore();

  //for sort & search
  const start_date = ref("");
  const end_date = ref("");
  const search = ref("");
  const searchFilter = ref("");
  let sortedData = ref([]);
  const selectedType = JSON.parse(localStorage.getItem("id_role")) === 'ADMTR' ? ref("") : ref(JSON.parse(localStorage.getItem("id_company")));
  const status = ref("");
  let StatusItems = ref([])
  // const status = ref("");
  let itemdata = ref("")
  let Company = ref("");
  let Warehouse = ref("");
  let sortedbyASC = true;
  let instanceArray = [];
  let lengthCounter = 0;
  let lockScrollbar = ref(false);

  //for paginations
  let showingValue = ref(1);
  let pageMultiplier = ref(10);
  let pageMultiplierReactive = computed(() => pageMultiplier.value);
  let paginateIndex = ref(0);
  let lenghtPagination = ref(0)

  //for paginations
  const onChangePage = (pageOfItem) => {
    // paginateIndex.value = pageOfItem - 1;
    // showingValue.value = pageOfItem;
    fetchData(pageOfItem, selectedType.value, status.value, start_date.value, end_date.value,searchFilter.value,pageMultiplier.value)
  };

  //for filter & reset button
  const filterDataByType = () => {
    // console.log(start_date.value[1])
    const start = moment(String(start_date.value[0])).format('YYYY-MM-DD')
    const end = moment(String(start_date.value[1])).format('YYYY-MM-DD')
    // console.log(test)
    if (start_date.value[0] == undefined) {
      fetchData(showingValue.value, selectedType.value, status.value, "", "",searchFilter.value,pageMultiplier.value)
    }  else {
      fetchData(showingValue.value, selectedType.value, status.value, start, end,searchFilter.value,pageMultiplier.value)
    }
    // if (status.value === "") {
    //   sortedData.value = instanceArray;
    // } else {
    //   sortedData.value = instanceArray.filter(
    //     (item) => item.status === status.value
    //   );
    // }
  };

  //for filter & reset button
  const resetData = () => {
    selectedType.value = JSON.parse(localStorage.getItem("id_role")) === 'ADMTR' ? '' : JSON.parse(localStorage.getItem("id_company"));

    status.value = ''
    start_date.value = ''
    end_date.value = ''
    fetchData(showingValue.value, selectedType.value, "", "", "",searchFilter.value,pageMultiplier.value)
    // sortedData.value = instanceArray;
    // status.value = "Type";
  };

  //for check & uncheck all
  const selectAll = (checkValue) => {
    const checkList = checkValue;
    if (checkList == true) {
      let check = document.getElementsByName("checks");
      for (let i = 0; i < check.length; i++) {
        if (check[i].type == "checkbox") check[i].checked = true;
      }
    } else {
      let check = document.getElementsByName("checks");
      for (let i = 0; i < check.length; i++) {
        if (check[i].type == "checkbox") check[i].checked = false;
      }
    }
  };

  //for tablehead
  const tableHead = [{
      Id: 1,
      title: "No",
      jsonData: "id"
    },
    {
      Id: 2,
      title: "Document No",
      jsonData: "no_stock_in"
    },
    {
      Id: 3,
      title: "Date",
      jsonData: "updated_at"
    },
    {
      Id: 4,
      title: "Created By",
      jsonData: "employee_name"
    },
    {
      Id: 5,
      title: "Item Count",
      jsonData: "item_count"
    },
    {
      Id: 6,
      title: "Status",
      jsonData: "status"
    },
    {
      Id: 7,
      title: "Actions"
    },
  ];

  //for sort
  const sortList = (sortBy) => {
    if (sortedbyASC) {
      sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
      sortedbyASC = false;
    } else {
      sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
      sortedbyASC = true;
    }
  };
  const fetchData = async (page, selectedType, status, start_date, end_date,search,perpage) => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get(
      `/stock_in/get?page=${page}&id_company=${selectedType}&code_status_doc=${status}&start_date=${start_date}&end_date=${end_date}&search=${search}&perPage=${perpage}`
      );
    // console.log(res.data.data)
    itemdata.value = res.data.data.data;
    instanceArray = itemdata.value;
    // console.log(instanceArray)
    sortedData.value = instanceArray;
    lengthCounter = sortedData.value.length;
    lenghtPagination = res.data.data.total
    paginateIndex.value = res.data.data.current_page - 1
    showingValue.value = res.data.data.current_page
    // console.log("ini data parent" + JSON.stringify(res.data.data));
  };
  const perPage = async () => {
    // console.log(pageMultiplier.value)
    fetchData(showingValue.value, selectedType.value, status.value, start_date.value, end_date.value,searchFilter.value,pageMultiplier.value)
    // console.log("ini data parent" + JSON.stringify(res.data.data));
  };
  const fetchGetCompany = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get("/company/get");
    Company.value = res.data.data;
    // console.log("ini data parent" + JSON.stringify(res.data.data));
  };
  const fetchGetCompanyID = async (id_company) => {
  // changeCompany(id_company)
  const token = JSON.parse(localStorage.getItem("token"));
  // const id_company = JSON.parse(localStorage.getItem("id_company"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_company}`);
  Company.value = res.data.data;
  // console.log(res.data.data)
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if(id_company === element.id){
      selectedType.value = id_company
    }
  }
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
  const deleteValue = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    Swal.fire({
      title: "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
      html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
      iconHtml: `<img src="${icondanger}" />`,
      showCloseButton: true,
      closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
      showCancelButton: true,
      buttonsStyling: false,
      cancelButtonText: "Cancel",
      customClass: {
        cancelButton: "swal-cancel-button",
        confirmButton: "swal-confirm-button",
      },
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete(`/stock_in/delete_data/${id}`).then((res) => {
          Swal.fire({
            title: "Successfully",
            text: res.data.message,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#015289",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchData(showingValue.value, selectedType.value, status.value, start_date.value, end_date.value,searchFilter.value,pageMultiplier.value)
        });
      } else {
        return;
      }
    });

    // console.log("ini data parent" + JSON.stringify(res.data.data));
  };
  const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === 'ADMTR' ? fetchGetCompany() : fetchGetCompanyID(id_company)
  // changeCompany()
};
  onBeforeMount(() => {
    getSessionForSidebar();
    fetchData(showingValue.value, selectedType.value, status.value, start_date.value, end_date.value,searchFilter.value,pageMultiplier.value)
    fetchCondition()
    StatusItems.value.push({
      id: 0,
      name: 'Draft'
    }, {
      id: 1,
      name: 'Submitted'
    })
    // console.log(stockindata)
    // instanceArray = stockindata;
    // sortedData.value = instanceArray;
    // lengthCounter = sortedData.value.length;
  });

  //for searching
  const filteredItems = (search) => {
    fetchData(showingValue.value, selectedType.value, status.value, start_date.value, end_date.value,search,pageMultiplier.value)
    // sortedData.value = instanceArray;
    // const filteredR = sortedData.value.filter((item) => {
    //   (item.no_stock_in.toLowerCase().indexOf(search.toLowerCase()) > -1) |
    //   (item.status.toLowerCase().indexOf(search.toLowerCase()) > -1);
    //   return (
    //     (item.no_stock_in.toLowerCase().indexOf(search.toLowerCase()) > -1) |
    //     (item.status.toLowerCase().indexOf(search.toLowerCase()) > -1)
    //   );
    // });
    // sortedData.value = filteredR;
    // lengthCounter = sortedData.value.length;
    // onChangePage(1);
  };

  const getSessionForSidebar = () => {
    sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
  };
  const format_date = (value) => {
    if (value) {
      return moment(String(value)).format('DD-MM-YYYY')
    }
  };
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]" :class="lockScrollbar === true ? 'fixed' : ''">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none fixed" />

      <div class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500" :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]">
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div class="flex flex-wrap items-center justify-between mx-4 py-2">
            <p class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold">
              Stock In ATK
            </p>

            <div class="flex justify-between gap-4 items-center">
              <button class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green">
                <img :src="gearicon" class="w-6 h-6" />
              </button>

              <ModalAdd @close="fetchData(showingValue, selectedType, status, start_date, end_date,searchFilter,pageMultiplier)" />

              <button class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green">
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT, DATE & SEARCH -->

          <div class="grid grid-flow-col auto-cols-max justify-between items-center mx-4 py-2">
            <div class="flex flex-wrap items-center gap-4">

              <div>
                <p class="capitalize font-JakartaSans text-xs text-black font-medium pb-2">
                  Company
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedType">
                  <option disabled selected>Company</option>
                  <option v-for="(company,i) in Company" :key="i" :value="company.id">
                    {{ company.company_name }}
                  </option>
                </select>
              </div>

              <div>
                <p class="capitalize font-JakartaSans text-xs text-black font-medium pb-2">
                  Status
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="status">
                  <option disabled selected>Status</option>
                  <option v-for="data in StatusItems" :key="data.id" :value="data.id">
                    {{ data.name }}
                  </option>
                </select>
              </div>

              <div>
                <div>
                  <p class="capitalize font-JakartaSans text-xs text-black font-medium pb-2">
                    Date
                  </p>

                  <VueDatePicker v-model="start_date" range :enable-time-picker="false" class="my-date lg:w-10" format="dd-MM-yyyy" />
                </div>
              </div>

              <!-- <div>
                <div>
                  <p class="capitalize font-JakartaSans text-xs text-black font-medium pb-2">
                    End Date
                  </p>

                  <VueDatePicker v-model="end_date" :enable-time-picker="false" class="my-date lg:w-10" />
                </div>
              </div> -->

              <div class="flex flex-wrap gap-4 items-center pt-6">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="filterDataByType">
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                  @click="resetData">
                  <span>
                    <img :src="icon_reset" class="w-5 h-5" />
                  </span>
                  Reset
                </button>
              </div>
            </div>

            <!-- <div class="pt-6 w-full ml-2">
              <label class="relative block">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </span>
                <input
                  class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search..."
                  type="text"
                  name="search"
                  v-model="search"
                  @keyup="filteredItems(search)"
                />
              </label>
            </div> -->
          </div>

          <!-- SHOWING -->
          <div class="flex flex-wrap items-center justify-between mx-4 py-2">
            <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
              <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
              <select
                class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                v-model="pageMultiplier"
                @change="perPage">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>
            <div class="flex justify-between gap-4 items-center">
              <label class="relative block">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search..." type="text" name="search" v-model="search" @keyup="filteredItems(search)" />
              </label>
            </div>
          </div>
          <!-- TABLE -->
          <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">
            <div class="block overflow-x-auto">
              <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">
                <thead class="text-center font-JakartaSans text-sm font-bold h-10">
                  <tr>
                    <th>
                      <div class="flex justify-center">
                        <input type="checkbox" name="checked" @click="selectAll((checkList = !checkList))" />
                      </div>
                    </th>

                    <th v-for="data in tableHead" :key="data.Id"
                      class="overflow-x-hidden cursor-pointer font-JakartaSans font-normal text-sm"
                      @click="sortList(`${data.jsonData}`)">
                      <span class="flex justify-center items-center gap-1">
                        {{ data.title }}
                        <button>
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody v-if="sortedData.length > 0">
                  <tr class="font-JakartaSans font-normal text-sm" v-for="(data, index) in sortedData" :key="data.id">
                    <td class="p-0">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ (showingValue - 1) * pageMultiplier + 1 + index }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.no_stock_in }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ format_date(data.updated_at) }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.employee_name }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.item_count }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.status }}
                    </td>
                    <td class="flex flex-nowrap gap-1 justify-center">
                      <router-link  :to="`/viewstockinatk/${data.id}`">
                        <img :src="editicon" class="w-6 h-6" />
                      </router-link>
                      <!-- <button v-else disabled>
                        <img :src="editicon" class="w-6 h-6" />
                      </button> -->
                      <button v-if="data.status == 'Draft'" @click="deleteValue(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                      <button v-else disabled>
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="7">Data Not Found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PAGINATION -->
          <div class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2">
            <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
              Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
              {{ Math.min(showingValue * pageMultiplier, lenghtPagination) }}
              of {{ lenghtPagination }} entries
            </p>
            <vue-awesome-paginate :total-items="lenghtPagination" :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage" v-model="showingValue" :max-pages-shown="4" :show-breakpoint-buttons="false"
              :show-jump-buttons="true" />
          </div>
        </div>
      </div>
      <Footer class="fixed bottom-0 left-0 right-0" />
    </div>
  </div>
</template>

<style scoped>
  .custom-card {
    box-shadow: 0px -4px #015289;
    border-radius: 4px;
  }

  th {
    padding: 2px;
    text-align: left;
    position: relative;
  }

  tr td {
    text-align: center;
    white-space: nowrap;
  }

  tr th {
    background-color: #015289;
    text-transform: capitalize;
    color: white;
  }

  .table-zebra tbody tr:hover td {
    background-color: rgb(193, 192, 192);
    cursor: pointer;
  }

  .this {
    overflow-x: hidden;
  }

  .my-date {
    width: 300px !important;
  }
</style>