<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import ExpandButton from '@/components/layout/ExpandButton.vue'

    import dataDummy from '@/utils/Api/system-configuration/sequencedata.js'

    // import untuk user table
    import { ref, computed, onBeforeMount } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg";
    import ModalEditUser from '@/components/system-configuration/user/ModalEditUser.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
    
    const search = ref('')
    let sortedData = ref([])
    let sortedbyASC = true
    let instanceArray = []
    let lengthCounter = 0

    //for paginations
    let showingValue = ref(1);
    let pageMultiplier = ref(10);
    let pageMultiplierReactive = computed(() => pageMultiplier.value);
    let paginateIndex = ref(0);

    //for paginations
    const onChangePage = (pageOfItem) => {
      paginateIndex.value = pageOfItem - 1;
      showingValue.value = pageOfItem;
    };

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
      {Id: 2, title: 'Name', jsonData: 'Name'},
      {Id: 3, title: 'Prefix', jsonData: 'Prefix'},
      {Id: 4, title: 'Suffix', jsonData: 'Suffix'},
      {Id: 5, title: 'Sequence Size', jsonData: 'SequenceSize'},
      {Id: 6, title: 'Actions'}
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
      lengthCounter = sortedData.value.length
    })

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.ApprovalAuthorities.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.Username.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
      sortedData.value = filteredR
      lengthCounter = sortedData.value.length
      console.log(lengthCounter)
    }

    const fillPageMultiplier = (value) => {
      // ref harus pake .value biar ngaruh sama reactive :')
      pageMultiplier.value = value
    }
  
</script>


<template>

<!-- kenak loh, ternyata disini overflow x nya -->
  <div class="flex flex-col basis-full grow-0 shrink-0 w-full this">

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen mt-[115px]">

        <Sidebar class="flex-none" />

        <ExpandButton />

        <div class="bg-[#e4e4e6] py-5 px-8 w-screen h-full clean-margin ease-in-out duration-500" 
          :class="[lengthCounter < 6 ? 'backgroundHeight' : 'h-full', sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
          >
  
            <TableTopBar :title="'Sequence'" @change-showing="fillPageMultiplier" modalAddType="sequence" />
            
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
  
                    <tr v-for="data in sortedData.slice(
                        paginateIndex * pageMultiplierReactive,
                        (paginateIndex + 1) * pageMultiplierReactive
                      )" :key="data.No">
                      <td>
                        <input type="checkbox" name="chk">
                      </td>
                      <td>
                        {{ data.No }} 
                      </td>
                      <td>
                        {{ data.Name }}
                      </td>
                      <td>
                        {{ data.Prefix }}
                      </td>
                      <td>
                        {{ data.Suffix }}
                      </td>
                      <td>
                        {{ data.SequenceSize }}
                      </td>
                      <td class="flex flex-wrap gap-4 justify-center">
                        <ModalEditUser/>
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
  
  .zLow {
    z-index: 1;
  }


</style>