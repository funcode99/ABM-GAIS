<script setup>
  // cuma gara2 lupa import ref sidebar gua error terus anjing
  import { ref, onBeforeMount, watch } from 'vue'

  import { Modal } from "usemodal-vue3"
  import Api from '@/utils/Api'

  import Multiselect from '@vueform/multiselect'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
  let formState = useFormAddStore()

  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "25vh"
  const emits = defineEmits('addMenu')

  let menuName = ref('')
  let url = ref('')
  let idStatusMenu = ref(0)
  let ParentId = ref(null)
  let sort = ref(1)
  let sequence = ref(false)
  let sequenceCode = ref('')
  const file = ref({})
  let menuData = ref([])

  // buat ngisi dropdown status
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

  onBeforeMount(() => {
    fetchCompany()
    fetchMenuData()
    getMenuStatus()
  })

  const getMenuStatus = async () => {
        const status = await Api.get('/menu/get_status/status')
        let getStatus = status.data.data
        statusMenu.value = getStatus
  }

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

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

    fetchMenuData()

  })

  let companyData = ref(null)
  let companyIdArray = ref(null)
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
                    v-model="url" type="text" id="name" placeholder="URL" class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base" required />
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
        
                  <div class="flex gap-2 mb-3">
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