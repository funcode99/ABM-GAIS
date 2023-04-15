<script setup>
import { ref, onMounted, onBeforeMount, reactive, computed } from 'vue'
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import ModalEditUser from '@/components/system-configuration/user/ModalEditUser.vue'
import ModalDeleteUser from '@/components/system-configuration/user/ModalDeleteUser.vue'

import dataDummy from '@/utils/Api/userdata.js'

// ref & reactive sama cuma beda tipe data yang bisa dimasukkan saja
// computed & watch kurang lebih sama

// let userData = dataDummy
// let dump = computed(() => userData.value)
let sortedData = ref([])
let sortedbyASC = true

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

  const props = defineProps({
    searchResult: String
  })

  console.log(props.searchResult)

// watch(ref, callback)

onBeforeMount(() => {
  // sortedData.value gak dianggap sebagai array lagi
  sortedData.value = dataDummy
})

const filteredItems = () => {
      sortedData.filter(item => {
         return item.No.toLowerCase().indexOf(props.search.toLowerCase()) > -1 | item.username.toLowerCase().indexOf(props.search.toLowerCase()) > -1 
      })
}

</script>

<template>

  <div class="relative">
    <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg">

      <thead class="text-center font-Montserrat text-sm font-bold h-10">
        <tr class="">

          <th>
            <div class="flex justify-center">
              <input type="checkbox" name="chklead" @click="selectAll(checkLead = !checkLead)">
            </div>
          </th>

          <th v-for="data in tableHead" :key="data.Id" class="overflow-auto cursor-pointer" @click="sortList(`${data.jsonData}`)">
            <!-- &#8597; -->
            <span class="flex justify-center items-center gap-1">
              {{ data.title }} 
              <button class="">
                <img :src="arrowicon" class="w-[9px] h-3" />
              </button>
            </span>
          </th>

          <!-- <th class="relative">
            <span class="flex justify-center">Username</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Approval Authorities</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Actions</span>
          </th> -->

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

</style>