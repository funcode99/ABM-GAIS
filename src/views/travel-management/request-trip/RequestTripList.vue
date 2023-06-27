<script setup>

    import Navbar from "@/components/layout/Navbar.vue"
    import Sidebar from "@/components/layout/Sidebar.vue"
    import Footer from "@/components/layout/Footer.vue"

    import RequestTripModal from "@/components/request-trip/company-business/RequestTripModal.vue"

    import tableContainer from '@/components/table/tableContainer.vue'
    import tableTop from '@/components/table/tableTop.vue'

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin.js'
    import fetchDocumentCodeUtils from '@/utils/Fetch/Travel-Management/fetchDocumentCode.js'

    import icon_receive from "@/assets/icon-receive.svg"
    import icon_filter from "@/assets/icon_filter.svg"
    import icon_reset from "@/assets/icon_reset.svg"
    import deleteicon from "@/assets/navbar/delete_icon.svg"
    import icondanger from "@/assets/Danger.png"
    import iconClose from "@/assets/navbar/icon_close.svg"
    import editicon from "@/assets/navbar/edit_icon.svg"
    import arrowicon from "@/assets/navbar/icon_arrow.svg"

    import Api from '@/utils/Api'
    import Swal from "sweetalert2"

    import { ref, computed, onBeforeMount, watch } from "vue"

    import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
    const referenceFetch = useReferenceFetchResult()

    let requestTripType = ref("")
    
    let instanceArray = []
    let sortedData = ref([])
    let employeeLoginData = ref([])
    let documentCodeData = ref([])

    //for paginations
    let showingValue = ref(1)
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)
    let paginateIndex = ref(0)

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
    }

    const tableHeadCompanyBusiness = [
      {id: 0, title: 'No'},
      {id: 1, title: 'Created Date'},
      {id: 2, title: 'Request No'},
      {id: 3, title: 'Requestor'},
      {id: 4, title: 'Purpose of Trip'},
      {id: 5, title: 'Status'},
      {id: 6, title: 'Action'}
    ]

    //for tableHeadFieldBreak
    const tableHeadFieldBreak = [
      { Id: 1, title: "No", jsonData: "no" },
      { Id: 2, title: "Created Date", jsonData: "created_date" },
      { Id: 3, title: "Request No", jsonData: "request_no" },
      { Id: 4, title: "Requestor", jsonData: "requestor" },
      { Id: 5, title: "Purpose of Trip", jsonData: "purpose_of_trip" },
      { Id: 6, title: "Status", jsonData: "Status" },
      { Id: 7, title: "Actions" },
    ]

    //for tableHeadVoucherTaxi
    const tableHeadTaxiVoucher = [
      { Id: 1, title: "No", jsonData: "no" },
      { Id: 2, title: "Created Date", jsonData: "createdDate" },
      { Id: 3, title: "Request No", jsonData: "RequestNo" },
      { Id: 4, title: "Requestor", jsonData: "Requestor" },
      { Id: 5, title: "Purpose of Trip", jsonData: "PurposeOfTrip" },
      { Id: 6, title: "Status", jsonData: "Status" },
      { Id: 7, title: "Actions" },
    ]

    const fetch = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        let api = await Api.get(`/request_trip/get?document=${requestTripType.value}`)      
        instanceArray = api.data.data
        sortedData.value = instanceArray
    }

    const resetAndFetch = () => {
      requestTripType.value = ''
      fetch()
    }

    const getSessionForSidebar = () => {
      sidebar.setSidebarRefresh(sessionStorage.getItem('isOpen'))
    }

    onBeforeMount(() => {
      getSessionForSidebar()
      fetch()
      fetchDocumentCodeUtils(documentCodeData)
      fetchEmployeeByLoginUtils(employeeLoginData)
    })

    watch(employeeLoginData, () => {
      referenceFetch.fetchEmployeeByLoginResult = employeeLoginData.value
    })

    const fillPageMultiplier = () => {
      // ref harus pake .value biar ngaruh sama reactive :')
      pageMultiplier.value = pageMultiplierReactive.value
    }

        //for paginations
        const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1;
      showingValue.value = pageOfItem;
    }

    const deleteData = async (event) => {

    Swal.fire({
      title:
        "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
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
    })
      
    .then((result) => {
      if (result.isConfirmed) {
        Api.delete(`/request_trip/delete_data/${event}`)
        .then((res) => {

          Swal.fire({
            title: "Successfully",
            text: "Data has been deleted.",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#015289",
            showConfirmButton: false,
            timer: 1500,
          });

          if (sortedData.value.length == 1) {
            router.go()
          } else {
            fetch()
          }

        })
      } else {
        return
      }
    })

}

</script>

