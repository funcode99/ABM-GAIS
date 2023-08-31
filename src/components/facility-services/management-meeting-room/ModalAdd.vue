<script setup>
import iconClose from "@/assets/navbar/icon_close.svg"
import iconPlus from "@/assets/navbar/icon_plus.svg"
import { ref, watchEffect, onMounted, computed, reactive } from "vue"
import Api from "@/utils/Api"
import Swal from "sweetalert2"
import Multiselect from "@vueform/multiselect"

import FacilityService from "@/utils/Api/reference/facility.js"
import { fetchSiteByUseID } from "@/utils/Api/reference/site.js"
import storageHelper from "@/utils/storage.helper.js"

const props = defineProps({
  status: String,
  id: Number,
})

const emits = defineEmits(["close"])
const id_role = JSON.parse(localStorage.getItem("id_role"))

const listStatus = [
  { id: 1, title: "Available" },
  { id: 2, title: "Unavailable" },
]

let listEmployee = ref([])
let detailEmployee = ref([])
let listCompany = ref([])
let listSite = ref([])
let dataArr = ref([])

let type = ref(props.status)
let idItem = ref(props.id)
let isLoading = ref(false)

let id_company = ref("")
let id_site = ref("")
let code_meeting_room = ref("")
let floor = ref("")
let available_status = ref("")
let name_meeting_room = ref("")
let capacity = ref("")
let facility = ref([])
let approver = ref([])
let is_approval = ref(false)
let err_messages = ref("")
let selectSite = ref(true)
const userSites = ref([])
const references = reactive({
  facility: [],
})

const rowClass = "grid grid-cols-2 px-6 items-center gap-2"
const colClass = "mb-6 w-full"
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

// FETCH DATA
const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get("company/get")
  listCompany.value = api.data.data
}

