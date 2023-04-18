<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import ModalAddUser from "@/components/system-configuration/user/ModalAddUser.vue";

    import icon_filter from "@/assets/icon_filter.svg";
    import icon_reset from "@/assets/icon_reset.svg";
    import icon_receive from "@/assets/icon-receive.svg";

    import dataDummy from '@/utils/Api/system-configuration/userdata.js'

    // import untuk user table
    import { ref, onMounted, onBeforeMount, reactive, computed } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import ModalEditUser from '@/components/system-configuration/user/ModalEditUser.vue'
    import ModalDeleteUser from '@/components/modal/ModalDelete.vue'

    const search = ref('')
    const isWide = ref(true)

    let showingValue = ref(1)
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)
    let paginateIndex = ref(0)

    const onChangePage = (pageOfItem) => {
      // start dari 1
        console.log(pageOfItem)
        paginateIndex.value = pageOfItem-1
        showingValue.value = pageOfItem
    }

    const showingNumber = (number) => {
        console.log(number)
        pageMultiplier.value = number
    }

    // import untuk user table

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
    }
  
</script>


<template>

<!-- kenak loh, ternyata disini overflow x nya -->
  <div class="flex flex-col basis-full grow-0 shrink-0 w-full this">

    <div class="flex w-screen">

      <div class="bg-slate-300 py-5 px-8 w-screen h-full">
      
        <!-- table box -->
        <div class="bg-white rounded-t-xl pb-3 relative">

          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div class="flex flex-wrap gap-y-2 items-center justify-between mx-4 py-2">
            <p class="font-Poppins text-base capitalize text-[#0A0A0A] font-semibold">
              USER
            </p>
            <div class="flex gap-4">
              <ModalAddUser />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT & SEARCH -->
          <div class="flex flex-wrap items-center px-4 py-2 gap-y-2">

            <div class="flex flex-wrap md:grid md:grid-flow-col md:auto-cols-max items-center gap-x-2 sm:gap-4 gap-y-4">
              
              <!-- sort company filter -->
              <div class="flex justify-between items-center gap-4">
              <p class="capitalize font-Fira text-xs text-black font-medium">
                Sort
              </p>
    
              <p class="capitalize font-Fira text-xs text-black font-medium">
                Company
              </p>
    
              <div class="dropdown dropdown-bottom bg-white rounded-lg h-9 border">
                <button tabindex="0">
                  <div tabindex="0" class="collapse collapse-arrow">
                    <div class="collapse-title min-h-max py-3">
                      <p
                        class="flex justify-center items-center capitalize font-Fira text-xs text-black font-medium"
                      >
                        company
                      </p>
                    </div>
                  </div>
                </button>
                <ul
                  tabindex="0"
                  class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 capitalize"
                >
                  <li><a>company A</a></li>
                  <li><a>company B</a></li>
                  <li><a>company C</a></li>
                </ul>
              </div>
              </div>

              <!-- filter & reset button -->
              <div class="flex gap-4 flex-wrap items-center">
                  <button
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  >
                    <span>
                      <img :src="icon_filter" class="w-5 h-5" />
                    </span>
                    Filter
                  </button>
                  <button
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                  >
                    <span>
                      <img :src="icon_reset" class="w-5 h-5" />
                    </span>
                    Reset
                  </button>
              </div>

            </div>

            <div class="sm:flex-1"></div>
            
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

          <!-- SHOWING -->
          <div class="flex items-center gap-1 pt-2 pb-4 px-4 h-4">
            <h1 class="text-xs">Showing</h1>
            <select class="border-2 border-black rounded-lg w-15" v-model="pageMultiplier">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option> 
            </select>
          </div>
          
        </div>
        
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

              <!-- index * multiplier, (index + 1) * multiplier -->
              <!-- harus 0 karena index array dimulai dari 0 -->
              <!-- let paginateIndex = ref(0) -->

              <!-- gak boleh 0 karena digunakan sebagai pengali -->
              <!-- let pageMultiplier = ref(1) -->

                <tr v-for="data in sortedData.slice(paginateIndex * pageMultiplierReactive, (paginateIndex + 1) * pageMultiplierReactive)" :key="data.No">
                  <td>
                    <input type="checkbox" name="chk">
                  </td>
                  <td>
                    {{ data.No }} 
                  </td>
                  <td>
                    {{ data.Username }}
                  </td>
                  <td>
                    {{ data.UserRole }}
                  </td>
                  <td>
                    {{ data.ApprovalAuthorities }}
                  </td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <ModalEditUser/>
                    <ModalDeleteUser/>
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

          <!-- <jw-pagination :items="sortedData" @changePage="onChangePage" ></jw-pagination> -->

          <div class="p-5 ">
              <vue-awesome-paginate
                :total-items="sortedData.length"
                :items-per-page="pageMultiplierReactive"
                :on-click="onChangePage"
                v-model="showingValue"
                :max-pages-shown="2"
              />
          </div>

        </div>
      </div>
    </div>  
  </div>
  
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

</style>