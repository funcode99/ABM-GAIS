<script setup>
    import { ref, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import editIcon from "@/assets/navbar/edit_icon.svg"

    import modalHeader from "@/components/modal/modalHeader.vue"
    import modalFooter from "@/components/modal/modalFooter.vue"

    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
    import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
    let formEditState = useFormEditStore()
    const referenceFetch = useReferenceFetchResult()
    const sysconfigFetch = useSysconfigFetchResult()

    let isVisible = ref(false)
    let isAdding = ref(false)
    let modalPaddingHeight = '10vh'
    const emits = defineEmits('changeUser')
    const props = defineProps({
      formContent: Array
    })
    
    let password = ref('')
    let username = ref(props.formContent[0])
    let email = ref(props.formContent[1])
    let selected = ref(props.formContent[2])
    let role = ref(props.formContent[3])
    let location = ref([props.formContent[5], props.formContent[4]])
    let isEmployee = ref(props.formContent[6] == 1 ? true : false)
    let fullname = ref(props.formContent[0])
    let usernameEmployee = ref(props.formContent[8])
    let idStatusMenu = ref(props.formContent[9])

    const submitEdit = () => {

      formEditState.user.username = username.value
      formEditState.user.email = email.value
      formEditState.user.password = password.value
      formEditState.user.roleId = role.value
      formEditState.user.approvalAuthId = selected.value
      formEditState.user.companyId = location.value[1]
      formEditState.user.siteId = location.value[0]
      formEditState.user.fullname = fullname.value
      formEditState.user.idStatusMenu = idStatusMenu.value
      emits('changeUser')
      isVisible.value = false

    }

    const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

    let responseRoleArray = ref([])
    let responseSiteArray = ref([])
    let responseEmployeeArray = ref([])
    let responseAuthoritiesArray = ref([])
    let statusMenu = ref(null)

    const resetInput = () => {
      password.value = ''
      username.value = props.formContent[0]
      email.value = props.formContent[1]
      selected.value = props.formContent[2]
      role.value = props.formContent[3]
      location.value = [props.formContent[5], props.formContent[4]]
      isEmployee.value = props.formContent[6] == 1 ? true : false 
      fullname.value = props.formContent[0]
    }

    watch(isVisible, () => {
      
      if(isAdding.value == true) {
      isAdding.value = false
      } else {
        resetInput()
      }

      responseRoleArray.value = sysconfigFetch.fetchRoleResult
      responseAuthoritiesArray.value = sysconfigFetch.fetchApproverAuthoritiesResult
      statusMenu.value = sysconfigFetch.fetchMenuStatusResult
      responseSiteArray.value = referenceFetch.fetchSiteResult
      responseEmployeeArray.value = referenceFetch.fetchEmployeeResult

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

          <!-- {{ props.formContent[6] }} -->
  
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

              <label for="username" class="block mb-2 font-JakartaSans font-medium text-sm">
                  Username<span class="text-red">*</span>
              </label>

              <input
                  id="username"
                  v-if="!isEmployee"
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  :class="inputStylingClass"
                  required
              />
  
              <select v-if="isEmployee" v-model="usernameEmployee" :class="inputStylingClass">
                <option v-for="data in responseEmployeeArray" :key="data.id" :value="data.id">
                  {{ data.employee_name }}
                </option>
              </select>

          </div>
  
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
            
            <label
              for="password"
              class="block mb-2 font-JakartaSans font-medium text-sm">
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

            <label for="user_role"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >User Role<span class="text-red">*</span>
            </label>

            <select id="user_role" :class="inputStylingClass" v-model="role" required>
              <option v-for="data in responseRoleArray" :key="data.id" :value="data.id" :selected="data.id == role[0] ? true : false">
                {{ data.role_name }}
              </option>
            </select>

          </div>

          <div class="mb-6 flex flex-col text-left">
            <label class="block mb-2 font-JakartaSans font-medium text-sm" for="status_menu">
              Status <span class="text-red">*</span>
            </label>
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
                id="full_name"
                v-model="fullname"
                type="text"
                placeholder="Full Name"
                :class="inputStylingClass"
                required
              />
          </div>
  
          <div class="mb-6">

            <label
              for="approval_authorities"
              class="block mb-2 font-JakartaSans font-medium text-sm text-left"
            >
                Approval Authorities
                
            </label>
  
            <!-- :class="(name.auth_name == 'PM' || name.auth_name == 'Treasury' || name.auth_name == 'Atasan Langsung' || name.auth_name == 'Accounting') && role[1] != 'Admin' ? 'hidden' : '' "
                :style="name.auth_name == 'GA' && role[1] != 'Super Admin' ? 'display:none' : ''" -->
            <!-- ambil value selected nya -->

            <div class="grid grid-cols-3">
                <div 
                v-for="name in responseAuthoritiesArray" 
          
                :key="name.id"
                >
                <!-- :class="name.auth_name == 'HR' && ( role[1] == 'Admin' || role[1] == 'Super Admin' )  ? 'hidden' : ''" -->
                <div class="flex items-center gap-2">
                  <input
                    id="approval_authorities"
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
              <label for="company" class="text-sm">Company <span class="text-red-star">*</span> </label>
              <select id="company" v-model="location" :class="inputStylingClass">
                <option v-for="data in responseSiteArray" :key="data.id" :value="[data.id, data.id_company]" :selected="data.id == props.formContent[4] ? true : false">
                  {{ data.company_name }}
                </option>
              </select>
          </div>
  
          <div class="mb-6 flex flex-col gap-2">

            <label for="location" class="text-sm">Location <span class="text-red-star">*</span></label>

            <select disabled id="location" v-model="location" :class="inputStylingClass">
                <option v-for="data in responseSiteArray" :key="data.id" :value="[data.id, data.id_company]" >
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