<script setup>
  import { ref, watch } from 'vue'
  import { Modal } from "usemodal-vue3"
  import Multiselect from '@vueform/multiselect'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"
  
  import { useFormAddStore } from '@/stores/sysconfig/add-modal.js'
  import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
  import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
  import { useMenuAccessStore } from '@/stores/savemenuaccess'
  let formState = useFormAddStore()
  const referenceFetch = useReferenceFetchResult()
  const sysconfigFetch = useSysconfigFetchResult()
  const menuAccessStore = useMenuAccessStore()

  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "10vh"
  const emits = defineEmits(['addUser', 'fetchSiteForCompany'])
  let isLoading = ref(false)
  let isEmployee = ref(false)

  let fullname = ref('')
  let username = ref(['', 0, 0])
  let usernameNonEmployee = ref('')
  let email = ref('')
  let password = ref('')
  let role = ref([])
  let selected = ref()
  let company = ref()
  let location = ref()  
  let idStatusMenu = ref(1)

  let responseRoleArray = ref([])
  let responseCompanyArray = ref([])
  let responseEmployeeArray = ref([])
  let responseAuthoritiesArray = ref([])
  let responseSiteByCompanyIdArray = ref([])
  let statusMenu = ref(null)

  const submitUser = () => {

    console.log(isEmployee.value)
    console.log(username.value)

    isVisible.value = false

    if(isEmployee.value == true) {
      formState.user.username = username.value[0]
    } else {
      formState.user.username = usernameNonEmployee.value
    }

    formState.user.fullname = fullname.value
    formState.user.email = email.value
    formState.user.password = password.value
    formState.user.roleId = role.value[0]
    formState.user.approvalAuthId = selected.value
    formState.user.companyId = company.value
    formState.user.siteId = location.value
    formState.user.idStatusMenu = idStatusMenu.value

    emits('addUser')

  }

  const resetInput = () => {
      email.value = ''
      fullname.value = ''
      username.value = ''
      usernameNonEmployee.value = ''
      password.value = ''
      role.value = []
      selected.value = null
      company.value = null
      location.value = null
  }

  watch(isVisible, () => {
    
    if(isAdding.value == true) {
      isAdding.value = false
    } else {
      resetInput()
    }

    statusMenu.value = sysconfigFetch.fetchMenuStatusResult
    responseRoleArray.value = sysconfigFetch.fetchRoleResult
    responseAuthoritiesArray.value = sysconfigFetch.fetchApproverAuthoritiesResult

    responseCompanyArray.value = referenceFetch.fetchCompanyResult
    responseEmployeeArray.value = referenceFetch.fetchEmployeeResult

    responseEmployeeArray.value.map((item) => {
      item.value = item.id
    })

  })

  watch(isEmployee, () => {
    company.value = username.value[1]    
  })

  watch(username, () => {
    company.value = username.value[1]
  })

  watch(company, () => {
      isLoading.value = true
      menuAccessStore.companyId = company.value
      emits('fetchSiteForCompany')
  })

  watch(menuAccessStore, () => {
    responseSiteByCompanyIdArray.value = menuAccessStore.fetchSiteByCompanyResult
  })

  watch(responseSiteByCompanyIdArray, () => {
    location.value = username.value[2]
    isLoading.value = false
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
          title="New User"
        />

        <form class="pr-4 modal-box-inner-inner" @submit.prevent="submitUser">

                <div class="mb-6">
                  <span>Employee?<span class="text-red-star">*</span></span>
                  <!-- {{ username }}
                  {{ location }} -->
                  <div class="flex gap-2 pt-2">
                    <div class="flex gap-1">
                      <!-- fill the same name attribute for individual select -->
                      <input type="radio" name="employee" v-model="isEmployee" :value="true" class="border border-black w-[26px] h-[26px]" required>
                      <label for="">Yes</label>
                    </div>
                    <div class="flex gap-1">
                      <input type="radio" name="employee" v-model="isEmployee" :value="false" class="border border-black w-[26px] h-[26px]" required>
                      <label for="">No</label>
                    </div>
                  </div>
                </div>
    
                <div class="mb-6">

                    <label for="username" class="block mb-2 font-JakartaSans font-medium text-sm">
                        Username<span class="text-red">*</span>
                    </label>
    
                    <input
                        id="username"
                        v-if="!isEmployee"
                        v-model="usernameNonEmployee"
                        type="text"
                        placeholder="Username"
                        :class="inputStylingClass"
                        required
                    />
    
                    <select id="username" v-if="isEmployee" v-model="username" :class="inputStylingClass">
                      <option v-for="data in responseEmployeeArray" :key="data.id" :value="[data.employee_name, data.id_company, data.id_site]">
                        {{ data.employee_name }}
                      </option>
                    </select>
    
                </div>

                <!-- <Multiselect
                      v-model="username"
                      track-by="employee_name"
                      label="employee_name"
                      placeholder="Choose a programming language"
                      :filter-results="true"
                      :min-chars="1"
                      :searchable="true"
                      :options="responseEmployeeArray"
                    >
                    <template class="overflow-y-scroll" v-slot:tag="{ option, handleTagRemove, disabled }">
                      <div class="multiselect-multiple-label">
                        {{ option.employee_name }}
                      </div>
                    </template>  
                </Multiselect> -->


                <div class="mb-6"></div>
    
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 font-JakartaSans font-medium text-sm">
                    Email<span class="text-red">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="email"
                    type="text"
                    placeholder="Email"
                    :class=inputStylingClass
                    required
                  />
                </div>
    
                <div class="mb-6">
                <label for="password" class="block mb-2 font-JakartaSans font-medium text-sm"
                >
                  Passwords<span class="text-red">*</span>
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Passwords"
                  :class="inputStylingClass"
                  required
                />
                </div>
    
                <div class="mb-6 flex flex-col text-left justify-start">
                  <label
                    for="role"
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                  >
                    User Role<span class="text-red">*</span>
                  </label>
                  <select id="role" :class="inputStylingClass" v-model="role" required>
                    <option v-for="data in responseRoleArray" :key="data.id" :value="[data.id, data.role_name]">
                      {{ data.role_name }}
                    </option>
                  </select>
                </div>

                <div class="mb-3 text-left">
                    <label for="status_menu">Status</label>
                    <select id="status_menu" :class="inputStylingClass" v-model="idStatusMenu">
                        <option v-for="data in statusMenu" :key="data.id" :value="data.code">
                          {{ data.status }}
                        </option>
                    </select>
                </div>
    
                <div v-if="role[1] == 'Driver' " class="mb-6 flex flex-col text-left justify-start">
                  <label
                    for="full_name"
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                   >
                    Full Name<span class="text-red">*</span>
                  </label>
                  <input
                        v-model="fullname"
                        id="full_name"
                        type="text"
                        placeholder="Full Name"
                        :class="inputStylingClass"
                        required
                    />
                </div>
    
                <div class="mb-6">

                  <label
                      for="approval_authorities"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                      Approval Authorities
                  </label>

                  <div class="grid grid-cols-3">

                      <div v-for="name in responseAuthoritiesArray" :key="name.id">

                        <div class="flex items-center gap-2"> 
                          <!-- id="approval_authorities" -->
                            <input 
                              type="checkbox" 
                              :id="name.id" 
                              @click="selected = name.id" 
                              :checked="selected === name.id" 
                            />
                            <label>{{ name.auth_name }}</label>
                        </div>

                      </div>

                  </div>
    
                </div>
    
                <div class="mb-6 flex flex-col gap-2">
                  
                    <label for="company" class="text-sm">Company <span class="text-red-star">*</span></label>

                    <select :disabled="isEmployee" id="company" v-model="company" :class="inputStylingClass">
                      
                      <option v-for="data in responseCompanyArray" :key="data.id" :value="data.id" >
                        {{ data.company_name }}
                      </option>

                    </select>

                </div>
    
                <div v-if="!isLoading" class="mb-6 flex flex-col gap-2">

                    <label for="location" class="text-sm">Location <span class="text-red-star">*</span></label>
                    
                    <select :disabled="isLoading || isEmployee" id="location" v-model="location" :class="inputStylingClass">
                      
                      <option :selected="data.id == location" v-for="data in responseSiteByCompanyIdArray" :key="data.id" :value="data.id" >
                          {{ data.site_name }}
                      </option>

                    </select>

                </div>

                <div v-else>

                  <label for="location" class="text-sm">Location <span class="text-red-star">*</span></label>
                    
                    <select :disabled="isLoading" id="location" :class="inputStylingClass">
                      <option selected>
                          Retrieving location data...
                      </option>
                    </select>

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

.btn:hover {
  background-color: white;
}

/* fix semua modal 500px aja tinggi nya, biar muat di smartphone yang tinggi nya 600px */

.modal-box-inner-inner {
  max-height: 500px !important;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto !important;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

:deep(.modal-vue3-content) {
  max-height: 550px !important;
  overflow-y: auto !important;
}

</style>
