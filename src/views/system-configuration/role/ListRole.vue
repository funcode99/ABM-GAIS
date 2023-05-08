<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import ModalEditRole from '@/components/system-configuration/role/ModalEditRole.vue'
    import ModalMenuAccessRole from '@/components/system-configuration/role/ModalMenuAccessRole.vue'

    import { ref, onBeforeMount } from 'vue'
    import Api from '@/utils/Api'

    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    // import untuk table
    let sortedData = ref([])
    let sortedbyASC = true
    let instanceArray = []
    let lengthCounter = 0

    const deleteData = (event) => {
      Api.delete(`/role/delete_data/${event}`)
      // console.log('ini adalah id ke ' + event)
      // console.log(sortedData.value.length)
      if (sortedData.value.length == 1) {
        router.go()
      } else {
        fetch()
      }
    }

    const editRole = async (data) => {
      console.log(data)
        const token = JSON.parse(localStorage.getItem('token'))
        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        await Api.post(`/role/update_data/${data[0]}`, {
          role: data[1],
          description: data[2]
        })
  }

    const tableHead = [
        {Id: 1, title: 'No', jsonData: 'No'},
        {Id: 2, title: 'User Role', jsonData: 'UserRole'},
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

    const fetch = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        
        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/role')
        instanceArray = api.data.data
        sortedData.value = instanceArray
        lengthCounter = sortedData.value.length
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
          // console.log(item.No)
          // harus diganti nama json nya
          return item.id.toString().indexOf(search.toLowerCase()) > -1 | item.role.toLowerCase().indexOf(search.toLowerCase()) > -1
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
      <!-- lengthCounter < 6 ? 'backgroundHeight' : '',  -->
      <div class="bg-[#e4e4e6] pt-10 pb-20 pr-5 pl-5 w-screen clean-margin ease-in-out duration-500"
      :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
      >
      
        <!-- table box -->
        <TableTopBar :title="'Role'" modalAddType="role" />

        
        <!-- actual table -->
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">

        <div class="relative w-full">
          <table class="table table-zebra table-compact overflow-x-hidden border w-full sm:w-full h-full rounded-lg">

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

                <tr v-for="data in sortedData" :key="data.id">
                  <td>
                    {{ data.id }} 
                  </td>
                  <td>
                    {{ data.role }}
                  </td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <ModalMenuAccessRole />
                    <ModalEditRole @change-role="editRole" :identity="[data.id, data.role, data.description]" />
                    <ModalDelete @confirm-delete="deleteData(data.id)" />
                  </td>
                </tr>

            </tbody>
            
          </table>
        </div>

          <!-- <div class="flex flex-wrap justify-between items-center mx-4 py-2">
            <p class="font-Inter text-xs font-normal text-[#888888]">
              Showing 1 to 10 of 20 entries
            </p>
          </div> -->

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