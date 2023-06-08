<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import tableContainer from '@/components/table/tableContainer.vue'

    import deleteicon from "@/assets/navbar/delete_icon.svg";
    import icondanger from "@/assets/Danger.png";
    import iconClose from "@/assets/navbar/icon_close.svg";
    
    // import untuk user table
    import { ref, computed, onBeforeMount } from 'vue'
    import { Workbook } from "exceljs";
    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import Swal from "sweetalert2";
    import Api from '@/utils/Api'

    import ModalEditUser from '@/components/system-configuration/user/ModalEditUser.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    
    const sidebar = useSidebarStore()
    const formState = useFormAddStore()
    const formEditState = useFormEditStore()
    
    let sortedData = ref([])
    // let sortedDataReactive = computed(() => sortedData.value)
    let sortedbyASC = true
    let instanceArray = []
    let editDataUserId = ref(0)

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
      const checkLead = checkValue
      if(checkLead == true) {
        let check = document.getElementsByName('chk')
        for(let i=0; i<check.length; i++) {  
            if(check[i].type=='checkbox')  
            check[i].checked=true;  
        }
        deleteArray.value = []
        sortedData.value.map((item) => {
          deleteArray.value.push(item.id)
        })
      } else {
        let check = document.getElementsByName('chk')
        for(let i=0; i<check.length; i++) {  
            if(check[i].type=='checkbox')  
            check[i].checked=false;  
        }
        deleteArray.value = []
      }
    }

    const tableHead = [
      {Id: 1, title: 'No', jsonData: 'no'},
      {Id: 2, title: 'Username', jsonData: 'username'},
      {Id: 3, title: 'User Role', jsonData: 'id_role'},
      {Id: 4, title: 'Approval Authoritites', jsonData: 'id_approval_auth'}
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
      setTimeout(callAddApi, 500);
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
        setTimeout(callEditApi, 1000)
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
          is_active: formEditState.user.idStatusMenu
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
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/users')      
        instanceArray = api.data.data
        console.log(instanceArray)
        sortedData.value = instanceArray
      } catch(error) {
        console.log(error)
      }
    }

    onBeforeMount(() => {
      getSessionForSidebar()
      fetch()
    })

    let deleteArray = ref([])
    const deleteCheckedArray = () => {

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

        deleteArray.value.map((item) => {
          Api.delete(`/users/delete_data/${item}`)
        })
          
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

        deleteArray.value = []

        } else {
          return
        }

      })

    }

    const filterTable = async (id, roleId) => {
      // console.log(id)
      // console.log(roleId)
      // console.log('masuk ke filter table')
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get(`/users?filterCompany=${id}&filterRole=${roleId}`)
        // console.log(api)
        // console.log(api.status)
        // status.value = api.status
        instanceArray = api.data.data
        sortedData.value = instanceArray
    }

    const exportToExcel = () => {

      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet("User Data")

      // Menambahkan header kolom
      tableHead.forEach((column, index) => {
        worksheet.getCell(1, index + 1).value = column.title;
      })

      // Menambahkan data ke baris-baris selanjutnya
      sortedData.value.forEach((data, rowIndex) => {
        worksheet.getCell(rowIndex + 2, 1).value = data.no;
        worksheet.getCell(rowIndex + 2, 2).value = data.username;
        worksheet.getCell(rowIndex + 2, 3).value = data.role_name;
        worksheet.getCell(rowIndex + 2, 4).value = data.auth_name;
      })

      // Menyimpan workbook menjadi file Excel
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "user_data.xlsx";
        a.click();
        URL.revokeObjectURL(url);
      })

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

           <!-- {{ deleteArray }} -->

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
        />

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

                    <tr v-for="(data, index) in sortedData.slice(
                        paginateIndex * pageMultiplierReactive,
                        (paginateIndex + 1) * pageMultiplierReactive
                      )" :key="data.id">
                      <td>
                        <input type="checkbox" name="chk" :value="data.id" v-model="deleteArray">
                      </td>
                      <td>
                          {{ data.no }}
                      </td>
                      <td>
                        {{ data.username }}
                      </td>
                      <td>
                        <!-- {{ data.id_role }} -->
                        {{ data.role_name }}
                      </td>
                      <td>
                        <!-- {{ data.id_approval_auth }} -->
                        {{ data.auth_name }}
                      </td>
                      <td class="flex flex-wrap gap-4 justify-center">
                        <ModalEditUser @change-user="editExistingUser(data.id)" :formContent="[
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
                        <th>
                          <div class="text-center">
                            Actions
                          </div>
                        </th>
                      </tr>
                  </thead>
                  <tbody class="animate-pulse">
                    <tr>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
                      </td>
                      <td>
                        <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
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