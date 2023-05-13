<script setup>
    // import { ref } from 'vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'


    // import untuk approval table
    import { ref, onBeforeMount } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import ModalEditApproval from '@/components/system-configuration/approval/ModalEditApprover.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import Api from '@/utils/Api'

    import { useFormAddStore } from '@/stores/add-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
    
    const formState = useFormAddStore()
    const search = ref('')
    let showingValue = ref(0)

    let sortedData = ref([])
    let sortedbyASC = true
    let instanceArray = []
    let lengthCounter = 0

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
  {Id: 1, title: 'No', jsonData: 'No'},
  {Id: 2, title: 'Matrix Name', jsonData: 'MatrixName'},
  {Id: 3, title: 'Menu', jsonData: 'Menu'},
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
    lengthCounter = sortedData.value.length
    }

// watch(ref, callback)

onBeforeMount(() => {
  getSessionForSidebar()
  fetch()
})

const filteredItems = (search) => {
    sortedData.value = instanceArray
      const filteredR = sortedData.value.filter(item => {
        // console.log(item.No)
        console.log(item.ApprovalAuthorities.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.Username.toLowerCase().indexOf(search.toLowerCase()) > -1)
         return item.ApprovalAuthorities.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.Username.toLowerCase().indexOf(search.toLowerCase()) > -1
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

      <!-- lengthCounter < 6 ? 'backgroundHeight' : 'h-full',  -->
      <div class="bg-[#e4e4e6] pb-20 pt-10 pr-5 pl-5 w-screen  clean-margin ease-in-out duration-500"
          :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
      >
      
        <TableTopBar :title="'Approval'" @increase-approver="addNewApprover" @change-showing="fillPageMultiplier" modalAddType="approval" />
        
        <!-- actual table -->
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

                <tr v-for="(data, index) in sortedData" :key="data.No">
                  <td>
                    <input type="checkbox" name="chk">
                  </td>
                  <td>
                    {{ index+1 }} 
                  </td>
                  <td>
                    {{ data.approval_name }}
                  </td>
                  <td>
                    {{ data.menu }}
                  </td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <ModalEditApproval />
                    <ModalDelete @confirm-delete="deleteData(data.id)" />
                  </td>
                </tr>

            </tbody>
            
          </table>
        </div>

        </div>

      </div>

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

  .this {
    overflow-x: hidden;
  }

</style>