<script setup>
  import editIcon from "@/assets/navbar/edit_icon.svg"

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { ref, watch } from 'vue'
  import { Modal } from 'usemodal-vue3'
  import Multiselect from '@vueform/multiselect'

  import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
  import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
  import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
  let formState = useFormEditStore()
  const referenceFetch = useReferenceFetchResult()
  const sysconfigFetch = useSysconfigFetchResult()

  let idStatusMenu = ref(props.formContent[6] == 'Active' ? 1 : 0)

  let statusMenu = ref(null)
  let menuData = ref(null)
  let companyData = ref(null)

  const emits = defineEmits('changeMenu')

  let isVisible = ref(false)
  let modalPaddingHeight = '10vh'
  const props = defineProps({
    formContent: Array
  })

  const file = ref()
  let menuName = ref(props.formContent[0])
  let url = ref(props.formContent[1])
  let sort = ref(props.formContent[2])
  let filename = ref(props.formContent[3])
  let sequence = ref(props.formContent[9])
  let sequenceCode = ref(props.formContent[7])
  let ParentId = ref(props.formContent[5])

  if(sequence.value == 0) {
    sequence.value = false
  } else {
    sequence.value = true
  }

  let companyIdObject = ref(props.formContent[4])
  let companyIdObjectKeys = ref(Object.values(companyIdObject.value))
  let companyIdArray = ref(null)

  companyIdObjectKeys.value.map((item, index) => {
    if(item == '{') {
      companyIdObjectKeys.value[index] = '['
    } else if (item == '}') {
      companyIdObjectKeys.value[index] = ']'
    }
  })

  companyIdArray.value = JSON.parse(companyIdObjectKeys.value.join(''))

  const updatePhoto = (event) => {
    file.value = event.target.files[0]
    filename.value = event.target.files[0].name
  }

  const submitEdit = () => {

    try {     
        
        if(sequence.value) {
          sequence.value = 1
        } else {
          sequence.value = 0
          sequenceCode.value = null
        }

        // console.log(sequence.value)
        // console.log(sequenceCode.value)
        // console.log(file.value)

        formState.menu.menuName = menuName.value
        formState.menu.sort = sort.value
        formState.menu.sequence = sequenceCode.value
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

  const resetInput = () => {
      menuName.value = props.formContent[0]
      url.value = props.formContent[1]
      sort.value = props.formContent[2]
      filename.value = props.formContent[3]
  }

  watch(isVisible, () => {

    // sequenceCode.value !== null ? sequence.value = true : ''

    resetInput()

    companyData.value = referenceFetch.fetchCompanyResult
    menuData.value = sysconfigFetch.fetchMenuResult
    statusMenu.value = sysconfigFetch.fetchMenuStatusResult

    companyData.value.map((item) => {
      item.value = item.id
    })

  })

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'
</script>

<!-- komponen ini mendapat warisan styling dari komponen parent nya (listMenu) -->
<template class="font-JakartaSans">

    <button @click="isVisible = !isVisible">
        <img :src=editIcon alt="">
    </button>
  
  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">


      <main>

        <modalHeader
          @closeVisibility="isVisible = false"
          title="Edit Menu"
        />
  
        <form @submit.prevent="submitEdit" class="pr-4 modal-box-inner-inner">
  
          <div class="text-left">
    
            <div class="mb-3">
              <label for="menu_name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                  Menu Name<span class="text-red-star">*</span>
              </label>
              <input
                  id="menu_name"
                  :class="inputStylingClass"
                  v-model="menuName" type="text" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required 
              />
            </div>
    
            <div class="mb-3">
              <label for="url" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                  URL<span class="text-red-star">*</span>
              </label>
              <input
                  id="url"
                  :class="inputStylingClass"
                  v-model="url" type="text" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required 
              />
            </div>
    
            <div class="mb-3 flex flex-col">
              <label for="icon" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                  Icon
              </label>
              <input
                    id="icon"
                    :class="inputStylingClass"
                    @change="updatePhoto" type="file" accept="image/*" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" 
                
              />
              <h1 class="text-left">
                    Your current icon = {{ filename }}
              </h1>
            </div>
      
            <div class="mb-3 text-left flex flex-col gap-1">
              <label for="parent_menu">Parent Menu</label>
              <select id="parent_menu" :class="inputStylingClass" v-model="ParentId">
                  <option v-for="data in menuData" :key="data.id" :value="data.id">
                    {{ data.menu }}
                  </option>
              </select>
            </div>
    
            <div class="mb-3 text-left flex flex-col gap-1">
              <label for="status_menu">
                Status <span class="text-red-star">*</span>
              </label>
              <select id="status_menu" :class="inputStylingClass" v-model="idStatusMenu" required>
                    <option v-for="data in statusMenu" :key="data.id" :value="data.code">
                      {{ data.status }}
                    </option>
              </select>
            </div>
    
            <label for="company">
              Company<span class="text-red-star">*</span>
            </label>
            
            <Multiselect
                id="company"
                v-model="companyIdArray"
                mode="tags"
                placeholder="Select companies"
                track-by="company_name"
                label="company_name"
                :close-on-select="false"
                :searchable="true"
                :options="companyData"
                required
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

            <div class="mb-3 text-left flex flex-col gap-1"></div>

    
            <div class="mb-3 text-left flex flex-col gap-1">
              <label for="sort">
                Sort <span class="text-red-star">*</span>
              </label>
              <select id="sort" :class="inputStylingClass" v-model="sort" required>
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
      
            <div class="flex gap-2 mb-2" >
              <input type="checkbox" v-model="sequence">
              <h1>Use Sequence</h1>
            </div>
    
            <div class="mb-3" v-if="sequence">
              
              <label for="sequence_code" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                  Sequence Code<span class="text-red-star">*</span>
              </label>
    
              <input
                  id="sequence_code"
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
