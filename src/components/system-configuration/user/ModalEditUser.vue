<script setup>
    import { ref, watch, onBeforeMount } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import editIcon from "@/assets/navbar/edit_icon.svg"
    import Api from '@/utils/Api'

    import modalHeader from "@/components/modal/modalHeader.vue"
    import modalFooter from "@/components/modal/modalFooter.vue"

    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    let formEditState = useFormEditStore()

    let isVisible = ref(false)
    let isAdding = ref(false)
    let modalPaddingHeight = '10vh'

    const props = defineProps({
      formContent: Array
    })
    
    let password = ref('')
    let username = ref(props.formContent[0])
    let email = ref(props.formContent[1])
    let selected = ref(props.formContent[2])
    let role = ref([props.formContent[3], null])
    let company = ref(props.formContent[4])
    let location = ref(props.formContent[5])
    let isEmployee = ref(props.formContent[6])
    let fullname = ref(props.formContent[7])

    const submitEdit = () => {

      formEditState.user.username = username.value
      formEditState.user.email = email.value
      formEditState.user.password = password.value
      formEditState.user.roleId = role.value[0]
      formEditState.user.approvalAuthId = selected.value
      formEditState.user.companyId = company.value
      formEditState.user.siteId = location.value
      formEditState.user.fullname = fullname.value

      isVisible.value = false
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
      const api = await Api.get('/site/get_data')
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
      fetchAuthorities()
    })

    const resetInput = () => {
      password.value = ''
      username.value = props.formContent[0]
      email.value = props.formContent[1]
      selected.value = props.formContent[2]
      role.value = [props.formContent[3], null]
      company.value = props.formContent[4]
      location.value = props.formContent[5]
      isEmployee.value = props.formContent[6]
      fullname.value = props.formContent[7]
    }

    watch(isVisible, () => {
      if(isAdding.value == true) {
      isAdding.value = false
      } else {
        resetInput()
      }
    })

</script>

<template>
    
    <button @click="isVisible = !isVisible" class="cursor-pointer">
        <img :src="editIcon" class="w-6 h-6" />
    </button>

    <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

      <main>
        
        <modalHeader
          @closeVisibility="isVisible = false"
          title="Edit User"
        />

        <form class="pr-4 modal-box-inner-inner text-left" @submit.prevent="submitEdit">
  
          <div class="mb-6">
            <span>Employee?<span class="text-red-star">*</span></span>
            <div class="flex gap-2 pt-2">
              <div class="flex gap-1">
                <!-- fill the same name attribute for individual select -->
                <input type="radio" name="employee" v-model="isEmployee" :value="true" class="border border-black w-[26px] h-[26px]" required>
                <label for="">Yes</label>
              </div>
              <div class="flex gap-1">
                <input type="radio" name="employee" v-model="isEmployee" :value="false" class="border border-black w-[26px] h-[26px]">
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
              class="block mb-2 font-JakartaSans font-medium text-sm">
              Passwords<span class="text-red">*</span>
            </label>
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
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >User Role<span class="text-red">*</span>
            </span>
            <select :class="inputStylingClass" v-model="role" required>
              <option v-for="data in responseRoleArray" :key="data.id" :value="[data.id, data.role_name]" :selected="data.id == role[0] ? true : false">
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
                class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                >
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
                  :class="name.auth_name == 'HR' && ( role[1] == 'Admin' || role[1] == 'Super Admin' )  ? 'hidden' : ''" >
                      <input
                      type="checkbox" 
                      :id="name.auth_name" 
                      @click="selected = name.id" 
                      :checked="selected === name.id" 
                      />
                      <label>{{ name.auth_name }}</label>
                  </div>
                </div>
            </div>
            
          </div>
  
          <div class="mb-6 flex flex-col gap-2">
              <span class="text-sm">Company <span class="text-red-star">*</span> </span>
              <select v-model="company" :class="inputStylingClass">
                <option v-for="data in responseCompanyArray" :key="data.id" :value="data.id" :selected="data.id == company ? true : false" >
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
  
          <modalFooter
            @closeEdit="isVisible = false"
          />
  
        </form>

      </main>

    </Modal>

</template>

<style scoped>

:deep(.modal-vue3-content) {
  max-height: 550px !important;
  overflow-y: auto !important;
}

.modal-box-inner-inner {
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  height: 500px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto !important;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>