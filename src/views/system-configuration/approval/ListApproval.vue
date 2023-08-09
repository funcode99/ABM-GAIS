<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import SkeletonLoadingTable from '@/components/layout/SkeletonLoadingTable.vue'

    import exportExcel from '@/utils/exportToExcel.js'
    import deleteCheckedArrayUtils from '@/utils/deleteCheckedArray'
    import selectAllCheckbox from '@/utils/selectAllCheckbox'

    import fetchMenuUtils from '@/utils/Fetch/System-Configuration/fetchMenu.js'
    import fetchApproverAuthoritiesUtils from '@/utils/Fetch/System-Configuration/fetchApproverAuthorities.js'
    import fetchCompanyUtils from '@/utils/Fetch/Reference/fetchCompany.js'
    import fetchDocumentCodeUtils from '@/utils/Fetch/Travel-Management/fetchDocumentCode.js'

    // import untuk approval table
    import { ref, computed, onBeforeMount, watch } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import ModalEditApproval from '@/components/system-configuration/approval/ModalEditApprover.vue'

    import Swal from "sweetalert2"
    import Api from '@/utils/Api'

    import tableContainer from '@/components/table/tableContainer.vue'

    import deleteicon from "@/assets/navbar/delete_icon.svg"
    import icondanger from "@/assets/Danger.png"
    import iconClose from "@/assets/navbar/icon_close.svg"

    import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    
    import { useReferenceFetchResult } from '@/stores/fetch/reference'
    import { useSysconfigFetchResult } from '@/stores/fetch/sysconfig'
    import { useTravelManagementFetchResult } from '@/stores/fetch/travel-management'

    const sidebar = useSidebarStore()
    const formEditState = useFormEditStore()
    const formState = useFormAddStore()
    const referenceFetch = useReferenceFetchResult()
    const sysconfigFetch = useSysconfigFetchResult()
    const tmsFetch = useTravelManagementFetchResult()

    const editApprovalId = ref()

    let sortedData = ref([])
    let deleteArray = ref([])
    let sortedbyASC = true
    let instanceArray = []

    let showingValue = ref(1)
    let paginateIndex = ref(0)
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)

    let responseStatus = ref('')
    let responseMessage = ref('')
    let responseStatusMenu = ref('')
    let responseMessageMenu = ref('')

    let addMenuData = ref([])
    let addCompanyData = ref([])
    let addDocumentData = ref([])
    let addAuthoritiesData = ref([])
    let baitArray = ref([])

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1
      showingValue.value = pageOfItem
    }

    const selectAll = (checkValue) => { 
      selectAllCheckbox(checkValue, deleteArray, sortedData)
    }

    const tableHead = [
      {Id: 1, title: 'No', jsonData: 'no'},
      {Id: 2, title: 'Matrix Name', jsonData: 'approval_name'},
      {Id: 3, title: 'Menu', jsonData: 'menu'}
    ]

    const sortList = (sortBy) => {
      if(sortedbyASC) {
        sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1))
        sortedbyASC = false
      } else {
        sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1))
        sortedbyASC = true
      }
    }

    const fetch = async () => {

      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/approval/get_approval')
        instanceArray = api.data.data
        sortedData.value = instanceArray
        responseStatus.value = api.status
      } catch (error) {
        responseStatus.value = error.response.status
        responseMessage.value = error.response.data.message
        sortedData.value = []
      }

    }

    onBeforeMount(() => {
      getSessionForSidebar()
      fetchMenuUtils(baitArray, responseStatusMenu, responseMessageMenu, addMenuData)
      fetchCompanyUtils(instanceArray, addCompanyData)
      fetchDocumentCodeUtils(addDocumentData)
      fetchApproverAuthoritiesUtils(addAuthoritiesData)
      fetch()
    })

    watch(addCompanyData, () => {
      referenceFetch.fetchCompanyResult = addCompanyData.value 
    })

    watch(addMenuData, () => {
      sysconfigFetch.fetchMenuResult = addMenuData.value
    })

    watch(addAuthoritiesData, () => {
      sysconfigFetch.fetchApproverAuthoritiesResult = addAuthoritiesData.value
    })

    watch(addDocumentData, () => {
      tmsFetch.fetchDocumentCodeResult = addDocumentData.value
    })

    const filteredItems = (search) => {
        sortedData.value = instanceArray
          const filteredR = sortedData.value.filter(item => {
            
            // pastikan data yang di filter ada di sortedData
            return item.approval_name.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.menu.toLowerCase().indexOf(search.toLowerCase()) > -1
          })
          sortedData.value = filteredR
          onChangePage(1)
    }

    const getSessionForSidebar = () => {
          sidebar.setSidebarRefresh(sessionStorage.getItem('isOpen'))
    }

    const addNewApprover = async () => {
        setTimeout(callAddApi, 500)
    }

    const callAddApi = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        await Api.post(`/approval/store_approval`, {
          approval_name:  formState.approval.matrixName,
          id_code_document: formState.approval.codeDocumentId,
          id_company: formState.approval.companyId,
          id_job_band: formState.approval.jobBandId,
          id_menu: formState.approval.menuId,
          array_detail: formState.approval.arrayDetail,
        })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        })
        fetch()
    }

    const editExistingApprover = async (data) => {
        editApprovalId.value = data
        setTimeout(callEditApi, 500)
    }

    const callEditApi = async() => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        await Api.post(`/approval/update_data_approval/${editApprovalId.value}`, {
          approval_name:  formEditState.approval.matrixName,
          id_company: formEditState.approval.companyId,
          id_menu: formEditState.approval.menuId,
          id_code_document: formEditState.approval.codeDocumentId,
          array_detail: formEditState.approval.arrayDetail,
          min_ammount: formState.approval.minCA,
          max_ammount: formState.approval.maxCA
        })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been edited",
          showConfirmButton: false,
          timer: 1500,
        })
        fetch()
    }

    const deleteData = (event) => {

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
          Api.delete(`/approval/delete_data_approval/${event}`)
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
                sortedData.value = []
            } else {
              fetch()
            }

          })
        } else {
          return
        }
      })

    }

    const deleteCheckedArray = () => {
      deleteCheckedArrayUtils(deleteArray, 'approval', sortedData, fetch, 'approval')
    }

    const filterTable = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get(`/approval/get_approval?filterCompany=${id}`)
        responseStatus.value = api.status
        instanceArray = api.data.data
        sortedData.value = instanceArray
    }

    const exportToExcel = () => {
      exportExcel('Approval Data', tableHead, sortedData, 'no', 'approval_name', 'menu')
    }

    const fillPageMultiplier = (value) => {
      pageMultiplier.value = value
      onChangePage(1)
    }
  
