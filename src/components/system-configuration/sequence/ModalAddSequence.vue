<script setup>
  import { ref, onBeforeMount, watch } from 'vue'
  import iconClose from "@/assets/navbar/icon_close.svg"

  import Api from '@/utils/Api'

  import { useFormAddStore } from '@/stores/add-modal.js'
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

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

  watch(isOpenModal, () => {
    menuSequenceName.value = ''
    nextValue.value = ''
    menu.value = ''
    sequenceSize.value = ''
    prefix.value = ''
    suffix.value = ''
    recycleBy.value = 'W'
  })

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

        <div class="sticky top-0 z-50 bg-white py-4">
          <label for="add-user-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold">New Sequence</p>
          <div className="divider m-0"></div>
        </div>

        <div class="modal-box-inner px-4">

          <div class="flex">

            <div class="mb-6">
            
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

            <div class="flex-1"></div>

            <div class="mb-6">
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

            <div class="mb-6 w-full flex-1">
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
            
            <div class="mb-6">
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
  
          <div class="flex">

            <div class="mb-6">
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

            <div>

            </div>
            
          </div>

        </div>

        <div class="sticky left-0 right-0 bottom-0 z-50 bg-white px-4 py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <label
              for="add-user-modal"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</label
            >
            <button @click="submitSequence">
              <button
                @click="$emit('addSequence')"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
              >
                Save
              </button>
            </button>
          </div>
        </div>

      </div>

    </div>

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
  width: 91.666667%;
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

.btn:hover {
  background-color: white;
}

</style>