const fetchCompanyID = async (id_comp) => {
  fetchSite(id_comp)
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/company/get/${id_comp}`)
  listCompany.value = res.data.data
  id_company.value = id_comp
}

const fetchSite = async (id_comp) => {
  let idComp = id_comp ? id_comp : id_company.value
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get(`site/get_by_company/${idComp}`)
  listSite.value = api.data.data
  selectSite.value = false
  for (let index = 0; index < api.data.data.length; index++) {
    const element = api.data.data[index]
    if (type.value == "add") {
      if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
        id_site.value = element.id
      }
    } else {
      if (id_site.value === element.id) {
        id_site.value = element.id
      }
    }
  }
  if (id_role == "ADM") {
    listSite.value = listSite.value.filter(
      (e) => e.id == localStorage.getItem("id_site")
    )
  }
}

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`master_meeting_room/get/${id}`)
  dataArr.value = res.data.data[0]
  code_meeting_room.value = dataArr.value.code_meeting_room
  id_company.value = dataArr.value.id_company
  id_site.value = dataArr.value.id_site
  floor.value = dataArr.value.floor
  name_meeting_room.value = dataArr.value.name_meeting_room
  available_status.value = dataArr.value.available_status
  capacity.value = dataArr.value.capacity
  facility.value = dataArr.value.facility.map(({ id }) => id)
  is_approval.value = dataArr.value.is_approval
  approver.value = dataArr.value.approver
  fetchSite(id_company.value)
}

const fetchEmployee = async (query) => {
  let payload = {
    search: query,
    filterRole: 91, //secretary
  }
  isLoading.value = true
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  await Api.get(`users/${id_site.value}`, {
    params: payload,
  }).then((res) => {
    listEmployee.value = res.data.data
    isLoading.value = false
  })
}
// END

const generateNumber = async () => {
  code_meeting_room.value = Math.floor(100000000 + Math.random() * 900000000)
}

const saveForm = async () => {
  const payload = {
    id_company: id_company.value,
    id_site: id_site.value,
    name_meeting_room: name_meeting_room.value,
    capacity: capacity.value,
    floor: floor.value,
    available_status: available_status.value,
    facility: facility.value,
    is_approval: is_approval.value,
    approver: is_approval.value ? approver.value : [""],
  }
  if (type.value == "add") {
    save(payload)
  } else if (type.value == "edit") {
    edit(payload)
  }
}

const edit = async (payload) => {
  Api.post(`master_meeting_room/update_data/${idItem.value}`, payload)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      })
      close()
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.error,
        showConfirmButton: false,
        timer: 1500,
      })
    })
}

const save = async (payload) => {
  // console.log(payload)
  Api.post("master_meeting_room/store/", payload)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      })
      close()
    })
    .catch((error) => {
      Object.keys(error.response.data.error).forEach(function (key, index) {
        err_messages.value += error.response.data.error[key] + "\n"
      })
      Swal.fire({
        position: "center",
        icon: "error",
        title: err_messages.value,
        showConfirmButton: false,
        timer: 1500,
      })
    })
}

const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"))
  id_role === "ADMTR" ? fetchCompany() : fetchCompanyID(id_company)
}

const fetchSitesByUserId = async () => {
  const token = localStorage.getItem("token")
  const decodeToken = storageHelper.decodeToken(token)
  const userId = decodeToken?.users?.id

  const res = await fetchSiteByUseID(userId)

  userSites.value = res?.data || []
}

const filteredSites = computed(() => {
  const primarySite = JSON.parse(localStorage.getItem("id_site"))
  const userSitesIds = [
    ...userSites.value.map(({ id_site }) => id_site),
    primarySite,
  ]

  return listSite.value?.filter(({ id }) => userSitesIds.includes(id))
})

onMounted(async () => {
  fetchEmployee()
  fetchCondition()

  await fetchSitesByUserId()

  references.facility = await FacilityService.list()

  if (type.value == "edit" && idItem.value != 0) {
    fetchDataById(idItem.value)
  }
})

const close = () => {
  code_meeting_room.value = ""
  id_company.value = ""
  id_site.value = ""
  name_meeting_room.value = ""
  capacity.value = ""
  floor.value = ""
  available_status.value = ""
  emits("close")
}

watchEffect(() => {
  listEmployee.value.map((item) => {
    item.value = parseInt(item.id)
  })
})
</script>

<template>
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5 rounded-t-2xl">
      <nav class="sticky top-0 z-50 bg-[#015289] rounded-t-2xl">
        <label
          @click="close"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2"
        >
          Meeting Room
        </p>
      </nav>
      <form @submit.prevent="saveForm()">
        <main class="modal-box-inner pb-4 lg:pb-16">
          <div :class="rowClass">
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <select
                v-model="id_company"
                id="id_company"
                :class="inputClass"
                @change="fetchSite()"
                required
              >
                <option disabled selected>Company</option>
                <option
                  v-for="data in listCompany"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.company_code }} - {{ data.company_name }}
                </option>
              </select>
            </div>
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Site<span class="text-red">*</span></label
              >
              <select
                v-model="id_site"
                id="id_site"
                :class="inputClass"
                :disabled="selectSite"
                required
              >
                <option disabled selected>Site</option>
                <option
                  v-for="data in filteredSites"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.site_code }} - {{ data.site_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mx-3">
            <p class="font-JakartaSans font-medium text-sm pb-2">
              Details Item
            </p>
            <hr class="h-px bg-[#8B8B8B] border-0 mb-4" />
          </div>

          <div :class="rowClass">
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Meeting Room Name<span class="text-red">*</span></label
              >
              <input
                v-model="name_meeting_room"
                type="text"
                name="remarks"
                :class="inputClass"
                placeholder="Meeting Room Name"
                required
              />
            </div>
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Floor</label
              >
              <input
                v-model="floor"
                type="number"
                name="floor"
                :class="inputClass"
                placeholder="Floor"
              />
            </div>
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Capacity<span class="text-red">*</span></label
              >
              <input
                v-model="capacity"
                type="number"
                name="capacity"
                :class="inputClass"
                placeholder="Capacity"
                required
              />
            </div>
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Available Status<span class="text-red">*</span></label
              >
              <select v-model="available_status" :class="inputClass" required>
                <option disabled selected>Status</option>
                <option
                  v-for="data in listStatus"
                  :key="data.id"
                  :value="data.title"
                >
                  {{ data.title }}
                </option>
              </select>
            </div>
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Approval<span class="text-red">*</span></label
              >
              <input
                type="checkbox"
                class="toggle toggle-primary"
                v-model="is_approval"
              />
            </div>
            <div :class="colClass" v-if="is_approval">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Approver</label
              >
              <Multiselect
                v-model="approver"
                placeholder="Select Employee"
                track-by="username"
                label="username"
                valueProp="id"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :options="listEmployee"
                :limit="10"
                :loading="isLoading"
                :hide-selected="true"
                required
                ><template v-slot:tag="{ option, handleTagRemove, disabled }">
                  <div
                    class="multiselect-tag is-user"
                    :class="{
                      'is-disabled': disabled,
                    }"
                  >
                    {{ option.email }}
                    <span
                      v-if="!disabled"
                      class="multiselect-tag-remove"
                      @click="handleTagRemove(option, $event)"
                    >
                      <span class="multiselect-tag-remove-icon"></span>
                    </span>
                  </div> </template
              ></Multiselect>
            </div>
            <div :class="colClass">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Facility<span class="text-red">*</span></label
              >
              <Multiselect
                v-model="facility"
                placeholder="Select Facility"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :options="references.facility"
                :hide-selected="true"
                valueProp="id"
                trackBy="facility_name"
                label="facility_name"
                required
              >
                <!-- <template v-slot:tag="{ option, handleTagRemove, disabled }">
                <div
                  class="multiselect-tag is-user"
                  :class="{
                    'is-disabled': disabled,
                  }"
                >
                  {{ option.name }}
                  <span
                    v-if="!disabled"
                    class="multiselect-tag-remove"
                    @click="handleTagRemove(option, $event)"
                  >
                    <span class="multiselect-tag-remove-icon"></span>
                  </span>
                </div> </template
            > -->
              </Multiselect>
            </div>
          </div>
        </main>

        <div class="sticky bottom-0 bg-white py-2">
          <div class="flex justify-end gap-4 mr-6">
            <label
              @click="close"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >Cancel</label
            >
            <button
              type="submit"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner {
  height: 500px;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}
</style>
