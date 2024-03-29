<script setup>

    import Navbar from "@/components/layout/Navbar.vue"
    import Sidebar from "@/components/layout/Sidebar.vue"
    import Footer from "@/components/layout/Footer.vue"
    import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue"

    import RequestTripModal from "@/components/request-trip/company-business/RequestTripModal.vue"

    import tableContainer from '@/components/table/tableContainer.vue'
    import tableTop from '@/components/table/tableTop.vue'

    import fetchEmployeeByLoginUtils from '@/utils/Fetch/Reference/fetchEmployeeByLogin.js'
    import fetchDocumentCodeUtils from '@/utils/Fetch/Travel-Management/fetchDocumentCode.js'

    import moment from "moment"

    import icon_receive from "@/assets/icon-receive.svg"
    import icon_filter from "@/assets/icon_filter.svg"
    import icon_reset from "@/assets/icon_reset.svg"
    import deleteicon from "@/assets/navbar/delete_icon.svg"
    import editicon from "@/assets/navbar/edit_icon.svg"
    import icondanger from "@/assets/Danger.png"
    import iconClose from "@/assets/navbar/icon_close.svg"
    import arrowicon from "@/assets/navbar/icon_arrow.svg"

    import Api from '@/utils/Api'
    import Swal from "sweetalert2"

    import { ref, computed, onBeforeMount, watch } from "vue"

    import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
    import { useSidebarStore } from "@/stores/sidebar.js"

    let isError = ref(false)
    let isLoading = ref(false)
    let responseMessage = ref("")

    const sidebar = useSidebarStore()
    const referenceFetch = useReferenceFetchResult()

    let requestTripType = ref("")
    
    let instanceArray = []
    let sortedData = ref([])
    let employeeLoginData = ref([])
    let documentCodeData = ref([])

    let search = ref('')
    let date = ref(['', ''])
    let sortedbyASC = true

    //for paginations
    let showingValue = ref(1)
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)
    let paginateIndex = ref(0)

    let from = ref(0)
    let to = ref(0)
    let totalData = ref(0)
    let perPage = ref(1)
    let lastPage = ref(0)
    let searchTable = ref("")
    let additionalData = ref()

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

    //for Voucher Taxi Request Trip Table
    const tableHeadTaxiVoucher = [
      { Id: 1, title: "No", jsonData: "no" },
      { Id: 2, title: "Created Date", jsonData: "created_at" },
      { Id: 3, title: "Request No", jsonData: "no_request_trip" },
      { Id: 4, title: "Requestor", jsonData: "employee_name" },
      { Id: 5, title: "Purpose of Trip", jsonData: "document_name" },
      { Id: 6, title: "Status", jsonData: "status" },
    ]

    const fetch = async () => {
      
      try {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        if(date.value[0] !== '' & date.value[1] !== '') {

          isLoading.value = true
          
          console.log('ada tanggal nya')

          let firstDate = moment(date.value[0]).format("YYYY-MM-DD")
          let lastDate = moment(date.value[1]).format("YYYY-MM-DD")

          let api = await Api.get(`/request_trip/get?document=${requestTripType.value}&start_date=${firstDate}&end_date=${lastDate}&search=${searchTable.value}&page=${paginateIndex.value}&perPage=${pageMultiplier.value}`)
          
          instanceArray = api.data.data.data
          additionalData.value = api.data.data
          sortedData.value = api.data.data.data

          from.value = additionalData.value.from
          to.value = additionalData.value.to
          totalData.value = additionalData.value.total
          perPage.value = additionalData.value.per_page
          lastPage.value = additionalData.value.last_page

          isLoading.value = false
          isError.value = false

        } else {

          isLoading.value = true
          
          console.log('tidak ada tanggal nya')
          let api = await Api.get(`/request_trip/get?document=${requestTripType.value}&search=${searchTable.value}&page=${paginateIndex.value + 1}&perPage=${pageMultiplier.value}`)

          instanceArray = api.data.data.data
          additionalData.value = api.data.data
          sortedData.value = api.data.data.data

          from.value = additionalData.value.from
          to.value = additionalData.value.to
          totalData.value = additionalData.value.total
          perPage.value = additionalData.value.per_page
          lastPage.value = additionalData.value.last_page

          isLoading.value = false
          isError.value = false
          
        }

      } catch (error) {
        sortedData.value = []
        isLoading.value = false
        isError.value = true
        responseMessage.value = error?.response?.data?.message || error.message;
      }

    }

    const resetAndFetch = () => {
      requestTripType.value = ''
      date.value = ['', '']
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
      pageMultiplier.value = pageMultiplierReactive.value
    }

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1
      showingValue.value = pageOfItem
      fetch()
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
          .then(() => {

            fetch()

            Swal.fire({
              title: "Successfully",
              text: "Data has been deleted.",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#015289",
              showConfirmButton: false,
              timer: 1500,
            })

          })
        } else {
          return
        }
      })

    }

    const sortList = (sortBy) => {
      if(sortedbyASC) {
        sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1))
        sortedbyASC = false
      } else {
        sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1))
        sortedbyASC = true
      }
    }

    const filteredItems = () => {

      if (typeof search.value !== "undefined") {
        searchTable.value = search.value
        fetch()
      } else if (search.value === "") {
        searchTable.value = search.value
        fetch()
      } else {
        fetch()
      }

      // sortedData.value = instanceArray
        
      // const filteredR = sortedData.value.filter(item => {
        
      //   return (
      //     (item.created_at.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      //     (item.no_request_trip.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      //     (item.employee_name.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      //     (item.document_name.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      //     (item.status.toLowerCase().indexOf(search.value.toLowerCase()) > -1)
      //   )

      // })

      // sortedData.value = filteredR

      onChangePage(1)
      
    }

    const assignRequestTripId = (tripId) => {
      localStorage.setItem('tripIdView', tripId)
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
            <!-- USER, EXPORT BUTTON, ADD NEW BUTTON -->
            <div class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2">

              <p class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold">
                Request Trip
              </p>

              <div class="flex items-center gap-4">

                <RequestTripModal @updateRequestTripTable="fetch" />

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

                  <p class="capitalize font-JakartaSans text-xs text-black font-medium">
                    Purpose of Trip
                  </p>
  
                  <select v-model="requestTripType" class="font-JakartaSans capitalize block bg-white w-[200px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">
                    <option value="">All Purpose</option>
                    <option 
                      v-for="data in documentCodeData" 
                      :key="data.id" 
                      :value="data.id"
                    >
                      {{ data.document_name }}
                    </option>
                  </select>
                </div>
  
                <!-- DATE -->
                <div>

                  <p class="capitalize font-Fira text-xs text-black font-medium">
                    Date
                  </p>

                  <VueDatePicker 
                      v-model="date"
                      range
                      :enable-time-picker="false"
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
                    v-model="search"
                    @keyup.enter="filteredItems"
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
                @change="fetch"
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

            <table 
              v-if="sortedData.length > 0" 
              class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
              >

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

                    <th class="h-full flex justify-center items-center overflow-x-hidden">
                        Actions
                    </th>

                  </tr>

                </thead>

                <tbody>
                
                  <tr class="font-JakartaSans font-normal text-sm"
                    v-for="(data, index) in sortedData"
                  >
                    <td>
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ index + 1 + (paginateIndex * pageMultiplierReactive) }}</td>
                    <td>{{ data.created_at }}</td>
                    <td>{{ data.no_request_trip }}</td>
                    <td>{{ data.employee_name }}</td>
                    <td>{{ data.document_name }}</td>
                    <td>{{ data.status }}</td>
                    <td class="flex flex-wrap gap-4 justify-center items-center">
                      <router-link to="/request-view" @click="assignRequestTripId(data.id)">
                        <button>
                          <img :src="editicon" class="w-6 h-6" />
                        </button>
                      </router-link>
                      <button @click="deleteData(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>

            </table>

            <table
              v-else-if="isLoading"
              class="table table-zebra table-compact border h-full w-full rounded-lg"
            >

              <thead class="text-center font-Montserrat text-sm font-bold h-10">
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <input
                        type="checkbox"
                        name="chklead"
                        @click="selectAll((checkLead = !checkLead))"
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
                      <button class="">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>
                  <th>
                    <div class="text-center">Actions</div>
                  </th>
                </tr>
              </thead>

              <SkeletonLoadingTable :column="8" :row="5" />

            </table>

            <!-- (sortedData.length == 0 && responseStatus == 200) ||
            (sortedData.length == 0 && responseStatus == 404) -->

            <table
              v-else-if="sortedData.length === 0 && isLoading === false && isError === false">
              
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

                    <th class="h-full flex justify-center items-center overflow-x-hidden">
                        Actions
                    </th>

                  </tr>

                </thead>

                <tbody>
                  <tr>
                    <td
                      colspan="6"
                      class="text-center font-JakartaSans text-base font-medium"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>

            </table>

            <table
              v-else-if="sortedData.length === 0 && isLoading === false && isError === true"
              class="table table-zebra table-compact border h-full w-full rounded-lg"
            >

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

                    <th class="h-full flex justify-center items-center overflow-x-hidden">
                        Actions
                    </th>

                  </tr>

                </thead>

                <tbody>
                  <tr>
                    <td
                      colspan="8"
                      class="text-center font-JakartaSans text-base font-medium"
                    >
                      <div>
                        Terjadi Error!
                      </div>
                      {{ responseMessage }}
                    </td>
                  </tr>
                </tbody>
            </table>

            <!-- PAGINATION -->
            <div class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2">

              <p  class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
                Showing {{ from }} to {{ to }} of {{ totalData }}
              </p>

              <vue-awesome-paginate
                :total-items="totalData"
                :items-per-page="parseInt(perPage)"
                :on-click="onChangePage"
                v-model="showingValue"
                :max-pages-shown="4"
                :show-breakpoint-buttons="false"
                :show-ending-buttons="true"
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