<script setup>
    // import { ref } from 'vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'

    import ModalAddRole from "@/components/system-configuration/role/ModalAddRole.vue";
    import ModalEditRole from '@/components/system-configuration/role/ModalEditRole.vue'
    import ModalMenuAccessRole from '@/components/system-configuration/role/ModalMenuAccessRole.vue'

    import icon_filter from "@/assets/icon_filter.svg";
    import icon_reset from "@/assets/icon_reset.svg";
    import icon_receive from "@/assets/icon-receive.svg";

    import dataDummy from '@/utils/Api/system-configuration/roledata.js'

    // import untuk approval table
    import { ref, onMounted, onBeforeMount, reactive, computed } from 'vue'
    import editicon from "@/assets/navbar/edit_icon.svg";
    import deleteicon from "@/assets/navbar/delete_icon.svg";
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import menuIcon from '@/assets/menu-access-role.png'
    import ModalEditApproval from '@/components/system-configuration/approval/ModalEditApprover.vue'
    import ModalDeleteUser from '@/components/system-configuration/user/ModalDeleteUser.vue'

    const search = ref('')
    const isWide = ref(true)
    let currentscript = ref(1)
    let paginatescript = ref(5)
    let paginate_totalscript = ref(0)
    let showingValue = ref(0)

    // import untuk table
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

// watch(ref, callback)

onBeforeMount(() => {
  // sortedData.value gak dianggap sebagai array lagi
  instanceArray = dataDummy
  sortedData.value = instanceArray
})

const filteredItems = (search) => {
    sortedData.value = instanceArray
      const filteredR = sortedData.value.filter(item => {
        // console.log(item.No)
        // harus diganti nama json nya
         return item.No.toString().indexOf(search.toLowerCase()) > -1 | item.UserRole.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
      sortedData.value = filteredR
}
  
</script>

<template>

  <div class="flex flex-col overflow-y-hidden overflow-x-hidden basis-full grow-0 shrink-0 w-screen">

    <Navbar/>
    <!-- <Layout /> -->
    <!-- mt-[115px] -->
    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen mt-[115px]">

      <Sidebar class="flex-none fixed" />

      <!-- w-screen md:w-full -->
      <!-- ml-[100px] md:ml-[260px] -->
      <!-- slate box -->
      <div class="bg-slate-300 py-5 pr-5 pl-5 w-screen h-full sm:ml-[100px] md:ml-[260px]">

        <!-- <div class="h-full w-3 bg-[#97b3c6] flex items-center text-white cursor-pointer absolute left-0" @click="isWide = !isWide">
          >
        </div> -->
      
        <!-- w-screen md:w-full -->
        <!-- table box -->
        <div class="bg-white rounded-t-xl pb-3 relative">

          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
              class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2"
          >
            <p class="font-Poppins text-base capitalize text-[#0A0A0A] font-semibold">
              Role
            </p>
            <div class="flex gap-2 items-center">
                <ModalAddRole />
                <!-- searchbar -->
                <form class="py-2 flex justify-center items-center">
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      class="input input-bordered input-info w-36 sm:w-full px-12 h-9"
                      v-model="search"
                      @keyup="filteredItems(search)"
                    />
                  </div>
                </form>
            </div>
          </div>
          
        </div>
        
        <!-- actual table -->
        <div class="px-4 py-2 bg-white rounded-b-xl box-border block">

        <div class="relative w-full">
          <table class="table table-zebra table-compact overflow-x-hidden border w-full sm:w-full h-full rounded-lg">

            <thead class="text-center font-Montserrat text-sm font-bold h-10">
              <tr class="">

                <th v-for="data in tableHead" :key="data.Id" class="overflow-x-hidden cursor-pointer" @click="sortList(`${data.jsonData}`)">
                  <!-- &#8597; -->
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
                    {{ data.No }} 
                  </td>
                  <td>
                    {{ data.UserRole }}
                  </td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <ModalMenuAccessRole />
                    <ModalEditRole />
                    <ModalDeleteUser />
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


</style>