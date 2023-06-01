<script setup>
  import editIcon from "@/assets/navbar/edit_icon.svg"

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { ref, onBeforeMount, watch } from 'vue'
  import { Modal } from 'usemodal-vue3'
  import Api from '@/utils/Api'
  import Multiselect from '@vueform/multiselect'

  import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'

  let formState = useFormEditStore()

  let statusMenu = ref(null)
  let idStatusMenu = ref(props.formContent[6] == 'Active' ? 1 : 0)
  let menuData = ref(null)

  const emits = defineEmits('changeMenu')

  const updatePhoto = (event) => {
    file.value = event.target.files[0]
    filename.value = event.target.files[0].name
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
        formState.menu.idStatusMenu = idStatusMenu.value
        formState.menu.companyId = companyIdArray.value
        formState.menu.parentId = ParentId.value

        emits('changeMenu')

    } catch (error) {
        console.error(error)
    }
    isVisible.value = !isVisible.value

  }

  onBeforeMount(() => {
    getMenuStatus()
    fetchCompany()
  })

  const getMenuStatus = async () => {
      const status = await Api.get('/menu/get_status/status')
      let getStatus = status.data.data
      statusMenu.value = getStatus
  }

  let isVisible = ref(false)
  let modalPaddingHeight = '25vh'

  const props = defineProps({
    formContent: Array
  })

  let menuName = ref(props.formContent[0])
  let url = ref(props.formContent[1])
  let sort = ref(props.formContent[2])
  let filename = ref(props.formContent[3])
  const file = ref()
  let sequence = ref(false)
  let sequenceCode = ref('')
  let ParentId = ref(props.formContent[5])

  let companyIdObject = ref(props.formContent[4])
  let companyIdObjectKeys = ref(Object.values(companyIdObject.value))
  let companyIdArray = ref(null)
  let companyData = ref(null)

  companyIdObjectKeys.value.map((item, index) => {
    if(item == '{') {
      companyIdObjectKeys.value[index] = '['
    } else if (item == '}') {
      companyIdObjectKeys.value[index] = ']'
    }
  })

  companyIdArray.value = JSON.parse(companyIdObjectKeys.value.join(''))

  const fetchCompany = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get("/company/get");
    companyData = res.data.data
    companyData.map((item) => {
      item.value = item.id
    })
  }

  const fetchMenuData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/menu/get/')
        menuData.value = api.data.data.data
      } catch (error) {
        console.log(error)
        // status.value = error.response.status
        // message.value = error.response.data.message
      }
  }

  const resetInput = () => {
      menuName.value = props.formContent[0]
      url.value = props.formContent[1]
      sort.value = props.formContent[2]
      filename.value = props.formContent[3]
  }

  watch(isVisible, () => {
    fetchCompany()
    fetchMenuData()
    resetInput()
  })

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<!-- komponen ini mendapat warisan styling dari komponen parent nya (listMenu) -->
<template class="font-JakartaSans">

    <button @click="isVisible = !isVisible">
        <img :src=editIcon alt="">
    </button>
  
  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

      <!-- {{ companyIdObject }}
      {{ companyIdObjectKeys }} -->

      <main>

        <modalHeader
          @closeVisibility="isVisible = false"
          title="Edit Menu"
        />
  
        <form @submit.prevent="submitEdit" class="pr-4 modal-box-inner-inner">
  
          <div class="text-left">
    
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
    
                <div class="flex flex-col">
    
                  <input
                  :class="inputStylingClass"
                  @change="updatePhoto" type="file" accept="image/*" id="name" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
      
                  <h1 class="text-left">
                    Your current icon = {{ filename }}
                  </h1>
    
                </div>
    
            </div>
      
            <div class="mb-3 text-left">
                <h1>Parent Menu</h1>
                <select :class="inputStylingClass" v-model="ParentId">
                  <option v-for="data in menuData" :key="data.id" :value="data.id">
                    {{ data.menu }}
                  </option>
                </select>
            </div>
    
            <div class="mb-3 text-left">
                <h1>Status</h1>
                <select :class="inputStylingClass" v-model="idStatusMenu">
                    <option v-for="data in statusMenu" :key="data.id" :value="data.code">
                      {{ data.status }}
                    </option>
                </select>
            </div>
    
            <div class="mb-3 text-left"></div>
                  
                  <h1>Company</h1>
                  <Multiselect
                    v-model="companyIdArray"
                    mode="tags"
                    placeholder="Select companies"
                    track-by="company_name"
                    label="company_name"
                    :close-on-select="false"
                    :searchable="true"
                    :options="companyData"
                    >
                    
                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                      <div
                        class="multiselect-tag is-user"
                        :class="{
                          'is-disabled': disabled
                        }"
                      >
                        {{ option.company_name }}
                        <span
                          v-if="!disabled"
                          class="multiselect-tag-remove"
                          @click="handleTagRemove(option, $event)"
                        >
                          <span class="multiselect-tag-remove-icon"></span>
                        </span>
                      </div>
                    </template>

                  </Multiselect>

            <div class="mb-3"></div>
    
            <div class="mb-3 text-left">
                  <h1>Sort</h1>
                  <select :class="inputStylingClass" v-model="sort">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                  </select>
            </div>
      
            <div class="flex gap-2 mb-2">
                  <input type="checkbox" v-model="sequence">
                  <h1>Use Sequence</h1>
            </div>
    
            <div class="mb-3" v-if="sequence">
              
              <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                    Sequence Code<span class="text-red-star">*</span>
              </label>
    
              <input
                  :class="inputStylingClass"
                  v-model="sequenceCode" 
                  type="text"
                  maxlength="5" 
                  placeholder="Sequence Code" 
                  class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" 
              />
    
            </div>
      
          </div>
  
          <modalFooter
            class="mt-6 pt-5"
            @closeEdit="isVisible = false"
          />
  
        </form>
        
      </main>

  </Modal>
  
</template>

<style scoped>

:deep(.modal-vue3-content) {
  max-height: 550px !important;
}

.modal-box-inner-inner {
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  height: 500px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

</style>
