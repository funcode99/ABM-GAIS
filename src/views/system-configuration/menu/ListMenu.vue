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

    //for paginations
    let showingValue = ref(1);
    let pageMultiplier = ref(10);
    let pageMultiplierReactive = computed(() => pageMultiplier.value);
    let paginateIndex = ref(0);

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1;
      showingValue.value = pageOfItem;
    }

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
        parent_id: null,
        id_status_menu: formState.menu.idStatusMenu,
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
        sort: formEditState.menu.sort,
        parent_id: null,
        use_sequence: formEditState.menu.sequence,
        id_status_menu: formEditState.menu.idStatusMenu,
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
      {Id: 1, title: 'No'},
      {Id: 2, title: 'Name', jsonData: 'menu'},
      {Id: 3, title: 'Parent Menu', jsonData: 'parent_id'},
      {Id: 4, title: 'Status', jsonData: 'id_status_menu'},
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
      instanceArray = api.data.data.data
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
            
            <div class="block overflow-x-auto overflow-y-hidden">
              
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
              
                      <tr v-for="(data, index) in sortedDataReactive" :key="data.id">
                        <td>
                          <input type="checkbox" name="chk">
                        </td>
                        <td>
                          {{ index + 1 }} 
                        </td>
                        <td>
                          {{ data.menu }}
                        </td>

                        <td class="flex justify-center">
                          <img class="w-16 h-16" :src="data.icon_path" />
                          <!-- {{ data.parent_id }} -->
                        </td>

                        <td v-if="data.id_status_menu == 1">
                          Active
                        </td>

                        <td v-else>
                          Disabled
                        </td>

                        <td class="flex flex-wrap justify-center h-full gap-4 relative">
                          <div class="flex items-center absolute top-0 bottom-0">
                            <ModalEditMenu @change-menu="editMenu(data.id)" :formContent="[data.menu, data.url, data.sort, data.icon]" />
                            <ModalDelete @confirm-delete="deleteData(data.id)" />
                          </div>
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