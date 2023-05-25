<script setup>
  import { ref, onBeforeMount, watch } from 'vue'
  import Api from '@/utils/Api'
  import { useFormAddStore } from '@/stores/add-modal.js'

  import modalHeader from "@/components/modal/ModalHeader.vue"
  import modalBody from "@/components/modal/ModalBody.vue"
  import modalFooter from '@/components/modal/ModalFooter.vue'

  let formState = useFormAddStore()

  let fullname = ref('')
  let username = ref('')
  let email = ref('')
  let password = ref('')
  let role = ref([])
  let selected = ref()
  let company = ref()
  let location = ref()

  let isEmployee = ref(false)

  let isOpenModal = ref(false)

  const submitUser = () => {

    // di ujung ada koma ternyata gak ngaruh
    formState.user.fullname = fullname.value
    formState.user.username = username.value
    formState.user.email = email.value
    formState.user.password = password.value
    formState.user.roleId = role.value[0]
    formState.user.approvalAuthId = selected.value
    formState.user.companyId = company.value
    formState.user.siteId = location.value

    isOpenModal.value = !isOpenModal.value

  }

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

  let responseRoleArray = ref([])
  let responseCompanyArray = ref([])
  let responseSiteArray = ref([])
  let responseEmployeeArray = ref([])
  let responseAuthoritiesArray = ref([])

  const fetchRole = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get('/role/get')
    responseRoleArray.value = api.data.data
  }

  const fetchCompany = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get('/company/get')
    responseCompanyArray.value = api.data.data
  }

  const fetchSite = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get('/site')
    responseSiteArray.value = api.data.data
  }

  const fetchEmployee = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get('/employee/get')
    responseEmployeeArray.value = api.data.data
  }

  const fetchAuthorities = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.get('/approval/get_approval_type')
    responseAuthoritiesArray.value = api.data.data
  }

  onBeforeMount(() => {
    fetchRole()
    fetchCompany()
    fetchSite()
    fetchEmployee()
    fetchAuthorities()
  })

  watch(isOpenModal, () => {
        email.value = ''
        fullname.value = ''
        username.value = ''
        password.value = ''
        role.value = []
        selected.value = null
        company.value = null
        location.value = null
  })

</script>

<template>

    <label
      for="add-user-modal"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
      + Add New
    </label>

    <input type="checkbox" id="add-user-modal" class="modal-toggle" v-model="isOpenModal" />
    
    <div class="modal">

      <div class="modal-box relative">

        <modalHeader title="New User" forLabel="add-user-modal" />

        <modalBody>

            <div class="px-8 text-left">
    
              <div class="mb-6">
              <span>Employee?<span class="text-red-star">*</span></span>
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
                  <label class="block mb-2 font-JakartaSans font-medium text-sm">
                          Username<span class="text-red">*</span>
                  </label>
  
                  <input
                      v-if="!isEmployee"
                      v-model="username"
                      type="text"
                      placeholder="Username"
                      :class="inputStylingClass"
                      required
                  />
  
                  <select v-if="isEmployee" v-model="username" :class="inputStylingClass">
                    <option v-for="data in responseEmployeeArray" :key="data.id" :value="data.employee_name">
                      {{ data.employee_name }}
                    </option>
                  </select>
  
              </div>
  
              <div class="mb-6">
                <label
                  class="block mb-2 font-JakartaSans font-medium text-sm">
                  Email<span class="text-red">*</span>
                </label>
                <input
                  v-model="email"
                  type="text"
                  placeholder="Email"
                  :class=inputStylingClass
                  required
                />
              </div>
  
              <div class="mb-6">
              <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Passwords<span class="text-red">*</span></label
              >
              <input
                v-model="password"
                type="password"
                placeholder="Passwords"
                :class="inputStylingClass"
                required
              />
              </div>
  
              <div class="mb-6 flex flex-col text-left justify-start">
                <span
                  for="company"
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  id="company">
                  User Role<span class="text-red">*</span>
                </span>
                <select :class="inputStylingClass" v-model="role" required>
                  <option v-for="data in responseRoleArray" :key="data.id" :value="[data.id, data.role_name]">
                    {{ data.role_name }}
                  </option>
                </select>
              </div>
  
              <div v-if="role[1] == 'Driver' " class="mb-6 flex flex-col text-left justify-start">
                <span
                  for="company"
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  id="company">
                  Full Name<span class="text-red">*</span>
                </span>
                <input
                      v-model="fullname"
                      type="text"
                      placeholder="Full Name"
                      :class="inputStylingClass"
                      required
                  />
              </div>
  
              <div class="mb-6">
                <label
                    for="name"
                    class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                    Approval Authorities<span class="text-red">*</span> 
                </label>
  
                  <!-- ambil value selected nya -->
                  <div class="grid grid-cols-3">
                    <div 
                    v-for="name in responseAuthoritiesArray" 
                    :class="(name.auth_name == 'PM' || name.auth_name == 'Treasury' || name.auth_name == 'Atasan Langsung' || name.auth_name == 'Accounting') && role[1] != 'Admin' ? 'hidden' : '' "
                    :style="name.auth_name == 'GA' && role[1] != 'Super Admin' ? 'display:none' : ''"
                    :key="name.id"
                    >
                    <div class="flex items-center gap-2" 
                      :class="name.auth_name == 'HR' && ( role[1] == 'Admin' || role[1] == 'Super Admin' ) ? 'hidden' : '' " >
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
                  <span class="text-sm">Company <span class="text-red-star">*</span></span>
                  <select v-model="company" :class="inputStylingClass">
                    <option v-for="data in responseCompanyArray" :key="data.id" :value="data.id" >
                      {{ data.company_name }}
                    </option>
                  </select>
              </div>
  
              <div class="mb-6 flex flex-col gap-2">
                  <span class="text-sm">Location <span class="text-red-star">*</span></span>
                  <select v-model="location" :class="inputStylingClass">
                    <option v-for="data in responseSiteArray" :key="data.id" :value="data.id" >
                        {{ data.site_name }}
                    </option>
                  </select>
              </div>
  
            </div>
  
            <modalFooter forLabel="add-user-modal" @add-something="$emit('addUser')" @do-something="submitUser" />
          
        </modalBody>
     
      </div>
      
    </div>

</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.btn:hover {
  background-color: white;
}

.modal-box-inner-user {
  height: 500px;
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

</style>
