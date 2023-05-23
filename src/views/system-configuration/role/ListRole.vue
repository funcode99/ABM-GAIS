<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import ModalEditRole from '@/components/system-configuration/role/ModalEditRole.vue'
    import ModalMenuAccessRole from '@/components/system-configuration/role/ModalMenuAccessRole.vue'

    import { ref, onBeforeMount, computed } from 'vue'
    import Api from '@/utils/Api'

    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useFormAddStore } from '@/stores/add-modal.js'
    import { useFormEditStore } from '@/stores/edit-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
    const formState = useFormAddStore()
    const formEditState = useFormEditStore()

    // import untuk table
    let sortedData = ref([])
    let sortedDataReactive = computed(() => sortedData.value)
    let sortedbyASC = true
    let instanceArray = []
    let lengthCounter = 0

    let editRoleDataId = ref()

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

    const deleteData = (event) => {
      Api.delete(`/role/delete_data/${event}`)
      fetch()
      if (sortedData.value.length == 1) {
        // router.go()
        fetch()
      } else {
        fetch()
      }
    }

    const editRole = async (data) => {
        editRoleDataId.value = data
        setTimeout(callEditApi, 500)
    }

    const callEditApi = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        await Api.post(`/role/update_data/${editRoleDataId.value}`, {
          role_name: formEditState.role.roleName
        })
        fetch()
    }

    const addRole = async () => {
      setTimeout(callAddApi, 500)
    } 

    const callAddApi = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      await Api.post(`/role/store`, {
        role_name: formState.role.roleName
      })
      fetch()
    }

    const tableHead = [
        {Id: 1, title: 'No'},
        {Id: 2, title: 'User Role', jsonData: 'role_name'},
        {Id: 3, title: 'Actions'}
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

    let status = ref('')
    let message = ref('')
    const fetch = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/role/get')
        instanceArray = api.data.data
        sortedData.value = instanceArray
        lengthCounter = sortedData.value.length
      } catch (error) {
        status.value = error.response.status
        message.value = error.response.data.message
      }

    }

    // watch(ref, callback)

    onBeforeMount(() => {
    getSessionForSidebar()
    // sortedData.value gak dianggap sebagai array lagi
    fetch()
    })

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.id.toString().indexOf(search.toLowerCase()) > -1 | item.role_name.toLowerCase().indexOf(search.toLowerCase()) > -1
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

    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" /> 
        
      <!-- slate box -->
      <div class="bg-[#e4e4e6] pt-10 pb-20 pr-5 pl-5 w-screen clean-margin ease-in-out duration-500"
      :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
      >
      
        <!-- table box -->
        <TableTopBar :title="'Role'" @increase-role="addRole" @do-search="filteredItems" modalAddType="role" />

        <!-- actual table -->
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">

        <div class="relative w-full">
          <table v-if="sortedData.length > 0"  class="table table-zebra table-compact overflow-x-hidden border w-full sm:w-full h-full rounded-lg">

            <thead class="text-center font-Montserrat text-sm font-bold h-10">
              <tr class="">

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
                    {{ index + 1 }} 
                  </td>
                  <td>
                    {{ data.role_name }}
                  </td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <ModalMenuAccessRole :roleAccess="[data.write, data.read]" :roleId="data.id" />
                    <ModalEditRole @change-role="editRole(data.id)" :formContent="[data.role_name]" />
                    <ModalDelete @confirm-delete="deleteData(data.id)" />
                  </td>
                </tr>

            </tbody>
            
          </table>

          <div v-else>
              <table class="table table-zebra table-compact border h-full w-full rounded-lg">
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

              <div class="text-center py-5">
                <h1>{{ status }}</h1>
                <h1>{{ message }}</h1>
              </div>

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
  /* .zInfinite {
    z-index: 9999;
  } */

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

  .backgroundHeight {
    min-height: calc(100vh - 115px);
  }

  .custom-card {
    box-shadow: 0px -4px #015289;
    border-radius: 4px;
  }


</style>