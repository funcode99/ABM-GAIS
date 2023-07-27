<script setup>
    import { ref, watch } from 'vue'
    import { Modal } from 'usemodal-vue3'

    import Api from '@/utils/Api'

    import iconPlus from "@/assets/navbar/icon_plus.svg"
    import deleteicon from "@/assets/navbar/delete_icon.svg"

    import editIcon from "@/assets/navbar/edit_icon.svg"

    import modalHeader from "@/components/modal/modalHeader.vue"
    import modalFooter from "@/components/modal/modalFooter.vue"

    import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'
    import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
    import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
    import { useMenuAccessStore } from '@/stores/savemenuaccess'
    let formEditState = useFormEditStore()
    const referenceFetch = useReferenceFetchResult()
    const sysconfigFetch = useSysconfigFetchResult()
    const menuAccessStore = useMenuAccessStore()

    let isVisible = ref(false)
    let isAdding = ref(false)
    let isLoading = ref(false)
    let fromSelect = ref(false)
    let modalPaddingHeight = '10vh'
    const emits = defineEmits(['changeUser', 'fetchSiteForCompany', 'fetchEmployeeIndividualInfo'])
    const props = defineProps({
      formContent: Array
    })
    
    let password = ref('')
    let username = ref(props.formContent[0])
    let email = ref(props.formContent[1])
    let selected = ref(props.formContent[2])
    let role = ref(props.formContent[3])
    let company = ref(props.formContent[4])
    let location = ref(props.formContent[5])
    let isEmployee = ref(props.formContent[6] == 1 ? true : false)
    let fullname = ref(props.formContent[0])
    let usernameEmployee = ref(props.formContent[8])
    let idStatusMenu = ref(props.formContent[9])

    let responseCompanyArray = ref([])
    let responseEmployeeArray = ref([])

    let responseRoleArray = ref([])
    let responseSiteByCompanyIdArray = ref([])
    let responseAuthoritiesArray = ref([])
    let statusMenu = ref(null)

    let secondaryList = ref([])

  const addField = (arrayList) => {

    arrayList.push({
      responseSiteByCompanyIdArray: []
    })

  }

  const removeField = (arrayList, index) => {
    arrayList.splice(index, 1)
  }

  const fetchIndividualLocation = async (input, index) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/company/get_site/${input.id_company}`)
      secondaryList.value[index].responseSiteByCompanyIdArray = api.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const submitEdit = () => {

    console.log(secondaryList.value)

      formEditState.user.username = username.value
      formEditState.user.email = email.value
      formEditState.user.password = password.value
      formEditState.user.roleId = role.value
      formEditState.user.approvalAuthId = selected.value
      formEditState.user.companyId = company.value
      formEditState.user.siteId = location.value
      formEditState.user.fullname = fullname.value
      formEditState.user.idStatusMenu = idStatusMenu.value
      formEditState.user.secondaryCompany = secondaryList.value
      emits('changeUser')
      isVisible.value = false

  }

  const resetInput = () => {
      password.value = ''
      usernameEmployee.value = props.formContent[8]
      username.value = props.formContent[0]
      email.value = props.formContent[1]
      selected.value = props.formContent[2]
      role.value = props.formContent[3]
      isEmployee.value = props.formContent[6] == 1 ? true : false 
      fullname.value = props.formContent[0]
  }

    watch(isVisible, () => {

      if(isVisible.value === true) {
        company.value = props.formContent[4]
        location.value = props.formContent[5]
      } else {
        // company.value = referenceFetch.fetchIndividualEmployeeResult.id_company
        company.value = 0
        location.value = 0
      }
      
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

    })

    watch(usernameEmployee, () => {
      emits('fetchEmployeeIndividualInfo', usernameEmployee.value)
    })

    watch(secondaryList, () => {
      console.log(secondaryList.value)
    })


    watch(company, () => {
      isLoading.value = true
      menuAccessStore.companyId = company.value
      if(company.value !== 0) {
        emits('fetchSiteForCompany')
      }
    })

    watch(menuAccessStore, () => {
      responseSiteByCompanyIdArray.value = menuAccessStore.fetchSiteByCompanyResult
    })

    watch(responseSiteByCompanyIdArray, () => {
      if(fromSelect.value === false) {
          location.value = props.formContent[5]
      } else {
          location.value = referenceFetch.fetchIndividualEmployeeResult.id_site
      }
      isLoading.value = false
    })

    const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

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
                <input type="radio" name="employee" v-model="isEmployee" :value="true" class="border border-black w-[26px] h-[26px]" disabled>
                <label for="">Yes</label>
              </div>
              <div class="flex gap-1">
                <input type="radio" name="employee" v-model="isEmployee" :value="false" class="border border-black w-[26px] h-[26px]" disabled>
                <label for="">No</label>
              </div>
            </div>
          </div>
  
          <div class="mb-6">

              <label for="username" class="block mb-2 font-JakartaSans font-medium text-sm">
                  Username<span class="text-red">*</span> 
                  <!-- {{ usernameEmployee }} -->
              </label>

              <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  :class="inputStylingClass"
                  required
                  disabled
              />

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
              disabled
            />

          </div>
  
          <div class="mb-6">
            
            <label
              for="password"
              class="block mb-2 font-JakartaSans font-medium text-sm">
              Passwords
            </label>
            <!-- <span class="text-red">*</span> -->

            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Passwords"
              :class="inputStylingClass"
              />
              <!-- required -->

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

            <label class="block mb-2 font-JakartaSans font-medium text-sm text-left" for="approval_authorities">
                Approval Authorities
            </label>

            <div class="grid grid-cols-3">
                <div v-for="name in responseAuthoritiesArray" :key="name.id">
                  <div class="flex items-center gap-2">
                    <!-- id="approval_authorities" -->
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
  
          <!-- Company -->
          <div class="mb-6 flex flex-col gap-2">
              
            <label for="company" class="text-sm">
              Company<span class="text-red-star">*</span> 
            </label>

            <!-- {{ company }} -->
              
            <select :disabled="isEmployee" id="company" v-model="company" :class="inputStylingClass">
                <option 
                  :selected="data.id == props.formContent[4] ? true : false"
                  v-for="data in responseCompanyArray" 
                  :key="data.id" 
                  :value="data.id" 
                >
                  {{ data.company_name }}
                </option>
            </select>

          </div>

          <!-- Location -->
          <div v-if="!isLoading" class="mb-6 flex flex-col gap-2">

              <label for="location" class="text-sm">
                Location <span class="text-red-star">*</span> 
              </label>

              <!-- {{ location }} -->

              <select :disabled="isLoading || isEmployee" id="location" v-model="location" :class="inputStylingClass">
                
                <option v-for="data in responseSiteByCompanyIdArray" :key="data.id" :value="data.id" >
                    {{ data.site_name }}
                </option>

              </select>

          </div>

          <div v-else class="flex flex-col gap-2">

              <label for="location" class="text-sm">
                Location <span class="text-red-star">*</span> 
              </label>

              <select :disabled="isLoading" id="location" :class="inputStylingClass">
                <option selected>
                    Retrieving location data...
                </option>
              </select>

          </div>

          <!-- Secondary Company Location -->
          <div>

            <span class="text-sm">
              Secondary company location<span class="text-red-star">*</span> 
            </span>

            <table class="table table-zebra table-compact border w-full rounded-lg">
                
                <thead>
                  <tr class="text-center">
                    <th>
                      <span>No</span>
                    </th>
                    <th>
                      <span>Company</span>
                    </th>
                    <th>
                      <span>Location</span>
                    </th>
                    <th>
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-[#F5F5F5]">
                  
                  <tr class="text-center" v-for="(input, index) in secondaryList" :key="`${index}`">

                    <td>
                      {{ index+1 }}
                    </td>

                    <td>
                      
                      <select 
                        :class="inputStylingClass"
                        v-model="input.id_company"
                        @change="fetchIndividualLocation(input, index)"
                      >

                        <option 
                          v-for="data in responseCompanyArray"
                          :key="data.id"
                          :value="data.id"                        
                        >
                            {{ data.company_name }}
                        </option>

                      </select>

                    </td>

                    <td>
                      
                      <select     
                        :class="inputStylingClass"
                        v-model="input.id_site"
                      >

                        <option 
                          v-for="data in input.responseSiteByCompanyIdArray"
                          :key="data.id"
                          :value="data.id"
                        >
                            {{ data.site_name }}
                        </option>

                      </select>

                    </td>

                    <td class="flex flex-wrap gap-4 justify-center">
                      
                      <button type="button" @click="removeField(secondaryList, index)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>

                    </td>

                  </tr>

                  <tr>

                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="flex justify-center">
                        <img @click="addField(secondaryList)" class="cursor-pointer" :src="iconPlus" alt="">
                    </td>

                  </tr>

                </tbody>

            </table>

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