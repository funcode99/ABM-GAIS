<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import TableTopBar from '@/components/layout/TableTopBar.vue'
    import Footer from '@/components/layout/Footer.vue'

    import Api from '@/utils/Api'

    // import untuk user table
    import { ref, computed, onBeforeMount } from 'vue'
    import arrowicon from "@/assets/navbar/icon_arrow.svg"
    import ModalEditSequence from '@/components/system-configuration/sequence/ModalEditSequence.vue'
    import ModalDelete from '@/components/modal/ModalDelete.vue'

    import { useFormEditStore } from '@/stores/edit-modal.js'
    import { useFormAddStore } from '@/stores/add-modal.js'
    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()
    let formState = useFormAddStore()
    let formEditState = useFormEditStore()

    let editSequenceDataId = ref(0)
    
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
      {Id: 1, title: 'No'},
      {Id: 2, title: 'Name', jsonData: 'sequence_name'},
      {Id: 3, title: 'Prefix', jsonData: 'prefix'},
      {Id: 4, title: 'Suffix', jsonData: 'suffix'},
      {Id: 5, title: 'Sequence Size', jsonData: 'sequence_size'},
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
      getSessionForSidebar()
      fetch()
    })

    const filteredItems = (search) => {
      sortedData.value = instanceArray
        const filteredR = sortedData.value.filter(item => {
          return item.sequence_name.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.prefix.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.suffix.toLowerCase().indexOf(search.toLowerCase()) > -1 | item.sequence_size.toString().indexOf(search.toLowerCase()) > -1
      })
      sortedData.value = filteredR
      lengthCounter = sortedData.value.length
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
      const api = await Api.get('/sequence')      
      instanceArray = api.data.data
      sortedData.value = instanceArray
      lengthCounter = sortedData.value.length
    }

    const deleteData = async (event) => {
     await Api.delete(`/sequence/delete_data/${event}`)
      if (sortedData.value.length == 1) {
        router.go()
      } else {
        fetch()
      }
    }

    const addNewSequence = () => {
      setTimeout(callAddApi, 500)
    }

    const callAddApi = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.post('/sequence/store', 
      {
        sequence_name:  formState.sequence.sequenceName,
        recycle:  formState.sequence.recycle,
        next_value: formState.sequence.nextValue,
        prefix: formState.sequence.prefix,
        suffix: formState.sequence.suffix,
        id_menu: formState.sequence.menuId,
        sequence_size: formState.sequence.sequenceSize
      })
      fetch()
    }

    const editExistingSequence = async (data) => {
      editSequenceDataId.value = data
      setTimeout(callEditApi, 500)
    }

    const callEditApi = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        await Api.post(`/sequence/update_data/${editSequenceDataId.value}`, {
          sequence_name: formEditState.sequence.sequenceName,
          recycle: formEditState.sequence.recycle,
          next_value: formEditState.sequence.nextValue,
          prefix: formEditState.sequence.prefix,
          suffix: formEditState.sequence.suffix,
          id_menu: formEditState.sequence.menuId,
          sequence_size: formEditState.sequence.sequenceSize
        })
        fetch()
    }
  
</script>


<template>

  <!-- kenak loh, ternyata disini overflow x nya -->
  <div class="flex flex-col w-full this h-[100vh]">

    <Navbar/>

    <!-- sudah betul w-screen nya disini jadi gaada sisa space lagi -->
    <div class="flex w-screen content mt-[115px]">

        <Sidebar class="flex-none" />

        <!-- h-full -->
        <!-- lengthCounter < 6 ? 'backgroundHeight' : '',  -->
        <div class="bg-[#e4e4e6] pb-20 pt-10 px-5 w-screen clean-margin ease-in-out duration-500" 
        :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
          >
  
            <TableTopBar :title="'Sequence'" @do-search="filteredItems" @increase-sequence="addNewSequence" @change-showing="fillPageMultiplier" modalAddType="sequence" />
            
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
  
                    <tr v-for="(data, index) in sortedData.slice(
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
                        {{ data.sequence_name }}
                      </td>
                      <td>
                        {{ data.prefix }}
                      </td>
                      <td>
                        {{ data.suffix }}
                      </td>
                      <td>
                        {{ data.sequence_size }}
                      </td>
                      <td class="flex flex-wrap gap-4 justify-center">
                        <ModalEditSequence @change-sequence="editExistingSequence(data.id)" :formContent="[data.sequence_name, data.prefix, data.suffix, data.sequence_size, data.recycle, data.next_value, data.id_menu]" />
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
  
  .zLow {
    z-index: 1;
  }


</style>