<template>

  <div class="flex flex-col w-full this h-[100vh]">

    <!-- upper side -->
    <Navbar />

    <!-- bottom side -->
    <!-- kelas content biar abu2 nya turun kebawah -->
    <div class="flex w-screen content mt-[115px]">

      <!-- left bottom side -->
      <Sidebar class="flex-none" />

      <ExpandButton />

      <tableContainer>

        <tableTop>
            
            <!-- TableTopBar -->
            <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
            <div class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2">

              <p class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold">
                Request Trip
              </p>

              <div class="flex items-center gap-4">

                <RequestTripModal />

                <button class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green">
                  <img :src="icon_receive" class="w-6 h-6" />
                </button>

              </div>

            </div>

            <!-- SORT, DATE, FILTER & SEARCH -->
            <div class="flex flex-wrap items-end px-4 py-2 gap-y-2">

              <div class="flex items-end flex-wrap gap-4">

                <!-- SORT -->
                <div class="flex flex-col gap-1">

                  <p
                    class="capitalize font-JakartaSans text-xs text-black font-medium">
                    Purpose of Trip
                  </p>
  
                  <select
                    v-model="requestTripType"
                    class="font-JakartaSans capitalize block bg-white w-[200px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  >
                    <option value="">All Purpose</option>
                    <option v-for="data in documentCodeData" :key="data.id" :value="data.id">
                      {{ data.document_name }}
                    </option>
                  </select>
                </div>
  
                <!-- DATE -->
                <div>
                  <p class="capitalize font-Fira text-xs text-black font-medium">
                    Date
                  </p>
  
                  <input
                    type="date"
                    class="border border-slate-300 h-[40px] rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
  
                <!-- FILTER -->
                <div class="flex gap-4 flex-wrap flex-1">
                  
                  <button
                    @click="fetch"
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]">
                    <span>
                      <img :src="icon_filter" class="w-5 h-5" />
                    </span>
                    Filter
                  </button>
  
                  <button
                    @click="resetAndFetch"
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]">
                    <span>
                      <img :src="icon_reset" class="w-5 h-5" />
                    </span>
                    Reset
                  </button>
  
                </div>

              </div>

              <div class="sm:flex-1"></div>

              <!-- SEARCH -->
              <div class="pt-2 flex md:mx-0">

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
                  />

                </label>

              </div>

            </div>

            <!-- SHOWING -->
            <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
              <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
              <select
                class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                v-model="pageMultiplier"
                @change="fillPageMultiplier"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>

        </tableTop>

          <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">

            <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">

                <thead class="text-center font-JakartaSans text-sm font-bold h-10">
                  
                  <tr>

                    <th>
                      <div class="flex justify-center">
                        <input
                          type="checkbox"
                          name="checked"
                          @click="selectAll((checkList = !checkList))"
                        />
                      </div>
                    </th>

                    <th
                      v-for="data in tableHeadTaxiVoucher"
                      :key="data.Id"
                      class="overflow-x-hidden cursor-pointer"
                      @click="sortList(`${data.jsonData}`)"
                    >
                      <span class="flex justify-center items-center gap-1">
                        {{ data.title }}
                        <button>
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </span>
                    </th>

                  </tr>

                </thead>

                <tbody>
                  
                  <tr
                    class="font-JakartaSans font-normal text-sm"
                    v-for="data in sortedData.slice(
                        paginateIndex * pageMultiplierReactive,
                        (paginateIndex + 1) * pageMultiplierReactive
                      )"
                    :key="data.id"
                  >
                    <td>
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ data.no }}</td>
                    <td>{{ data.created_at }}</td>
                    <td>{{ data.no_request_trip }}</td>
                    <td>{{ data.employee_name }}</td>
                    <td>{{ data.document_name }}</td>
                    <td>{{ data.status }}</td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <button>
                        <img :src="editicon" class="w-6 h-6" />
                      </button>
                      <button @click="deleteData(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>

            </table>

            <!-- PAGINATION -->
            <div class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2">

              <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
                Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
                {{ Math.min(showingValue * pageMultiplier, sortedData.length) }}
                of {{ sortedData.length }} entries
              </p>

              <vue-awesome-paginate
                :total-items="sortedData.length"
                :items-per-page="parseInt(pageMultiplierReactive)"
                :on-click="onChangePage"
                v-model="showingValue"
                :max-pages-shown="4"
                :show-breakpoint-buttons="false"
                :show-jump-buttons="true"
              />

            </div>

          </div>

      </tableContainer>

      <!-- fixed, so this not count as hierarchy -->
      <Footer class="fixed bottom-0 left-0 right-0" />

    </div>

  </div>

</template>

<style scoped>

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

.backgroundHeight {
    min-height: calc(100vh - 115px);
}

.this {
    overflow-x: hidden;
  }

</style>