<script setup>
  import { ref, onBeforeMount, watch } from 'vue'
  import { Modal } from 'usemodal-vue3'
  import iconClose from "@/assets/navbar/icon_close.svg"
  import editIcon from "@/assets/navbar/edit_icon.svg"

  import Api from '@/utils/Api'

  import { useFormEditStore } from '@/stores/edit-modal.js'
  let formEditState = useFormEditStore()

  const props = defineProps({
    formContent: Array
  })

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = '37%'

  let menuSequenceName = ref(props.formContent[0])
  let prefix = ref(props.formContent[1])
  let suffix = ref(props.formContent[2])
  let sequenceSize = ref(props.formContent[3])
  let recycleBy = ref(props.formContent[4])
  let nextValue = ref(props.formContent[5])
  let menu = ref(props.formContent[6])

  let instanceArray = []
  let addMenuData = ref([])

  const fetchMenu = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const api = await Api.get('/menu/get')      
      instanceArray = api.data.data.data
      addMenuData.value = instanceArray
      menu.value = addMenuData.value[0].id
  }

  onBeforeMount(() => {
    fetchMenu()
  })

  const submitEdit = () => {
    formEditState.sequence.sequenceName = menuSequenceName.value
    formEditState.sequence.prefix = prefix.value
    formEditState.sequence.suffix = suffix.value
    formEditState.sequence.sequenceSize = sequenceSize.value
    formEditState.sequence.recycle = recycleBy.value
    formEditState.sequence.nextValue = nextValue.value
    isVisible.value = !isVisible.value
  }

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

  watch(isVisible, () => {
    menuSequenceName.value = props.formContent[0]
    prefix.value = props.formContent[1]
    suffix.value = props.formContent[2]
    sequenceSize.value = props.formContent[3]
    recycleBy.value = props.formContent[4]
    nextValue.value = props.formContent[5]
    menu.value = props.formContent[6]
  })

</script>

<template>
  
    <button @click="isVisible = !isVisible" class="cursor-pointer">
        <img :src="editIcon" class="w-6 h-6" />
    </button>

    <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

          <div class="sticky top-0 z-50 text-white bg-[#015289]">
            <label for="edit-sequence-modal" class="cursor-pointer absolute right-3 top-3">
              <img @click="isVisible = false" :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold mx-4 py-2 text-left">Edit Sequence</p>
          </div>

          <main class="modal-box-inner-inner pt-5">

            <div class="px-8">
    
              <div class="flex gap-2">
    
                <div class="mb-6 flex-1">
                  <label
                    class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                    >Nama<span class="text-red">*</span></label
                  >
                  <input
                    v-model="menuSequenceName"
                    type="text"
                    placeholder="Nama Sequence"
                    :class="inputStylingClass"
                    required
                  />
                </div>
    
                <div class="mb-6 flex-1">
                  <label
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Next Value<span class="text-red">*</span></label
                  >
                  <input
                    v-model="nextValue"
                    type="text"
                    id="name"
                    placeholder="Next Value"
                    :class="inputStylingClass"
                    required
                  />
                </div>
    
              </div>
    
              <div class="flex gap-2">
  
                <div class="mb-6 flex-1">
                  <div class="w-full">
                    <label
                      for="company"
                      class="block mb-2 font-JakartaSans font-medium text-sm"
                      id="company"
                      >Menu<span class="text-red">*</span></label
                    >
                    <select v-model="menu" :class="inputStylingClass" required>
                      <option v-for="data in addMenuData" :key="data.id" :value="data.id">
                        {{ data.menu }}
                      </option>
                    </select>
                  </div>
                </div>
    
                <div class="mb-6 flex-1">
                  <label
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Sequence Size<span class="text-red">*</span></label
                  >
                  <input
                    v-model="sequenceSize"
                    type="text"
                    placeholder="Sequence Size"
                    :class="inputStylingClass"
                    required
                  />
                </div>
              </div>
    
              <div class="flex gap-2">
                
                <div class="mb-6 flex-1">
                  <div class="w-full">
                    
                    <label
                      for="company"
                      class="block mb-2 font-JakartaSans font-medium text-sm"
                      id="company"
                      >Recycle by<span class="text-red">*</span>
                    </label>
                    
                    <select v-model="recycleBy" :class="inputStylingClass" required>
                      <option value="W">Weekly</option>
                      <option value="M">Month</option>
                      <option value="Y">Year</option>
                    </select>
  
                  </div>
                </div>
                
                <div class="mb-6 flex-1">
                  <label
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Prefix<span class="text-red">*</span>
                  </label>
                  <input
                    v-model="prefix"
                    type="text"
                    placeholder="Prefix"
                    :class="inputStylingClass"
                    required
                  />
                </div>
    
              </div>
      
              <div class="flex gap-2">
                
                <div class="mb-6 flex-1">
                  <label
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    >
                    Suffix<span class="text-red">*</span>
                  </label>
                  <input
                    v-model="suffix"
                    type="text"
                    id="name"
                    placeholder="Suffix"
                    :class="inputStylingClass"
                    required
                  />
                </div>
  
                <div class="w-full flex-1">
                </div>
  
              </div>
    
            </div>
            
            <div class="sticky bottom-0 bg-white px-4">
                      <div className="divider m-0 pb-4"></div>
                      <div class="flex justify-end gap-4">
  
                        <label
                        @click="isVisible = false"
                          for="edit-sequence-modal"
                          class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
                          Cancel
                        </label>
  
                        <button>
                          <button @click="submitEdit">
                            <button @click="$emit('changeSequence')" class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                              Save
                            </button>
                          </button>
                        </button>
  
                      </div>
            </div>

          </main>

          <div class="px-4 pb-4">
            <div class="flex flex-col gap-2">
              <h1 class="text-left font-semibold text-sm">Sequence Format Info (Prefix & Suffix)</h1>
              <hr class="border border-black" />
              <!-- place = justify + align -->
              <div class="grid grid-cols-2 gap-2 font-semibold text-xs">
                <div class="justify-self-start">
                  <span>%(year)</span>
                  <span>:</span>
                  <span>Year including century</span>
                </div>
                <div class="justify-self-start">
                  <span>%(year-only)</span>
                  <span>:</span>
                  <span>Year Only</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 font-semibold text-xs">
                <div class="place-self-start">
                  <span>%(month)</span>
                  <span>:</span>
                  <span>Month including century</span>
                </div>
                <div class="place-self-start">
                  <span>%(department)</span>
                  <span>:</span>
                  <span>Department Code</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 font-semibold text-xs">
                <div class="place-self-start">
                  <span>%(company)</span>
                  <span>:</span>
                  <span>Company Code</span>
                </div>
                <div class="place-self-start">
                  <span>%(menu)</span>
                  <span>:</span>
                  <span>Menu Code</span>
                </div>
              </div>
            </div>
          </div>
  

    </Modal>

</template>

<style scoped>

.modal-box-inner-inner {
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  max-height: 420px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.btn:hover {
  background-color: white;
}

</style>
