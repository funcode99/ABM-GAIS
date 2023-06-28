<script setup>
  import Navbar from "@/components/layout/Navbar.vue";
  import Sidebar from "@/components/layout/Sidebar.vue";
  import Footer from "@/components/layout/Footer.vue";

  import arrow from "@/assets/request-trip-view-arrow.png";
  import editicon from "@/assets/navbar/edit_icon.svg";
  import deleteicon from "@/assets/navbar/delete_icon.svg";

  import {
    onBeforeMount,
    ref
  } from "vue";
  import {
    useRouter
  } from 'vue-router'
  import {
    useSidebarStore
  } from "@/stores/sidebar.js";
  import Api from "@/utils/Api";
  import Swal from "sweetalert2";
  import moment from 'moment';


  const sidebar = useSidebarStore();
  const router = useRouter()
  let lengthCounter = 0;
  const idDetail = ref("")
  let stockName = ref("")
  let createdDate = ref("")
  let createdBy = ref("")
  let brandName = ref("");
  let Company = ref("");
  let Site = ref("");
  let Warehouse = ref("");
  let UOM = ref("")
  let UOMName = ref("")
  let idItems = ref("")
  let ItemsName = ref("")
  let alertQuantity = ref("")
  let Brand = ref("")
  let itemNames = ref("")
  let remark = ref("")
  let siteName = ref("")
  let companyName = ref("")
  let status = ref("")
  let statusValue = ref(false)
  let ItemTable = ref([])
  let lockScrollbarEdit = ref(false);

  const fetchDataById = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get(`/stock_in/get/${id}`);
    // console.log(res.data.data)
    for (let index = 0; index < res.data.data.length; index++) {
      const element = res.data.data[index];
      companyName.value = element.company_name
      stockName.value = element.no_stock_in
      createdDate.value = format_date(element.created_at)
      createdBy.value = element.name_created
      siteName.value = element.site_name
      status.value = element.status
      // element.status == 'Submitted' ? !statusValue : statusValue
    }

    // console.log("ini data parent" + JSON.stringify(res.data.data));
  };
  const fetchDetailById = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get(`/stock_in/get_by_stock_in_id/${id}`);
    // console.log(res.data.data)
    for (let index = 0; index < res.data.data.length; index++) {
      const element = res.data.data[index];
      ItemTable.value.push({
        Warehouse: element.warehouse_name,
        itemNames: element.item_name,
        idItems: element.code_item,
        alertQuantity: element.qty,
        brandName: element.brand_name,
        UOMName: element.uom_name,
        remark: element.remarks,
      })
    }

  };
  const editValue = async (id) => {
  // fetchDataById(id)
  // fetchDetailById(id)
  // idS.value = id
  lockScrollbarEdit.value = true
};
  const submit = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.post(`/stock_in/submit/${router.currentRoute.value.params.id}`);
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    // reset()
    router.push({
      path: '/stockinatk'
    })
    // console.log(res.data.data)


    // console.log("ini data parent" + JSON.stringify(res.data.data));
  };
  onBeforeMount(() => {
    getSessionForSidebar();
    fetchDataById(router.currentRoute.value.params.id)
    fetchDetailById(router.currentRoute.value.params.id)
    idDetail.value = router.currentRoute.value.params.id
    // console.log(router.currentRoute.value.params.id)
  });

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
  <div class="flex flex-col basis-full grow-0 shrink-0 w-full h-full overflow-y-hidden">
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />
      <div class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500" :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]">
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- HEADER -->
          <div class="flex justify-between">
            <router-link to="/stockinatk" class="flex items-center gap-2 py-4 mx-4">
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h3 class="text-blue font-semibold font-JakartaSans text-2xl">
                {{ stockName }}
              </h3>
            </router-link>
            <div class="flex justify-start gap-4 mx-4 py-4">
              <!-- <button
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
              >
                Draft
              </button> -->
              <span
                class="badge text-blue text-base font-JakartaSans font-bold capitalize w-[100px] h-[30px] border-blue bg-white">
                {{status}}
              </span>
              <!-- <button
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit
              </button> -->
            </div>
          </div>

          <div class="flex justify-between ml-10">
            <div class="flex gap-2">
              <button
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
                v-if="status == 'Draft'" @click="editValue(idDetail)" for="my-modal-stock-edit-atk">
                Edit
              </button>
              <button v-if="status == 'Draft'"
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit">
                Submit
              </button><br>
            </div>
          </div>

          <input type="checkbox" id="my-modal-stock-edit-atk" class="modal-toggle" />
          <div v-if="lockScrollbarEdit == true" class="modal">
            <div class="modal-dialog bg-white w-3/5">
              <nav class="sticky top-0 z-50 bg-[#015289]">
                <label @click="lockScrollbar" for="my-modal-item-edit-atk"
                  class="cursor-pointer absolute right-3 top-3">
                  <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
                </label>
                <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start">
                  Edit Stock In
                </p>
              </nav>

              <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4 mb-6">
                <img :src="icondanger2" class="w-5 h-5" />
                <p class="font-JakartaSans font-semibold">
                  Item Info
                </p>
              </div>

              <main class="modal-box-inner-brand pb-14">
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="company"
                      class="block text-black text-left mb-2 font-JakartaSans font-medium text-sm">Company<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                      required v-model="selectedCompany" @change="changeCompany(selectedCompany)">
                      <option disabled selected>Company</option>
                      <option v-for="(company,i) in Company" :key="i" :value="company.id">
                        {{ company.company_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6 w-full">
                    <label for="site"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Site<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                      required v-model="selectedSite" @change="changeSite(selectedSite)">
                      <option disabled selected>Site</option>
                      <option v-for="(site,i) in Site" :key="i" :value="site.id">
                        {{ site.site_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="detail"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Details</label>
                    <hr />
                  </div>
                </div>
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="warehouse"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Warehouse<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      required v-model="selectedWarehouse">
                      <option disabled selected>Warehouse</option>
                      <option v-for="(warehouse,i) in Warehouse" :key="i" :value="warehouse.id">
                        {{ warehouse.warehouse_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6 w-full">
                    <label for="uom"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">UOM<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      required v-model="selectedUOM">
                      <option disabled selected>UOM</option>
                      <option v-for="(uom,i) in UOM" :key="i" :value="uom.id">
                        {{ uom.uom_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="item_name"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Item Name<span
                        class="text-red">*</span></label>
                    <input type="text" v-model="itemNames"
                      class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      placeholder="Item Name" required />
                  </div>

                  <div class="mb-6 w-full">
                    <label for="alert"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Alert Quantity<span
                        class="text-red">*</span></label>
                    <input type="number" v-model="alertQuantity"
                      class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      placeholder="Alert Quantity" required />
                  </div>
                </div>

                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="uom"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Brand<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      required v-model="selectedBrand">
                      <option disabled selected>Brand</option>
                      <option v-for="(brand,i) in Brand" :key="i" :value="brand.id">
                        {{ brand.brand_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6 w-full">
                    <label for="id_item"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Remarks</label>
                    <input type="text" v-model="remark"
                      class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      placeholder="Remarks" required />
                    <!-- <textarea
                                  type="text"
                                  v-model="remark"
                                  class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  placeholder="Remarks"
                                  required
                                /> -->
                  </div>
                </div>
                <div class="flex justify-start px-6 items-center gap-2">
                  <label for="warehouse" class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">ID
                    Items<span class="text-red">*</span></label>
                </div>
                <div class="flex justify-start px-6 items-center gap-2">
                  <div class="flex items-center border-b border-teal-500 py-2 mb-6 w-full">
                    <input
                      class="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      v-model="idItems" maxlength="9" type="number" placeholder="ID Item" aria-label="Full name"
                      disabled="true">
                  </div>
                  <div class="mb-6 w-full"></div>
                </div>
                <div class="sticky bottom-0 bg-white pb-2">
                  <div class="flex justify-center gap-4 mr-6">
                    <button
                      class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                      @click="save">
                      Save
                    </button>
                  </div>
                </div>
              </main>

              <!-- <div class="sticky bottom-0 bg-white pb-2">
                          <div class="flex justify-center gap-4 mr-6">
                            <button
                              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                              @click="save"
                            >
                              Save
                            </button>
                          </div>
                        </div> -->
            </div>
          </div>

          <!-- <div class="flex justify-between ml-10 mt-8">
            <div class="flex gap-2">
              <h1 class="font-JakartaSans font-medium text-lg">Document No : {{ stockName }}</h1>
            </div>
          </div> -->
          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-3 pt-7">
            <div class="flex flex-col gap-2">

              <span class="font-JakartaSans font-medium text-sm">Created Date</span>
              <input type="text" disabled v-model="createdDate"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base" />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Created By</span>
              <input type="text" disabled v-model="createdBy"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base" />
            </div>
          </div>

          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">
            <div class="flex flex-col gap-2">

              <span class="font-JakartaSans font-medium text-sm">Company</span>
              <input type="text" disabled v-model="companyName"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base" />
            </div>
            <div class="flex flex-col gap-2">

              <span class="font-JakartaSans font-medium text-sm">Site</span>
              <input type="text" disabled v-model="siteName"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base" />
            </div>
          </div>
          <!-- TAB & TABLE-->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]">
            <div class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer">
              <div class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
              <p class="font-JakartaSans font-normal text-sm mx-8">Details</p>
            </div>
            <div class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      Warehouse
                    </th>
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      ID Item
                    </th>
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      Item Name
                    </th>
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      Quantity
                    </th>
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      Brand
                    </th>
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      UOM
                    </th>
                    <th class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs">
                      Remark
                    </th>
                    <!-- <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Action
                    </th> -->
                  </tr>
                </thead>
                <tbody class="font-JakartaSans font-normal text-xs" v-for="(value, ind) in ItemTable" :key="ind">
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">{{ value.Warehouse }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.idItems }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.itemNames }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.alertQuantity }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.brandName }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.UOMName }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.remark }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
</style>