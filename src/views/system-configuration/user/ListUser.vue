<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import Api from '@/utils/Api'

    // import untuk user table
    import { ref, computed, onBeforeMount } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import ModalEditUser from '@/components/system-configuration/user/ModalEditUser.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    import { useFormAddStore } from '@/stores/add-modal.js'
    const sidebar = useSidebarStore()
    const formState = useFormAddStore()
    
    const search = ref('')
    let sortedData = ref([])
    let sortedDataReactive = computed(() => sortedData.value)
    let sortedbyASC = true
    let instanceArray = []
    let lengthCounter = 0
    let editDataUserId = ref(0)

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
      {Id: 2, title: 'Username', jsonData: 'Username'},
      {Id: 3, title: 'User Role', jsonData: 'UserRole'},
      {Id: 4, title: 'Approval Authoritites', jsonData: 'ApprovalAuthorities'},
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
      console.log(lengthCounter)
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
      const token = JSON.parse(localStorage.getItem('token'))
      // Set authorization for api
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/users')      
      instanceArray = api.data.data
      sortedData.value = instanceArray
      lengthCounter = sortedData.value.length
    }

    const deleteData = async (event) => {
     await Api.delete(`/users/delete_data/${event}`)
      if (sortedData.value.length == 1) {
        router.go()
      } else {
        fetch()
      }
    }

    const addNewUser = async () => {
        setTimeout(callAddApi, 500);
    }

    const callAddApi = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.post('/users/store', 
        {
          username: formState.user.username,
          name: formState.user.username,
          email: formState.user.email,
          password: formState.user.password,
          is_employee: formState.user.isEmployee,
          id_role: formState.user.roleId,
          id_approval_auth: formState.user.approvalAuthId,
          id_company: formState.user.companyId,
          id_site: formState.user.siteId,
        })
        fetch()
    }

    const editExistingUser = async (data) => {
      editDataUserId.value = data
        setTimeout(callEditApi, 1000)
    }

    const callEditApi = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.post(`/users/update_data/${editDataUserId.value}`, 
        {
          username: formState.user.username,
          email: formState.user.email,
          password: formState.user.password,
          is_employee: 1,
          id_role: 1,
          id_approval_auth: 1,
          id_company: 1,
          id_site: 1,
        })
        fetch()
    }
  
</script>


<template>

<!-- kenak loh, ternyata disini overflow x nya -->
  <div 
  class="flex flex-col w-full this h-[100vh]"
  >

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" />    
        
      <div class="bg-[#e4e4e6] pb-20 pt-10 px-8 w-screen clean-margin ease-in-out duration-500" 
        :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']">

          <TableTopBar :title="'User'" @increase-user="addNewUser" @do-search="filteredItems" @change-showing="fillPageMultiplier" modalAddType="user" />
          
          <!-- actual table -->
          <!-- scrollbar horizontal juga ada disini -->
          <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">
            
            <div class="block overflow-x-auto">
              <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">

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

                    <tr v-for="(data, index) in sortedDataReactive.slice(
                        paginateIndex * pageMultiplierReactive,
                        (paginateIndex + 1) * pageMultiplierReactive
                      )" :key="data.No">
                      <td>
                        <input type="checkbox" name="chk">
                      </td>
                      <td>
                        {{ index + 1 }} 
                      </td>
                      <td>
                        {{ data.username }}
                      </td>
                      <td>
                        {{ data.id_role }}
                      </td>
                      <td>
                        {{ data.id_approval_auth }}
                      </td>
                      <td class="flex flex-wrap gap-4 justify-center">
                        <ModalEditUser @change-user="editExistingUser(data.id)" :formContent="[data.username, data.email, data.id_role, data.id_approval_auth]" />
                        <ModalDelete @confirm-delete="deleteData(data.id)" />
                      </td>
                    </tr>

                </tbody>
                
              </table>
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
    background-color: grey;
  }

  .this {
    overflow-x: hidden;
  }

  .backgroundHeight {
    min-height: calc(100vh - 115px);
  }

  .custom-card {
    box-shadow: 0px -4px #015289;
    border-radius: 4px;
  }

</style>