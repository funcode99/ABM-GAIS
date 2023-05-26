<script setup>
  import { ref, onBeforeMount, watch } from 'vue'

  import modalHeader from "@/components/modal/add/ModalHeader.vue"
  import modalBody from "@/components/modal/add/ModalBody.vue"
  import modalFooter from '@/components/modal/add/ModalFooter.vue'

  import Api from '@/utils/Api'

  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
  let formState = useFormAddStore()

  let menuSequenceName = ref('')
  let nextValue = ref('')
  let menu = ref('')
  let sequenceSize = ref('')
  let prefix = ref('')
  let recycleBy = ref('W')
  let suffix = ref('')

  let isOpenModal = ref(false)

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

  const submitSequence = () => {
    formState.sequence.sequenceName = menuSequenceName.value
    formState.sequence.recycle = recycleBy.value
    formState.sequence.sequenceSize = sequenceSize.value
    formState.sequence.nextValue = nextValue.value
    formState.sequence.prefix = prefix.value
    formState.sequence.suffix = suffix.value
    isOpenModal.value = !isOpenModal.value
  }

  watch(isOpenModal, () => {
    menuSequenceName.value = ''
    nextValue.value = ''
    menu.value = ''
    sequenceSize.value = ''
    prefix.value = ''
    suffix.value = ''
    recycleBy.value = 'W'
  })

  const rowClass = 'flex justify-between mx-4 items-center gap-3 my-3'
  const columnClass = 'flex flex-col flex-1'
  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'
  // const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'


</script>

<template>
  
    <label
      for="add-user-modal"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >
      + Add New
    </label>

    <input type="checkbox" id="add-user-modal" class="modal-toggle" v-model="isOpenModal" />
    
    <div class="modal">

      <div class="modal-box relative">

        <modalHeader title="New Sequence" forLabel="add-user-modal" />

        <modalBody>

          <div :class="rowClass">
  
            <div :class="columnClass">
            
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm">
                Nama<span class="text-red">*</span>
            </label>
  
            <input
              v-model="menuSequenceName"
              type="text"
              placeholder="Nama Sequence"
              :class="inputStylingClass"
              required
            />
            </div>
  
            <div :class="columnClass">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm">
                Next Value<span class="text-red">*</span>
            </label>
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
  
          <div :class="rowClass">
  
            <div :class="columnClass">
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
  
            <div :class="columnClass">
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
  
          <div :class="rowClass">
            
            <div :class="columnClass">
              <div>
                <label
                  for="company"
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  id="company"
                  >Recycle by<span class="text-red">*</span></label
                >
                <select v-model="recycleBy" :class="inputStylingClass" required>
                  <option value="W">Weekly</option>
                  <option value="M">Month</option>
                  <option value="Y">Year</option>
                </select>
              </div>
            </div>
            
            <div :class="columnClass">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm">
              Prefix<span class="text-red">*</span>
            </label>
            <input
              :class="inputStylingClass"
              v-model="prefix"
              type="text"
              placeholder="Prefix"
              required
            />
            </div>
  
          </div>
  
          <div :class="rowClass">
  
            <div :class="columnClass">
              <label
                class="block mb-2 font-JakartaSans font-medium text-sm">
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
            
          </div>
  
          <modalFooter forLabel="add-user-modal" @add-something="$emit('addSequence')" @do-something="submitSequence" />

        </modalBody>

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

      </div>

    </div>

</template>

<style scoped>

.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

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

.btn:hover {
  background-color: white;
}

</style>
