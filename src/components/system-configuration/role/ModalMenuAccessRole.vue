<script setup>
  import roleIcon from '@/assets/menu-access-role.png'

  import { useMenuAccessStore } from '@/stores/savemenuaccess'
  import { useFormAddStore } from '@/stores/sysconfig/add-modal'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { ref, watch } from 'vue'
  import { Modal } from 'usemodal-vue3'

  // import Api from '@/utils/Api'

  const menuAccess = useMenuAccessStore()
  let formState = useFormAddStore()

  const props = defineProps({
    roleId: Number,
    roleAccess: Array
  })

  let isVisible = ref(false)
  let modalPaddingHeight = '10vh'

  let sortedData = ref([])
  const emits = defineEmits(['submitMenuAccess'])

const menuHeadTable = [
  {Id: 1, title: 'Write'},
  {Id: 2, title: 'Read'},
]

let writeValue = ref(props.roleAccess[0] == undefined ? [] : props.roleAccess[0])
let readValue = ref(props.roleAccess[1] == undefined ? [] : props.roleAccess[1])

let defaultValueWrite = ref('')
let defaultValueRead = ref('')

const submitAccess = () => {
 
    // defaultValueWrite.value = writeValue.value
    // defaultValueRead.value = readValue.value

    // console.log(writeValue.value)
    // console.log(readValue.value)

    // const token = JSON.parse(localStorage.getItem('token'))
    // Api.defaults.headers.common.Authorization = `Bearer ${token}`
    // const api = await Api.post(`/role/store_menu/${props.roleId}`, {
    //   id_role: props.roleId,
    //   write: writeValue.value,
    //   read: readValue.value
    // })

    formState.menuAccess.roleId = props.roleId
    formState.menuAccess.write = writeValue.value
    formState.menuAccess.read = readValue.value

    emits('submitMenuAccess')

    isVisible.value = false

}

watch(isVisible, () => {

    sortedData.value = menuAccess.fetchResult
  
    if(isVisible.value == true) {
      // defaultValueWrite.value = writeValue.value
      // defaultValueRead.value = readValue.value
    } else if (isVisible.value == false) {
      // writeValue.value = defaultValueWrite.value
      // readValue.value = defaultValueRead.value
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

          <div class="mb-3 overflow-x-auto px-5">
      
              <!-- <table class="table w-full">
                
                <thead>
                  <tr class="table-layout">
                    <th></th>
                    <th class="text-center" v-for="data in menuHeadTable" :key="data.Id">
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>
         
                <tbody v-for="data in sortedData" :key="data.id">

                    <tr>
                      <th>
                        {{ data.menu }}
                      </th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr v-for="inner in data.child">
                      
                          <th class="pl-7">
                            {{ inner.menu }}
                          </th>
                          
                          <th class="text-center">
                            <input type="checkbox" :value="inner.id" v-model="writeValue">
                          </th>
  
                          <th class="text-center">
                            <input type="checkbox" :value="inner.id" v-model="readValue">
                          </th>
  
                    </tr>

                    <tr v-for="inner in data.child">
                      <tr v-for="innerinner in inner.grand_child">
                        <th>
                          {{ innerinner.menu }}
                        </th>
  
                        <th class="text-center">
                          <input type="checkbox" :value="innerinner.id" v-model="writeGrandChildrenValue">
                        </th>
  
                        <th class="text-center">
                          <input type="checkbox" :value="innerinner.id" v-model="readGrandChildrenValue">
                        </th>
                      </tr>
                    </tr>

                </tbody>
      
              </table> -->

              <!-- for header -->
              <div class="flex gap-2 h-7">

                <div class="pl-7 flex-1">

                </div>

                <div class="flex gap-2 basis-2/6 items-center font-black justify-center">
                  <div>
                    Write
                  </div>
                  <div>
                    Read
                  </div>
                </div>

              </div>

              <!-- for body -->
              <div>

                <div v-for="data in sortedData" :key="data.id">

                  <div>

                    <!-- untuk parent -->
                      <div class="h-8 items-center bg-slate-400 flex text-left font-black">
                        <div class="basis-4/6 pl-1">{{ data.menu }}</div>
                          <div class="basis-1/6"></div>
                          <div class="basis-1/6"></div>
                      </div>
                
                      <!-- untuk child & grand child -->
                      <div class="flex flex-col" v-for="inner in data.child" :key="data.id">

                        <!-- untuk child -->
                        <div class="flex items-center text-left gap-2 h-7 bg-slate-300">

                          <div class="pl-7 flex-1 font-black">
                              {{ inner.menu }}
                          </div>

                          <div class="flex items-center gap-4 basis-2/6 justify-center">
                            <input class="p-4" type="checkbox" :value="inner.id" v-model="writeValue">
                            <input class="p-4" type="checkbox" :value="inner.id" v-model="readValue">
                          </div>
                            
                        </div>

                        <!-- untuk grand child -->
                        <div class="flex items-center text-left gap-2 h-7 bg-slate-200" v-for="innerinner in inner.grand_child">
                          <div class="pl-14 flex-1 font-black">
                              {{ innerinner.menu }}
                          </div>

                          <div class="flex gap-4 basis-2/6 justify-center">
                            <div class="">
                                  <input type="checkbox" :value="innerinner.id" v-model="writeValue">
                            </div>
        
                            <div class="">
                                  <input type="checkbox" :value="innerinner.id" v-model="readValue">
                            </div>
                          </div>
                            
                        </div>
                        
                      </div>

                  </div>

                </div>

              </div>
              
          </div>
          
          <modalFooter
            class="mt-6 pt-3 z-50"
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

input[type="checkbox"] {
  height: 18px;
  width: 18px;
}

</style>
