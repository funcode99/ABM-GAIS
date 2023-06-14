<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import SkeletonLoadingTable from '@/components/layout/SkeletonLoadingTable.vue'

    import ModalEditRole from '@/components/system-configuration/role/ModalEditRole.vue'
    import ModalMenuAccessRole from '@/components/system-configuration/role/ModalMenuAccessRole.vue'

    import { ref, onBeforeMount, computed } from 'vue'
    import Api from '@/utils/Api'
    import Swal from "sweetalert2"

    import deleteCheckedArrayUtils from '@/utils/deleteCheckedArray'
    import selectAllCheckbox from '@/utils/selectAllCheckbox'

    import arrowicon from "@/assets/navbar/icon_arrow.svg"

    import tableContainer from '@/components/table/tableContainer.vue'

    import deleteicon from "@/assets/navbar/delete_icon.svg"
    import icondanger from "@/assets/Danger.png"
    import iconClose from "@/assets/navbar/icon_close.svg"

    import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    import { useMenuAccessStore } from '@/stores/savemenuaccess'
    const sidebar = useSidebarStore()
    const formState = useFormAddStore()
    const formEditState = useFormEditStore()
    const menuAccess = useMenuAccessStore()

    // import untuk table
    let sortedData = ref([])
    let deleteArray = ref([])
    let sortedbyASC = true
    let instanceArray = []

    // for catch status & message response from server when status is not 2xx
    let responseStatus = ref('')
    let responseMessage = ref('')

    let editRoleDataId = ref()

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
          Api.delete(`/role/delete_data/${event}`)
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
              fetch()
            } else {
              fetch()
            }

          })
        } else {
          return
        }
      })

    }

    const editRole = async (data) => {
        editRoleDataId.value = data
        setTimeout(callEditApi, 500)
    }

    const callEditApi = async () => {

        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        let api = await Api.post(`/role/update_data/${editRoleDataId.value}`, {
          role_name: formEditState.role.roleName,
          code_role: formEditState.role.roleCode
        })
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
        })
        fetchGetActive()
        fetch()

    }

    const addRole = async () => {
      setTimeout(callAddApi, 500)
    } 

    const callAddApi = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      await Api.post(`/role/store`, {
        role_name: formState.role.roleName,
        code_role: formState.role.roleCode
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

    const tableHead = [
        {Id: 1, title: 'No', jsonData: 'no'},
        {Id: 2, title: 'User Role', jsonData: 'role_name'},
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

    const selectAll = (checkValue) => {
      selectAllCheckbox(checkValue, deleteArray, sortedData)
    }

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.id.toString().indexOf(search.toLowerCase()) > -1 | item.role_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
      sortedData.value = filteredR
      // lengthCounter = sortedData.value.length
      onChangePage(1)
    }

    const fillPageMultiplier = (value) => {
      // ref harus pake .value biar ngaruh sama reactive :')
      pageMultiplier.value = value
      onChangePage(1)
    }

    const fetchGetActive = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/role/get_active')
      // hasil nya sudah dapat
      menuAccess.fetchResult = api.data.data
    }

    const getSessionForSidebar = () => {
        sidebar.setSidebarRefresh(sessionStorage.getItem('isOpen'))
    }

    const fetch = async () => {

      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/role/get')
        instanceArray = api.data.data
        sortedData.value = instanceArray
        responseStatus.value = api.status
      } catch (error) {
        responseStatus.value = error.response.status
        responseMessage.value = error.response.data.message
      }

    }

    onBeforeMount(() => {
      getSessionForSidebar()
      fetchGetActive()
      fetch()
    })

    const deleteCheckedArray = () => {
      deleteCheckedArrayUtils(deleteArray, 'role', sortedData, fetch)
    }

    const submitAccess = () => {
      setTimeout(submitAccessMenu, 500)
    }
    
    const submitAccessMenu = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.post(`/role/store_menu/${formState.menuAccess.roleId}`, {
        id_role: formState.menuAccess.roleId,
        write: formState.menuAccess.write,
        read: formState.menuAccess.read
      })

      Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
      })

      fetchGetActive()

    }
  
</script>

<template>

  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>

    <div class="flex w-screen content mt-[115px]">

      <Sidebar class="flex-none" />

      <tableContainer>

        <!-- table box -->
        <TableTopBar 
          modalAddType="role"
          :title="'Role'"
          :numberSelected="deleteArray.length" 
          @delete-selected-data="deleteCheckedArray()" 
          @increase-role="addRole" 
          @do-search="filteredItems" 
          @change-showing="fillPageMultiplier"
        />

        <!-- actual table -->
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">

          <div class="relative w-full">

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

                    <td style="width: 75%;">
                      {{ data.role_name }}
                    </td>

                    <!-- 75+5+5 = 85, sisa 15 nya buat yang di akhir (actions) -->
                    <td class="flex flex-wrap gap-4 justify-center">
                      
                      <ModalMenuAccessRole :roleAccess="[data.write, data.read]" :roleId="data.id" @submit-menu-access="submitAccess" />

                      <ModalEditRole @change-role="editRole(data.id)" :formContent="[data.role_name, data.code_role]" />

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
                      <th v-for="data in tableHead" :key="data.Id" class="overflow-x-hidden cursor-pointer">
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

                <SkeletonLoadingTable :column="4" :row="5" />

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
                      colspan="4"
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