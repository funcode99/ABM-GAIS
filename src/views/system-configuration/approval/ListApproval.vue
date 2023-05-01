<script setup>
    // import { ref } from 'vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import ExpandButton from '@/components/layout/ExpandButton.vue'

    import dataDummy from '@/utils/Api/system-configuration/approverdata.js'

    // import untuk approval table
    import { ref, onBeforeMount } from 'vue'
    import editicon from "@/assets/navbar/edit_icon.svg";
    import deleteicon from "@/assets/navbar/delete_icon.svg";
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import ModalEditApproval from '@/components/system-configuration/approval/ModalEditApprover.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    const search = ref('')
    let showingValue = ref(0)

    let sortedData = ref([])
    let sortedbyASC = true
    let instanceArray = []

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



// watch(ref, callback)

onBeforeMount(() => {
  getSessionForSidebar()
  // sortedData.value gak dianggap sebagai array lagi
  instanceArray = dataDummy
  sortedData.value = instanceArray
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
  
</script>

<template>

  <div class="flex flex-col basis-full grow-0 shrink-0 w-screen this">

    <Navbar/>
    <!-- <Layout /> -->
    <!-- mt-[115px] -->
    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen mt-[115px]">

      <Sidebar class="flex-none" />

      <ExpandButton />

      <div class="bg-[#e4e4e6] py-5 pr-5 pl-5 w-screen h-full clean-margin ease-in-out duration-500"
          :class="[lengthCounter < 6 ? 'backgroundHeight' : 'h-full', sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
      >
      
        <TableTopBar :title="'Approval'" @change-showing="fillPageMultiplier" modalAddType="approval" />
        
        <!-- actual table -->
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">
          
          <!-- <TableUser class="py-2 relative overflow-auto" :searchResult=search /> -->

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

                <tr v-for="data in sortedData" :key="data.No">
                  <td>
                    <input type="checkbox" name="chk">
                  </td>
                  <td>
                    {{ data.No }} 
                  </td>
                  <td>
                    {{ data.MatrixName }}
                  </td>
                  <td>
                    {{ data.Menu }}
                  </td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <ModalEditApproval />
                    <ModalDelete/>
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

  .this {
    overflow-x: hidden;
  }

</style>