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
  let modalPaddingHeight = 50

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
    menuSequenceName = props.formContent[0]
    prefix = props.formContent[1]
    suffix = props.formContent[2]
    sequenceSize = props.formContent[3]
    recycleBy = props.formContent[4]
    nextValue = props.formContent[5]
    menu = props.formContent[6]
  })

</script>

<template>
  
    <button @click="isVisible = !isVisible" class="cursor-pointer">
        <img :src="editIcon" class="w-6 h-6" />
    </button>

    <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

          <div class="sticky left-0 right-0 top-0 z-50 bg-white py-4">
            <label for="edit-sequence-modal" class="cursor-pointer absolute right-0">
              <img @click="isVisible = false" :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">Edit Sequence</p>
            <div className="divider m-0"></div>
          </div>
  
          <div class="modal-box-inner px-4 text-left">
  
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
          
          <div class="sticky left-0 right-0 bottom-0 z-50 bg-white px-4 py-4">
                    <div className="divider m-0 pb-4"></div>
                    <div class="flex justify-end gap-4">
                      <label
                      @click="isVisible = false"
                        for="edit-sequence-modal"
                        class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
                        >
                        Cancel
                      </label>

                      <button @click="submitEdit">
                        <button @click="$emit('changeSequence')" class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                          Save
                        </button>
                      </button>

                    </div>
          </div>
        

    </Modal>

</template>

<style scoped>
.modal-box {
  max-height: calc(100vh - 5em);
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 32rem /* 512px */;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-top-left-radius: var(--rounded-box, 1rem);
  border-top-right-radius: var(--rounded-box, 1rem);
  border-bottom-left-radius: var(--rounded-box, 1rem);
  border-bottom-right-radius: var(--rounded-box, 1rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.modal-box-inner {
  max-height: 1000px;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
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