</script>

<template>

  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" />

      <tableContainer>
        
        <TableTopBar 
          modalAddType="approval"
          :title="'Approval'" 
          :numberSelected="deleteArray.length" 
          @delete-selected-data="deleteCheckedArray()"   
          @do-search="filteredItems" 
          @increase-approver="addNewApprover" 
          @change-showing="fillPageMultiplier"
          @filter-table="filterTable"
          @reset-table="fetch"
          @export-to-excel="exportToExcel"
        />
        
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">
          
          <div class="relative w-full">

            <!-- kalo berhasil fetch responseStatus nya '' -->

            <table v-if="sortedData.length > 0" class="table table-zebra table-compact overflow-x-hidden border w-full sm:w-full h-full rounded-lg">

              <thead class="text-center font-Montserrat text-sm font-bold h-10">

                <tr>

                  <th>
                    <div class="flex justify-center">
                      <input type="checkbox" name="chklead" @click="selectAll(checkLead = !checkLead)">
                    </div>
                  </th>

                  <th v-for="data in tableHead" :key="data.Id" class="overflow-x-hidden cursor-pointer" @click="sortList(`${data.jsonData}`)">
                    <span class="flex justify-center items-center gap-1">
                      {{ data.title }} 
                      <button class="">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>

                  <th class="overflow-x-hidden cursor-pointer" v-if="sidebar.writeMenu.includes('Approval')">
                    <span class="flex justify-center items-center gap-1">
                      Actions
                    </span>
                  </th>

                </tr>

              </thead>

              <tbody>

                <!-- sortir nya harus sama dengan key yang di data dummy -->

                  <tr v-for="(data, index) in sortedData.slice(
                            paginateIndex * pageMultiplierReactive,
                            (paginateIndex + 1) * pageMultiplierReactive
                          )" :key="data.id">

                    <td style="width: 5%;">
                      <input type="checkbox" name="chk" :value="data.id" v-model="deleteArray">
                    </td>

                    <td style="width: 5%;">
                      {{ data.no }} 
                    </td>

                    <td style="width: 40%;">
                      <span>
                        {{ data.approval_name }}
                      </span>
                    </td>

                    <td style="width: 40%;">
                      <span>
                        {{ data.menu }}
                      </span>
                    </td>

                    <td class="flex flex-wrap gap-4 justify-center" v-if="sidebar.writeMenu.includes('Approval')">
                      <ModalEditApproval @fetchApproval="fetch" @edit-approver="editExistingApprover(data.id)" 
                      :formContent="[
                        data.approval_name, 
                        data.id_company, 
                        data.id_menu, 
                        data.id_code_document, 
                        data?.detail, 
                        index,
                        data.min_ammount,
                        data.max_ammount,
                        data.id_job_band_array,
                      ]" />

                      <button @click="deleteData(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                      
                    </td>

                  </tr>

              </tbody>
              
            </table>
      
            <table v-else-if="sortedData.length == 0 && responseStatus == ''" class="table table-zebra table-compact border h-full w-full rounded-lg">

                <thead class="text-center font-Montserrat text-sm font-bold h-10">
                    <tr>
                      <th>
                        <div class="flex justify-center">
                          <input type="checkbox" name="chklead" @click="selectAll(checkLead = !checkLead)">
                        </div>
                      </th>    
                      <th v-for="data in tableHead" :key="data.Id" class="overflow-x-hidden cursor-pointer" @click="sortList(`${data.jsonData}`)">
                        <span class="flex justify-center items-center gap-1">
                          {{ data.title }} 
                          <button class="">
                            <img :src="arrowicon" class="w-[9px] h-3" />
                          </button>
                        </span>
                      </th>
                      <th>
                        <div class="flex justify-center">
                            Actions                    
                        </div>
                      </th>
                    </tr>
                </thead>
                
                <SkeletonLoadingTable :column="5" :row="5" />

            </table>

            <table v-else-if="(sortedData.length == 0 && responseStatus == 200) || (sortedData.length == 0 && responseStatus == 404)" class="table table-zebra table-compact border h-full w-full rounded-lg">
                
                <thead class="text-center font-Montserrat text-sm font-bold h-10">
                    <tr>
                      <th>
                        <div class="flex justify-center">
                          <input type="checkbox" name="chklead" @click="selectAll(checkLead = !checkLead)">
                        </div>
                      </th>    
                      <th v-for="data in tableHead" :key="data.Id" class="overflow-x-hidden cursor-pointer" @click="sortList(`${data.jsonData}`)">
                        <span class="flex justify-center items-center gap-1">
                          {{ data.title }} 
                          <button class="">
                            <img :src="arrowicon" class="w-[9px] h-3" />
                          </button>
                        </span>
                      </th>
                      <th>
                        <div class="text-center">
                          Actions
                        </div>
                      </th>
                    </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colspan="5"
                      class="text-center font-JakartaSans text-base font-medium"
                    >Tidak ada data</td>
                  </tr>
                </tbody>

            </table>

          </div>

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

    </div>

  </div>
  
  <Footer/>
  
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
  }

</style>