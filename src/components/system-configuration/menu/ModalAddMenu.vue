<script setup>
  // cuma gara2 lupa import ref sidebar gua error terus anjing
  import { ref, watch } from 'vue'

  import { Modal } from "usemodal-vue3"

  import Multiselect from '@vueform/multiselect'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
  import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
  import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
  let formState = useFormAddStore()
  const referenceFetch = useReferenceFetchResult()
  const sysconfigFetch = useSysconfigFetchResult()

  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "10vh"
  const emits = defineEmits('addMenu')

  let menuName = ref('')
  let url = ref('')
  let idStatusMenu = ref(0)
  let ParentId = ref(null)
  let sort = ref(1)
  let sequence = ref(false)
  let sequenceCode = ref('')
  const file = ref({})
  let companyIdArray = ref(null)


  let menuData = ref([])
  let companyData = ref(null)
  let statusMenu = ref(null)

  const updatePhoto = (event) => {
    file.value = event.target.files[0]
  }

  const submit = () => {

    try {     
      
        if(sequence) {
          sequence.value = 1
        } else {
          sequence.value = 0
        }

        formState.menu.menuName = menuName.value
        formState.menu.sort = sort.value
        formState.menu.sequence = sequence.value
        formState.menu.sequenceCode = sequenceCode.value
        formState.menu.url = url.value
        formState.menu.icon = file.value
        formState.menu.companyId = companyIdArray.value

        // active / disable only value
        formState.menu.idStatusMenu = idStatusMenu.value
        formState.menu.parentId = ParentId.value

        emits('addMenu')
        isVisible.value = false

    } catch (error) {
        console.error(error)
    }

  }

  const resetInput = () => {
      menuName.value = ''
      url.value = ''
      idStatusMenu.value = 0
      ParentId.value = null
      sort.value = 1
      sequence.value = false
      sequenceCode.value = ''
      file.value = {}
      companyIdArray.value = []
  }

  watch(isVisible, () => {
    
    if(isAdding.value == true) {
      isAdding.value = false
    } else {
      resetInput()
    }

    companyData.value = referenceFetch.fetchCompanyResult
    menuData.value = sysconfigFetch.fetchMenuResult
    statusMenu.value = sysconfigFetch.fetchMenuStatusResult

  })

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

</script>

<template>

        <button 
          @click="isVisible = true" 
          class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add New
        </button>
    
        <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

            <main>

              <modalHeader
                @closeVisibility="isVisible = false"
                title="New Menu"
              />

              <form class="pr-4 modal-box-inner-inner" @submit.prevent="submit">

                  <div class="mb-3">
                    <label for="menu_name" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                      Menu Name<span class="text-red-star">*</span>
                    </label>
                    <input
                    :class="inputStylingClass"
                    v-model="menuName" type="text" id="menu_name" placeholder="Nama Menu" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
                  </div>
        
                  <div class="mb-3">
                    <label for="url" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                      URL<span class="text-red-star">*</span>
                    </label>
                    <input
                    :class="inputStylingClass"
                    v-model="url" id="url" type="text" placeholder="URL" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
                  </div>
        
                  <div class="mb-3">
                    <label for="icon" class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                      Icon<span class="text-red-star">*</span>
                    </label>
                    <input
                    :class="inputStylingClass"
                    @change="updatePhoto" id="icon" type="file" accept="image/*" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
                  </div>
        
                  <div class="mb-3 text-left">
                      <label for="parent_menu">Parent Menu</label>
                      <select id="parent_menu" :class="inputStylingClass" v-model="ParentId" required>
                          <option v-for="data in menuData" :key="data.id" :value="data.id">
                            {{ data.menu }}
                          </option>
                      </select>
                  </div>
        
                  <div class="mb-3 text-left">
                    <label for="status_menu">Status</label>
                    <select id="status_menu" :class="inputStylingClass" v-model="idStatusMenu" required>
                        <option v-for="data in statusMenu" :key="data.id" :value="data.code">
                          {{ data.status }}
                        </option>
                    </select>
                  </div>

                  <label for="company">Company</label>
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

                  <div class="mb-3"></div>
        
                  <div class="mb-3 text-left">
                      <label for="sort">Sort</label>
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
        
                  <div class="flex gap-2 mb-3">
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

                  <modalFooter
                    class="mt-6 pt-5"
                    @closeEdit="isVisible = false"
                  />

              </form>

            </main>

        </Modal>

</template>

<style scoped>

.modal-box-inner-inner {
  max-height: 500px !important;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

:deep(.modal-vue3-content) {
  max-height: 550px !important;
  overflow-y: auto !important;
}

.multiselect-tag.is-user {
  padding: 5px 8px;
  border-radius: 22px;
  background: #35495e;
  margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;;
}

.user-image {
  margin: 0 6px 0 0;
  border-radius: 50%;
  height: 22px;
}

</style>

<style src="@vueform/multiselect/themes/default.css"></style>