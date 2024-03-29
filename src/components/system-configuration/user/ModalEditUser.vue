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
    let roleCode = ref(props.formContent[12])
    let company = ref(props.formContent[4])
    let location = ref(props.formContent[5])
    let isEmployee = ref(props.formContent[6] == 1 ? true : false)
    let fullname = ref(props.formContent[0])
    let usernameEmployee = ref(props.formContent[8])
    let idStatusMenu = ref(props.formContent[9])
    let isApprover = ref(props.formContent[11] == 1 ? true : false)

    let responseCompanyArray = ref([])
    let responseEmployeeArray = ref([])

    let responseRoleArray = ref([])
    let responseSiteByCompanyIdArray = ref([])
    let responseAuthoritiesArray = ref([])
    let statusMenu = ref(null)

    let secondaryList = ref([])

  const addField = (arrayList) => {

    arrayList.push({
      responseSiteByCompanyIdArray: [],
      is_approver: 0,
      is_approver_checkbox: false,
    })

  }

  const removeField = async (arrayList, index, id) => {

    if(id === undefined) {
      arrayList.splice(index, 1)
    } else {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/site/delete_user_site/${id}`)
      arrayList.splice(index, 1)
    }

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

      formEditState.user.username = username.value
      formEditState.user.email = email.value
      formEditState.user.password = password.value
      formEditState.user.roleId = role.value
      formEditState.user.approvalAuthId = selected.value
      formEditState.user.companyId = company.value
      formEditState.user.siteId = location.value
      formEditState.user.fullname = fullname.value
      formEditState.user.idStatusMenu = idStatusMenu.value
      formEditState.user.isApprover = isApprover.value
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
      isApprover.value = props.formContent[11] == 1 ? true : false 
  }



  const fetchSecondaryTable = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get(`/site/get_user_site/${props.formContent[10]}`)
      secondaryList.value = api.data.data
      secondaryList.value.map((item, index) => {
        fetchIndividualLocation(item, index)
      })
  }

  const handleRoleChange = () => {
      const selectedData = responseRoleArray.value.find(data => data.id === role.value);
      
      if (selectedData) {
        roleCode.value = selectedData.code_role
      }
  }

    watch(isVisible, () => {

      fetchSecondaryTable()

      if(isVisible.value === true) {
        company.value = props.formContent[4]
        location.value = props.formContent[5]
      } else {
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
  
          <div class="w-[519px] h-[71px] flex-col justify-start items-start gap-1 inline-flex">
            <div class="self-stretch"><span class="text-black text-sm font-medium">Employee?</span><span class="text-red-star text-sm font-medium">*</span></div>
            <div class="w-[519px] justify-start items-start inline-flex">
              <div class="w-[98px] h-[49px] relative bg-white">
                <input
                  type="radio"
                  name="employee"
                  v-model="isEmployee"
                  :value="true"
                  class="w-[26px] h-[26px] left-[12px] top-[11px] absolute bg-cyan-700 rounded-full"
                  disabled
                >
                <div class="left-[54px] top-[17px] absolute text-black text-xs font-medium">Yes</div>
              </div>
              <div class="w-[421px] h-[49px] pl-3 pr-[350px] pt-[11px] pb-3 bg-white justify-start items-center gap-4 inline-flex">
                <input
                  type="radio"
                  name="employee"
                  v-model="isEmployee"
                  :value="false"
                  class="w-[26px] h-[26px] rounded-full border border-black"
                  disabled
                >
                <div class="text-black text-xs font-medium">No</div>
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

            <select id="user_role" :class="inputStylingClass" v-model="role" required @change="handleRoleChange">
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
              
            <select 
              :class="inputStylingClass"
              :disabled="isEmployee" 
              id="company" 
              v-model="company" 
            >
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
          <div v-if="roleCode === 'SUPADM'">
            <div class="flex items-center gap-2 mb-6">
              <input
                type="checkbox" 
                id="is_approver"
                v-model="isApprover"
              />
              <label>Is Approver</label>
            </div>

            <span class="text-sm">
              Secondary Company Location<span class="text-red-star">*</span> 
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
                      <span>Is Approver</span>
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

                    <td>
                      <input class="h-6 w-6" type="checkbox"  v-model="input.is_approver_checkbox" :value="input.is_approver_checkbox === false ? input.is_approver = 0 : input.is_approver = 1" />
                    </td>

                    <td class="flex flex-wrap gap-4 justify-center">
                      
                      <button type="button" @click="removeField(secondaryList, index, input.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>

                    </td>

                  </tr>

                  <tr>

                    <td></td>
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

          <div v-if="roleCode === 'SCTR'">
            <span class="text-sm">
              Chief
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
                      <span>Name</span>
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
                      
                      <button type="button" @click="removeField(secondaryList, index, input.id)">
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