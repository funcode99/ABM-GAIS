<script setup>
  import iconClose from "@/assets/navbar/icon_close.svg"
  import iconPlus from "@/assets/navbar/icon_plus.svg"
  import deleteicon from "@/assets/navbar/delete_icon.svg"
  import roleIcon from '@/assets/menu-access-role.png'

  import { ref, computed, onBeforeMount } from 'vue'
  import { Modal } from 'usemodal-vue3'
  import Api from '@/utils/Api'

  const props = defineProps({
    roleId: Number,
    roleAccess: Array
  })

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = 50

  let sortedData = ref([])
  let sortedDataReactive = computed(() => sortedData.value)
  let instanceArray = []

const menuHeadTable = [
  {Id: 1, title: 'Write'},
  {Id: 2, title: 'Read'},
]


let writeValue = ref(props.roleAccess[0] == undefined ? [] : props.roleAccess[0])
let readValue = ref(props.roleAccess[1] == undefined ? [] : props.roleAccess[1])

const fetch = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get('/role/get_active')      
    instanceArray = api.data.data
    sortedData.value = instanceArray
}

onBeforeMount(() => {
  fetch()
})

const submitAccess = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.post(`/role/store_menu/${props.roleId}`, {
      id_role: props.roleId,
      write: writeValue.value,
      read: readValue.value
    })
}

</script>

<template class="font-JakartaSans">
 
  <button @click="isVisible = !isVisible">
    <img :src=roleIcon class="w-[27px] h-[27px]" alt="">
  </button>

  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

        <nav class="sticky top-0 z-50 bg-[#015289]">
            <button @click="isVisible = false" for="menu-access-role-modal" class="cursor-pointer absolute right-3 top-3">
              <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </button>
            <p class="font-JakartaSans text-2xl font-semibold text-left text-white mx-4 py-2">Menu Access</p>
           
        </nav>
    
        <main class="modal-box-inner-inner">
          <div class="mb-3 overflow-x-auto px-10">
      
              <table class="table w-full">
                
                <thead>
                  <tr class="table-layout">
                    <th></th>
                    <th class="text-center" v-for="data in menuHeadTable" :key="data.Id">
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>
      
                <thead>
                  <tr>
                    <th class="text-[12px]">
                        Travel Management System
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
      
                <tbody>
                    <tr v-for="data in sortedDataReactive" :key="data.Id">
                      <th>
                        {{ data.menu }}
                      </th>
                      <th class="text-center">
                        <input type="checkbox" :value="data.id" v-model="writeValue">
                      </th>
                      <th class="text-center">
                        <input type="checkbox" :value="data.id" v-model="readValue">
                      </th>
                    </tr>
                </tbody>
      
              </table>
              
          </div>
      
          <div class="sticky right-4 bg-white px-10 pt-2 pb-4">
              <div className="divider m-0 pb-4"></div>
              <div class="flex justify-end gap-4">
                <button
                  @click="isVisible = false"
                  class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
                  >
                  Cancel
                </button
                >
                <button
                @click="submitAccess"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
                >
                <button @click="isVisible = false">
                  Save
                </button>
                </button>
              </div>
          </div>
        </main>
        


  </Modal>

</template>

<style scoped>

.modal-box-inner-inner {
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
