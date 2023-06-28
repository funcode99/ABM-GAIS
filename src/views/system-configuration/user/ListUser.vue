<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import SkeletonLoadingTable from '@/components/layout/SkeletonLoadingTable.vue'

    import tableContainer from '@/components/table/tableContainer.vue'

    import deleteicon from "@/assets/navbar/delete_icon.svg"
    import icondanger from "@/assets/Danger.png"
    import iconClose from "@/assets/navbar/icon_close.svg"

    import exportExcel from '@/utils/exportToExcel.js'
    import deleteCheckedArrayUtils from '@/utils/deleteCheckedArray'
    import selectAllCheckbox from '@/utils/selectAllCheckbox'

    import fetchRoleUtils from '@/utils/Fetch/System-Configuration/fetchRole'
    import fetchCompanyUtils from '@/utils/Fetch/Reference/fetchCompany'
    import fetchSiteByCompanyIdUtils from '@/utils/Fetch/Reference/fetchSiteByCompanyId'
    import fetchUnregisteredEmployee from '@/utils/Fetch/Reference/fetchUnregisteredEmployee'

    import fetchMenuStatusUtils from '@/utils/Fetch/System-Configuration/fetchMenuStatus'
    import fetchApproverAuthoritiesUserUtils from '@/utils/Fetch/System-Configuration/fetchApproverAuthoritiesUser.js'
    
    // import untuk user table
    import { ref, computed, onBeforeMount, watch } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import Swal from "sweetalert2"
    import Api from '@/utils/Api'

    import ModalEditUser from '@/components/system-configuration/user/ModalEditUser.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    import { useMenuAccessStore } from '@/stores/savemenuaccess'

    import { useReferenceFetchResult } from '@/stores/fetch/reference'
    import { useSysconfigFetchResult } from '@/stores/fetch/sysconfig'
    
    const sidebar = useSidebarStore()
    const formState = useFormAddStore()
    const formEditState = useFormEditStore()
    const referenceFetch = useReferenceFetchResult()
    const sysconfigFetch = useSysconfigFetchResult()
    const menuAccessStore = useMenuAccessStore()
    
    let employeeDataIndexNumber = ref()
    let employeeData = ref()
    let sortedData = ref([])
    let deleteArray = ref([])
    let sortedbyASC = true
    let instanceArray = []
    let editDataUserId = ref(0)

    //for paginations
    let showingValue = ref(1)
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)
    let paginateIndex = ref(0)

    // for catch status & message response from server when status is not 2xx
    let responseStatus = ref('')
    let responseMessage = ref('')

    const tableHead = [
      {Id: 1, title: 'No', jsonData: 'no'},
      {Id: 2, title: 'Username', jsonData: 'username'},
      {Id: 3, title: 'User Role', jsonData: 'id_role'},
      {Id: 4, title: 'Approval Authoritites', jsonData: 'id_approval_auth'}
    ]

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1;
      showingValue.value = pageOfItem;
    }

    const selectAll = (checkValue) => { 
      selectAllCheckbox(checkValue, deleteArray, sortedData)
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

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.username.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
      sortedData.value = filteredR
      onChangePage(1)
    }

    const fillPageMultiplier = (value) => {
      // ref harus pake .value biar ngaruh sama reactive :')
      pageMultiplier.value = value
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
          Api.delete(`/users/delete_data/${event}`)
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

    const addNewUser = async () => {
      // berhasil
      if(formState.user.fullname === '') {
        formState.user.fullname = '-'
      }
      setTimeout(callAddApi, 500)
    }

    const callAddApi = async () => {

        console.log(formState.user.idStatusMenu)

        const token = JSON.parse(localStorage.getItem('token'))

        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.post('/users/store', 
        
        {
          username: formState.user.username,
          email: formState.user.email,
          password: formState.user.password,
          is_employee: formState.user.isEmployee,
          id_role: formState.user.roleId,
          id_approval_auth: formState.user.approvalAuthId,
          id_company: formState.user.companyId,
          id_site: formState.user.siteId,
          name: formState.user.fullname,
          is_active: formState.user.idStatusMenu
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

    const editExistingUser = async (data) => {
        editDataUserId.value = data
        setTimeout(callEditApi, 100)
    }

    const callEditApi = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.post(`/users/update_data/${editDataUserId.value}`, 
        {
          username: formEditState.user.username,
          nama: formEditState.user.fullname,
          email: formEditState.user.email,
          password: formEditState.user.password,
          is_employee: formEditState.user.isEmployee,
          id_role: formEditState.user.roleId,
          id_approval_auth: formEditState.user.approvalAuthId,
          id_company: formEditState.user.companyId,
          id_site: formEditState.user.siteId,
          is_active: formEditState.user.idStatusMenu,
         
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
 
    const getSessionForSidebar = () => {
      sidebar.setSidebarRefresh(sessionStorage.getItem('isOpen'))
    }

    const fetch = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/users') 
        instanceArray = api.data.data
        sortedData.value = instanceArray
        responseStatus.value = api.status
      } catch(error) {
        responseStatus.value = error.response.status
        responseMessage.value = error.response.data.message
      }
    }

    let addRoleData = ref([])
    let addCompanyData = ref([])
    let addEmployeeData = ref([])
    let addMenuStatusData = ref([])
    let addAuthoritiesData = ref([])
    let addSiteByCompanyData = ref([])

    onBeforeMount(() => {
      getSessionForSidebar()
      fetchRoleUtils(instanceArray, addRoleData)
      fetchCompanyUtils(instanceArray, addCompanyData)
      fetchUnregisteredEmployee(addEmployeeData)

      fetchMenuStatusUtils(instanceArray, addMenuStatusData)
      fetchApproverAuthoritiesUserUtils(addAuthoritiesData)
      fetch()
    })

    watch(addRoleData, () => {
      sysconfigFetch.fetchRoleResult = addRoleData.value
    })

    watch(addMenuStatusData, () => {
      sysconfigFetch.fetchMenuStatusResult = addMenuStatusData.value 
    })

    watch(addAuthoritiesData, () => {
      sysconfigFetch.fetchApproverAuthoritiesResult = addAuthoritiesData.value 
    })
    
    watch(addCompanyData, () => {
      referenceFetch.fetchCompanyResult = addCompanyData.value
    })

    watch(addEmployeeData, () => {
      referenceFetch.fetchEmployeeResult = addEmployeeData.value
    })

    const fetchSiteByCompanyId = async () => {
      setTimeout(runfetch, 500)
    }

    const runfetch = () => {
      fetchSiteByCompanyIdUtils(addSiteByCompanyData, menuAccessStore.companyId)
    }

    watch(addSiteByCompanyData, () => {
      menuAccessStore.fetchSiteByCompanyResult = addSiteByCompanyData.value
    })

    const deleteCheckedArray = () => {
      deleteCheckedArrayUtils(deleteArray, 'users', sortedData, fetch)
    }

    const filterTable = async (id, roleId) => {

      if(typeof id !== "number") {
        id = 0
      }

      if(typeof roleId !== "number") {
        roleId = 0
      }

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/users?filterCompany=${id}&filterRole=${roleId}`)
      instanceArray = api.data.data
      sortedData.value = instanceArray

      onChangePage(1)

    }

    const exportToExcel = () => {
      exportExcel('User Data', tableHead, sortedData, 'no', 'username', 'role_name', 'auth_name')
    }

    const fetchEmployeeInfo = (employeeId) => {
      
      employeeDataIndexNumber.value = addEmployeeData.value.findIndex((item) => {
        return item.id == employeeId
      })

      employeeData.value = addEmployeeData.value[employeeDataIndexNumber.value]
      referenceFetch.fetchIndividualEmployeeResult = employeeData.value

    }

</script>


<template>

<!-- kenak loh, ternyata disini overflow x nya -->
  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" />

      <tableContainer>

        <TableTopBar 
          modalAddType="user"
          :title="'User'" 
          :numberSelected="deleteArray.length" 
          @delete-selected-data="deleteCheckedArray()"
          @increase-user="addNewUser" 
          @do-search="filteredItems"
          @change-showing="fillPageMultiplier"
          @filter-table="filterTable"
          @reset-table="fetch"
          @export-to-excel="exportToExcel"
          @fetchSiteForCompany="fetchSiteByCompanyId"
        />

        <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">
            
            <div class="block overflow-x-auto">

              <table v-if="sortedData.length > 0" class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">

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
                        <button>
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </span>
                    </th>

                    <th class="overflow-x-hidden cursor-pointer">
                      <span class="flex justify-center items-center gap-1">
                        Actions
                      </span>
                    </th>

                  </tr>
                </thead>

                <tbody>

                  <!-- sortir nya harus sama dengan key yang di data dummy -->

                    <tr v-for="data in sortedData.slice(
                        paginateIndex * pageMultiplierReactive,
                        (paginateIndex + 1) * pageMultiplierReactive
                      )" :key="data.id">

                      <td style="width: 5%;">
                        <input type="checkbox" name="chk" :value="data.id" v-model="deleteArray">
                      </td>

                      <td style="width: 5%;">
                          {{ data.no }}
                      </td>

                      <td style="width: 25%;">
                        {{ data.username }}
                      </td>

                      <td style="width: 25%;">
                        <!-- {{ data.id_role }} -->
                        {{ data.role_name }}
                      </td>

                      <td style="width: 25%;">
                        <!-- {{ data.id_approval_auth }} -->
                        {{ data.auth_name }}
                      </td>

                      <td class="flex flex-wrap gap-4 justify-center">
                        <ModalEditUser 
                        @fetchSiteForCompany="fetchSiteByCompanyId"
                        @fetchEmployeeIndividualInfo="fetchEmployeeInfo"
                        @change-user="editExistingUser(data.id)" 
                        :formContent="[
                          data.username, 
                          data.email, 
                          data.id_approval_auth, 
                          data.id_role, 
                          data.id_company, 
                          data.id_site, 
                          data.is_employee, 
                          data.name,
                          data.id_employee,
                          data.is_active
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
                          <div class="text-center">
                            Actions
                          </div>
                        </th>
                      </tr>
                  </thead>

                  <SkeletonLoadingTable :column="6" :row="5" />

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
                        colspan="6"
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