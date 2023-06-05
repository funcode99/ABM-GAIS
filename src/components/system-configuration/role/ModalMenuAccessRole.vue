<script setup>
  import roleIcon from '@/assets/menu-access-role.png'

  import { useMenuAccessStore } from '@/stores/savemenuaccess'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { ref, computed, watch } from 'vue'
  import { Modal } from 'usemodal-vue3'

  import Api from '@/utils/Api'

  const menuAccess = useMenuAccessStore()

  const props = defineProps({
    roleId: Number,
    roleAccess: Array
  })

  let isVisible = ref(false)
  let modalPaddingHeight = '10vh'

  let sortedData = ref([])
  let sortedDataReactive = computed(() => sortedData.value)

const menuHeadTable = [
  {Id: 1, title: 'Write'},
  {Id: 2, title: 'Read'},
]

let writeValue = ref(props.roleAccess[0] == undefined ? [] : props.roleAccess[0])
let readValue = ref(props.roleAccess[1] == undefined ? [] : props.roleAccess[1])

let defaultValueWrite = ref('')
let defaultValueRead = ref('')

const submitAccess = async () => {

    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.post(`/role/store_menu/${props.roleId}`, {
      id_role: props.roleId,
      write: writeValue.value,
      read: readValue.value
    })

    isVisible.value = false
    defaultValueWrite.value = writeValue.value
    defaultValueRead.value = readValue.value
}

watch(isVisible, () => {
  
  sortedData.value = menuAccess.fetchResult
  
    if(isVisible.value == true) {
      defaultValueWrite.value = writeValue.value
      defaultValueRead.value = readValue.value
    } else if (isVisible.value == false) {
      writeValue.value = defaultValueWrite.value
      readValue.value = defaultValueRead.value
    }

})

</script>

<template class="font-JakartaSans">
 
  <button @click="isVisible = !isVisible">
    <img :src=roleIcon class="w-[27px] h-[27px]" alt="">
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

        <modalHeader
          @closeVisibility="isVisible = false"
          title="Menu Access"
        />
    
        <form class="modal-box-inner-inner" @submit.prevent="submitAccess">

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
         
                <tbody v-for="data in sortedDataReactive" :key="data.Id">
                    
                    <tr>
                      <th>
                        {{ data.menu }}
                      </th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr v-for="inner in data.child">
                      
                          <th>
                            {{ inner.menu }}
                          </th>
                          
                          <th class="text-center">
                            <input type="checkbox" :value="inner.id" v-model="writeValue">
                          </th>
  
                          <th class="text-center">
                            <input type="checkbox" :value="inner.id" v-model="readValue">
                          </th>
  
                    </tr>

                </tbody>
      
              </table>
              
          </div>
          
          <modalFooter
            class="mt-6 pt-5 z-50"
            @closeEdit="isVisible = false"
          />

        </form>

  </Modal>

</template>

<style scoped>

.modal-box-inner-inner {

  max-height: 400px !important;
  
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
