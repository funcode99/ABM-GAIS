<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import SkeletonLoadingTable from '@/components/layout/SkeletonLoadingTable.vue'

    import exportExcel from '@/utils/exportToExcel.js'
    import deleteCheckedArrayUtils from '@/utils/deleteCheckedArray'
    import selectAllCheckbox from '@/utils/selectAllCheckbox'

    import Swal from "sweetalert2"
    import Api from '@/utils/Api'

    // import untuk user table
    import { ref, computed, onBeforeMount, watch } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import ModalEditSequence from '@/components/system-configuration/sequence/ModalEditSequence.vue'

    import tableContainer from '@/components/table/tableContainer.vue'

    import deleteicon from "@/assets/navbar/delete_icon.svg";
    import icondanger from "@/assets/Danger.png";
    import iconClose from "@/assets/navbar/icon_close.svg";

    import fetchMenuUtils from '@/utils/Fetch/System-Configuration/fetchMenu.js'
    import fetchCompanyUtils from '@/utils/Fetch/Reference/fetchCompany.js'

    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    import { useReferenceFetchResult } from '@/stores/fetch/reference'
    import { useSysconfigFetchResult } from '@/stores/fetch/sysconfig'
    const sidebar = useSidebarStore()
    let formState = useFormAddStore()
    const referenceFetch = useReferenceFetchResult()
    const sysconfigFetch = useSysconfigFetchResult()
    let formEditState = useFormEditStore()


    let editSequenceDataId = ref(0)

    // for catch status & message response from server when status is not 2xx
    let responseStatus = ref('')
    let responseMessage = ref('')
    let responseStatusMenu = ref('')
    let responseMessageMenu = ref('')
    
    const search = ref('')
    let sortedData = ref([])
    let sortedbyASC = true
    let instanceArray = []
    let deleteArray = ref([])
    let addCompanyData = ref([])
    let addMenuData =  ref([])
    let baitArray = ref([])

    //for paginations
    let showingValue = ref(1)
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)
    let paginateIndex = ref(0)

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1;
      showingValue.value = pageOfItem;
    }

    const selectAll = (checkValue) => { 
      selectAllCheckbox(checkValue, deleteArray, sortedData)
    }

    const tableHead = [
      {Id: 1, title: 'No', jsonData: 'no'},
      {Id: 2, title: 'Name', jsonData: 'sequence_name'},
      {Id: 3, title: 'Prefix', jsonData: 'prefix'},
      {Id: 4, title: 'Suffix', jsonData: 'suffix'},
      {Id: 5, title: 'Sequence Size', jsonData: 'sequence_size'},
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

    onBeforeMount(() => {
      getSessionForSidebar()
      fetchMenuUtils(baitArray, responseStatusMenu, responseMessageMenu, addMenuData)
      fetchCompanyUtils(instanceArray, addCompanyData)
      fetch()
    })

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.sequence_name.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.prefix.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.suffix.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.sequence_size.toString().indexOf(search.toLowerCase()) > -1
      })
      sortedData.value = filteredR
      onChangePage(1)
    }

    const fillPageMultiplier = (value) => {
      // ref harus pake .value biar ngaruh sama reactive :')
      pageMultiplier.value = value
    }

    const getSessionForSidebar = () => {
      sidebar.setSidebarRefresh(sessionStorage.getItem('isOpen'))
    }

    const fetch = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/sequence')      
        instanceArray = api.data.data
        sortedData.value = instanceArray
        responseStatus.value = api.status
      } catch (error) {
        responseStatus.value = error.response.status
        responseMessage.value = error.response.data.message
        sortedData.value = []
      }
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
          Api.delete(`/sequence/delete_data/${event}`)
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

    const addNewSequence = () => {
      setTimeout(callAddApi, 500)
    }

    const callAddApi = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.post('/sequence/store', 
      {
        sequence_name:  formState.sequence.sequenceName,
        sequence_size: formState.sequence.sequenceSize,
        recycle:  formState.sequence.recycle,
        next_value: formState.sequence.nextValue,
        prefix: formState.sequence.prefix,
        suffix: formState.sequence.suffix,
        id_menu: formState.sequence.menuId,
        id_company: formState.sequence.company,
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

    const editExistingSequence = async (data) => {
      editSequenceDataId.value = data
      setTimeout(callEditApi, 500)
    }

    const callEditApi = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        await Api.post(`/sequence/update_data/${editSequenceDataId.value}`, {
          sequence_name: formEditState.sequence.sequenceName,
          sequence_size: formEditState.sequence.sequenceSize,
          recycle: formEditState.sequence.recycle,
          next_value: formEditState.sequence.nextValue,
          prefix: formEditState.sequence.prefix,
          suffix: formEditState.sequence.suffix,
          id_menu: formEditState.sequence.menuId,
          id_company: formEditState.sequence.company,
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

    const deleteCheckedArray = () => {
      deleteCheckedArrayUtils(deleteArray, 'sequence', sortedData, fetch)
    }

    const filterTable = async (id) => {
      console.log(id)
      console.log('masuk ke filter table')
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get(`/sequence?filterCompany=${id}`)
        // console.log(api)
        // console.log(api.status)
        // status.value = api.status
        instanceArray = api.data.data
        sortedData.value = instanceArray
    }

    const exportToExcel = () => {
      exportExcel('Sequence Data', tableHead, sortedData, 'no', 'sequence_name', 'prefix', 'suffix','sequence_size')
    }

    watch(addCompanyData, () => {
      referenceFetch.fetchCompanyResult = addCompanyData.value 
    })

    watch(addMenuData, () => {
      sysconfigFetch.fetchMenuResult = addMenuData.value
    })

    let readMenuList = ref([])
    let writeMenuList = ref([])

    watch(sidebar, () => {
      console.log('terjadi perubahan di sidebar sequence')
      readMenuList.value = sidebar.readMenu
      writeMenuList.value = sidebar.writeMenu
    })
  
</script>


<template>


  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>


    <div class="flex w-screen content mt-[115px]">

        <Sidebar class="flex-none" />

        <tableContainer>

          <!-- {{ deleteArray }} -->
          
          <TableTopBar 
            modalAddType="sequence"
            :title="'Sequence'" 
            :numberSelected="deleteArray.length" 
            @delete-selected-data="deleteCheckedArray()" 
            @do-search="filteredItems" 
            @increase-sequence="addNewSequence" 
            @change-showing="fillPageMultiplier" 
            @filter-table="filterTable"
            @reset-table="fetch"
            @export-to-excel="exportToExcel"
            />
            
          <!-- actual table -->
          <!-- scrollbar horizontal juga ada disini -->
          <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">
              
            <div class="block overflow-x-auto">
              
              <table v-if="sortedData.length > 0" class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">
  
                <thead class="text-center font-Montserrat text-sm font-bold h-10">
                  
                  <tr class="">

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

                    <th class="overflow-x-hidden cursor-pointer" v-if="writeMenuList.includes('Sequence')">
                      <span class="flex justify-center items-center gap-1">
                        Actions
                      </span>
                    </th>
  
                  </tr>
                </thead>
  
                <tbody>
  
                    <tr v-for="data in sortedData.slice(
                        paginateIndex * pageMultiplierReactive,
                        (paginateIndex + 1) * pageMultiplierReactive
                      )" :key="data.id">

                      <td class="w-[5%]">
                        <input type="checkbox" name="chk" :value="data.id" v-model="deleteArray">
                      </td>

                      <td class="w-[5%]">
                        {{ data.no }}
                      </td>

                      <td class="w-[25%]">
                        <span class="readmore-text" @mouseover="changeTableWidth">
                          {{ data.sequence_name }}
                        </span>
                      </td>

                      <td class="w-[20%]">
                        <span class="readmore-text">
                          {{ data.prefix }}
                        </span>
                      </td>

                      <td class="w-[25%]">
                        <span class="readmore-text">
                          {{ data.suffix }}
                        </span>
                      </td>

                      <td class="w-[10%]">
                        {{ data.sequence_size }}
                      </td>

                      <td class="flex flex-wrap gap-4 justify-center" v-if="writeMenuList.includes('Sequence')">
                        <ModalEditSequence @change-sequence="editExistingSequence(data.id)" :formContent="[
                          data.sequence_name, 
                          data.prefix, 
                          data.suffix, 
                          data.sequence_size, 
                          data.recycle, 
                          data.next_value, 
                          data.id_menu, 
                          data.id_company,
                          data.code_sequence
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

                  <SkeletonLoadingTable :column="7" :row="5" />

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
                      colspan="7"
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

  <Footer />
  
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