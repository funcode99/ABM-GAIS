<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import Api from '@/utils/Api'
    import router from '@/router'
    
    // import untuk approval table
    import { ref, onBeforeMount, computed } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg"

    import ModalEditMenu from '@/components/system-configuration/menu/ModalEditMenu.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    import { useFormEditStore } from '@/stores/edit-modal.js'
    import { useFormAddStore } from '@/stores/add-modal.js'

    let formState = useFormAddStore()
    let formEditState = useFormEditStore()
    const sidebar = useSidebarStore()

    let sortedData = ref([])
    let sortedDataReactive = computed(() => sortedData.value)
    let sortedbyASC = true
    let instanceArray = []
    let lengthCounter = 0
    let editDataId = ref(0)

    const deleteData = async (event) => {
     await Api.delete(`/menu/delete_data/${event}`)
      if (sortedData.value.length == 1) {
        router.go()
      } else {
        fetch()
      }
    }

    const addNewMenu = async () => {
      setTimeout(callApi, 500)
    }

    const callApi = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.post('/menu/store', 
      {
        menu: formState.menu.menuName,
        sort: formState.menu.sort,
        parent_id: 1,
        id_status_menu: 1,
        use_sequence: formState.menu.sequence,
        description: 'kosong',
        url: formState.menu.url,
        icon: formState.menu.icon
      })
      fetch()
    }

    const editMenu = async (data) => {
      editDataId.value = data
      // masukin argumen membuat nya jadi lama
      setTimeout(callEditApi, 1000)
    }

    const callEditApi = async () => {
      
      try {
        const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const api = await Api.post(`/menu/update_data/${editDataId.value}`, {
        menu: formEditState.menu.menuName,
        description: 'kosong',
        url: formEditState.menu.url,
        icon: formEditState.menu.icon,
        sort: 1,
        parent_id: 1,
        use_sequence: 1,
        id_status_menu: 1,
      })
      console.log(api)
      fetch()        
      } catch (error) {
        console.log(error)
      }

    }

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
      {Id: 2, title: 'Name', jsonData: 'Name'},
      {Id: 3, title: 'Parent Menu', jsonData: 'ParentMenu'},
      {Id: 4, title: 'Status', jsonData: 'Status'},
      {Id: 5, title: 'Actions'}
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

    // watch(ref, callback)

    const fetch = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      // Set authorization for api
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/menu/get')      
      instanceArray = api.data.data
      sortedData.value = instanceArray
      lengthCounter = sortedData.value.length
    }

    onBeforeMount(() => {
      getSessionForSidebar()
      fetch()
    })

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.ApprovalAuthorities.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.Username.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
      sortedData.value = filteredR
      lengthCounter = sortedData.value.length
      onChangePage(1)
    }

    const getSessionForSidebar = () => {
      sidebar.setSidebarRefresh(sessionStorage.getItem('isOpen'))
    }

</script>

<template>

  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" />

      <!-- slate box -->
      <div 
      class="bg-[#e4e4e6] pb-20 pt-10 pr-5 pl-5 w-screen clean-margin ease-in-out duration-500"
      :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']">

        <!-- cukup nama fungsi nya aja, argumen nya masuk automatis (gaperlu filteredItems()) -->
        <TableTopBar title="Menu" @increase-menu="addNewMenu " @do-search="filteredItems" modalAddType="menu" />
        
        <!-- actual table -->
          <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">
            
            <div class="block overflow-x-auto">
              <table v-if="sortedData.length > 0" class="table table-zebra table-compact border w-full sm:w-full h-full rounded-lg">
    
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
              
                      <tr @confirm-delete="hiddenRow = true" :class="hiddenRow ? 'hidden' : ''" v-for="(data, key) in sortedDataReactive" :key="data.id">
                        <td>
                          <input type="checkbox" name="">
                        </td>
                        <td>
                          {{ data.id }} 
                        </td>
                        <td>
                          {{ data.menu }}
                          <!-- <img class="w-2 h-2" :src="`http://103.165.130.157:8086/` + data.icon_path" /> -->
                        </td>
                        <td>
                          {{ data.parent_id }}
                        </td>
                        <td>
                          {{ data.id_status_menu }}
                        </td>
                        <td class="flex flex-wrap gap-4 justify-center">
                          <ModalEditMenu @change-menu="editMenu(data.id)" :identity="[data.id, data.menu_name, data.id_status_menu]" />
                          <ModalDelete @confirm-delete="deleteData(data.id)" />
                        </td>
                      </tr>
    
                      <!-- tr gak boleh di dalam div ternyata, kalo enggak hasil nya bakal berantakan -->
                      
                </tbody>
                    
              </table>
    
            <div v-else>
              <table class="table table-zebra table-compact border w-full sm:w-full h-full rounded-lg">
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
              </table>
            </div>
    
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

  .backgroundHeight {
    min-height: calc(100vh - 115px);
  }

</style>