<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    // import untuk approval table
    import { ref, computed, onBeforeMount } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import ModalEditApproval from '@/components/system-configuration/approval/ModalEditApprover.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import Api from '@/utils/Api'

    import tableContainer from '@/components/table/tableContainer.vue'

    import { useFormAddStore } from '@/stores/add-modal.js'
    import { useFormEditStore } from '@/stores/edit-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"

    const sidebar = useSidebarStore()
    const formEditState = useFormEditStore()
    const formState = useFormAddStore()

    const editApprovalId = ref()

    let sortedData = ref([])
    let sortedbyASC = true
    let instanceArray = []

    let showingValue = ref(1)
    let paginateIndex = ref(0);
    let pageMultiplier = ref(10);
    let pageMultiplierReactive = computed(() => pageMultiplier.value);

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1;
      showingValue.value = pageOfItem;
    };

    const selectAll = (checkValue) => { 
      const checkLead = checkValue
      if(checkLead == true) {
        let check = document.getElementsByName('chk')
        for(let i=0; i<check.length; i++) {  
            if(check[i].type=='checkbox')  
            check[i].checked=true;  
        }
      } else {
        let check = document.getElementsByName('chk')
        for(let i=0; i<check.length; i++) {  
            if(check[i].type=='checkbox')  
            check[i].checked=false;  
        }
      }
    }

    const tableHead = [
      {Id: 1, title: 'No', jsonData: 'id'},
      {Id: 2, title: 'Matrix Name', jsonData: 'approval_name'},
      {Id: 3, title: 'Menu', jsonData: 'menu'},
      {Id: 4, title: 'Actions'}
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
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/approval/get_approval')
        instanceArray = api.data.data
        sortedData.value = instanceArray
    }

    onBeforeMount(() => {
      getSessionForSidebar()
      fetch()
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
          id_company: formState.approval.companyId,
          id_menu: formState.approval.menuId,
          id_code_document: formState.approval.codeDocumentId,
          array_detail: formState.approval.arrayDetail
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
          array_detail: formEditState.approval.arrayDetail
        })
        fetch()
    }

    const deleteData = (event) => {
      console.log(event)
      Api.delete(`/approval/delete_data_approval/${event}`)
      fetch()
      if (sortedData.value.length == 1) {
        router.go()
      } else {
        fetch()
      }
    }
  
</script>

<template>

  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" />

      <tableContainer>
        
        <TableTopBar @do-search="filteredItems" :title="'Approval'" @increase-approver="addNewApprover" @change-showing="fillPageMultiplier" modalAddType="approval" />
        
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">
          
          <div class="relative w-full">
            <table class="table table-zebra table-compact overflow-x-hidden border w-full sm:w-full h-full rounded-lg">

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

                </tr>
              </thead>

              <tbody>

                <!-- sortir nya harus sama dengan key yang di data dummy -->

                  <tr v-for="(data, index) in sortedData" :key="data.id">
                    <td>
                      <input type="checkbox" name="chk">
                    </td>
                    <td>
                      {{ index + 1 }} 
                    </td>
                    <td>
                      {{ data.approval_name }}
                    </td>
                    <td>
                      {{ data.menu }}
                    </td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <ModalEditApproval @edit-approver="editExistingApprover(data.id)" :formContent="[data.approval_name, data.id_company, data.id_menu, data.id_code_document, data.detail]"  />
                      <ModalDelete @confirm-delete="deleteData(data.id)" />
                    </td>
                  </tr>

              </tbody>
              
            </table>
          </div>

          <!-- PAGINATION -->
          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
          >
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
    background-color: grey;
  }

</style>