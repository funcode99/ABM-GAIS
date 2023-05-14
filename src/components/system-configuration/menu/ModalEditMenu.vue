<script setup>
  import iconClose from "@/assets/navbar/icon_close.svg";
  import editIcon from "@/assets/navbar/edit_icon.svg";

  import { ref, onBeforeMount } from 'vue'
  import { Modal } from 'usemodal-vue3'
  import Api from '@/utils/Api'

  import { useFormEditStore } from '@/stores/edit-modal.js'

  let formState = useFormEditStore()

  const updatePhoto = (event) => {
  file.value = event.target.files[0]
}

  const submitEdit = () => {
    try {     
        
        if(sequence) {
          sequence.value = 1
        } else {
          sequence.value = 0
        }

        formState.menu.menuName = menuName.value
        formState.menu.sort = sort.value
        formState.menu.sequence = sequence.value
        formState.menu.url = url.value
        formState.menu.icon = file.value

    } catch (error) {
        console.error(error)
    }

}

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = 50

  const props = defineProps({
    formContent: Array
  })

  onBeforeMount(() => {
    getMenuStatus()
  })

  const getMenuStatus = async () => {
      const status = await Api.get('/menu/get_status/status')
      let getStatus = status.data.data
      statusMenu.value = getStatus
  }

let menuName = ref(props.formContent[0])
let url = ref(props.formContent[1])
let idStatusMenu = ref('Active')
let sort = ref(1)
let sequence = ref(true)
let statusMenu = ref(null)
const file = ref({})

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<!-- komponen ini mendapat warisan styling dari komponen parent nya (listMenu) -->
<template class="font-JakartaSans">

  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="">
  </button>
      
  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <div class="px-8">
      <div class="sticky top-0 z-50 bg-white py-4">
            <button @click="isVisible = false" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </button>
            <p class="font-JakartaSans text-2xl font-semibold">Edit Menu</p>
            <div className="divider m-0"></div>
      </div>
  
      <div class="mb-3 modal-box-inner px-4">
        
        <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              Menu Name<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            v-model="menuName" type="text" id="name" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
        </div>

        <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              URL<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            v-model="url" type="text" id="name" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
        </div>

          <div class="mb-3">
            <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
              Icon<span class="text-red-star">*</span>
            </label>
            <input
            :class="inputStylingClass"
            @change="updatePhoto" type="file" accept="image/*" id="name" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
          </div>
  
        <div class="mb-3 text-left">
            <h1>Parent Menu</h1>
            <select :class="inputStylingClass">
                <option selected hidden disabled value="">Travel Management System</option>
                <option value="">Option A</option>
            </select>
        </div>
  
        <div class="mb-3 text-left">
              <h1>Status</h1>
              <select :class="inputStylingClass" v-model="idStatusMenu">
                  <option v-for="data in statusMenu" :key="data.code">
                    {{ data.status }}
                  </option>
              </select>
          </div>

        <div class="mb-3 text-left">
              <h1>Sort</h1>
              <select :class="inputStylingClass" v-model="sort">
                  <option>1</option>
                  <option>2</option>
              </select>
        </div>
  
        <div class="flex gap-2 mb-2">
              <input type="checkbox" v-model="sequence">
              <h1>Use Sequence</h1>
              <h1>{{ sequence }}</h1>
          </div>
  
      </div>
  

      <div class="sticky bottom-0 bg-white py-8">
          <div className="divider m-0 pb-4 w-full"></div>
          <div class="flex justify-end gap-4">
            <label @click="isVisible = !isVisible" class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
              Cancel
            </label>
            <button @click="submitEdit">
              <button 
              @click="$emit('changeMenu')"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
              >
                Save
              </button>
            </button>
          </div>
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

 .height {
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 4px 8px;
}
</style>
