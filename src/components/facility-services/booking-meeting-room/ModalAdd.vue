<script setup>
import iconClose from "@/assets/navbar/icon_close.svg"
import Multiselect from "@vueform/multiselect"

import { useReferenceFetchResult } from "@/stores/fetch/reference.js"
const referenceFetch = useReferenceFetchResult()

import { ref, onMounted, watch, watchEffect, computed, reactive } from "vue"
import Api from "@/utils/Api"
import Swal from "sweetalert2"
import moment from "moment"
import { useRouter } from "vue-router"
import icondanger from "@/assets/icon-danger-circle.png"

import InputRules from "@/utils/inputRules.js"

import { fetchSiteByUseID } from "@/utils/Api/reference/site.js"
import storageHelper from "@/utils/storage.helper.js"

import ApprovalDialog from "./ApprovalDialog.vue"
import WeeklyDayPicker from "./WeeklyDayPicker.vue"

const props = defineProps({
  status: String,
  id: Number,
  data: [Array, Object],
  showCreatedBy: {
    type: Boolean,
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["close"])
const router = useRouter()

let listRoom = ref([])
let listEmployee = ref([])
let selectedEmployee = ref([])

let type = ref(props.status)
let idItem = ref(props.id)
let dataForm = ref(props.data)

let id_meeting_room = ref("")
let facility = ref([])
let site_local = JSON.parse(localStorage.getItem("id_site"))
let id_company = JSON.parse(localStorage.getItem("id_company"))
const id_role = JSON.parse(localStorage.getItem("id_role"))

let remarks = ref("")
let floor = ref("")
let link = ref("")
let participant = ref([])
let capacity = ref("")
let start_date = ref("")
let end_date = ref("")
let time = ref("")
let itemsId = 0
let title = ref("")
let tempDate = ref([])
let startTime = ref({ hours: 0, minutes: 0 })
let endTime = ref({ hours: 0, minutes: 0 })
let tempTime = ref([])
let isLoading = ref(false)
let Company = ref("")
let Site = ref([])
let selectedCompany = ref("")
let selectedSite = ref("")
let is_online_meeting = ref(false)
let is_recurrence = ref(false)
let external = ref([])
let recurrence = ref("")
let disabledDates = ref([])
const selectedImage = ref(null)
let filename = ref(null)

const listFasilitis = ref([])

const form = reactive({
  id_company: null,
  id_site: null,
  remarks: null,
  id_meeting_room: null,
  title: null,
  capacity: null,
  floor: null,
  is_online_meeting: false,
  participant: [],
  facility: [],
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  external: [],
  is_recurrence: false,
  recurrence: "",
  days: [],
})

const listrecurrence = ["daily", "weekly", "monthly", "yearly"]
const approvalDialog = ref({
  status: false,
  type: "approve",
})
const approvalDialogRef = ref()

const userSites = ref([])

const rowClass = "grid grid-cols-2 px-6 items-center gap-2"
const colClass = "mb-6 w-full"
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

const format_date = (type) => {
  if (type === "monthly") {
    const day = start_date.value.getDate()
    const month = end_date.value.getMonth() + 1
    const year = end_date.value.getFullYear()
    return `${day}/${month}/${year}`
  } else if (type === "yearly") {
    const day = start_date.value.getDate()
    const month = start_date.value.getMonth() + 1
    const year = end_date.value.getFullYear()
    return `${day}/${month}/${year}`
  } else {
    return end_date.value
  }
}

const isExtenalEmailsValid = computed(() => {
  return external.value.every((email) => {
    return InputRules.email(email)
  })
})

// FETCH DATA
const fetchEmployee = async (query) => {
  let payload = {
    search: query,
  }
  isLoading.value = true
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  if (query) {
    const api = await Api.get(`employee/get_by_keyword`, { params: payload })
    listEmployee.value = api.data.data
  } else {
    listEmployee.value = []
  }

  isLoading.value = false
}

const fetchMeetingRoom = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  if (id_role == "ADMTR" || (id_role == "SUPADM" && !selectedSite.value)) {
    const api = await Api.get(`master_meeting_room/get`)
    listRoom.value = api.data.data
  } else {
    const api = await Api.get(
      `master_meeting_room/get_by_site/${selectedSite.value}`
    )
    listRoom.value = api.data.data
  }
}

const getDetailRoom = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get(`master_meeting_room/get/${id_meeting_room.value}`)
  floor.value = api.data.data[0].floor
  capacity.value = api.data.data[0].capacity

  facility.value = api.data?.data[0]?.facility.map(({ id }) => id)
  listFasilitis.value = [...api.data?.data[0]?.facility]
}

const fetchDataById = async () => {
  remarks.value = dataForm.value?.remarks ?? ""
  floor.value = dataForm.value.floor
  link.value = dataForm.value.link
  capacity.value = dataForm.value.capacity
  title.value = dataForm.value.title
  //   participant.value = dataForm.value.participant;
  tempDate.value[0] = dataForm.value.start_date
  tempDate.value[1] = dataForm.value.end_date
  start_date.value = dataForm.value.start_date
  startTime.value.hours = dataForm.value.start_time.split(":")[0]
  startTime.value.minutes = dataForm.value.start_time.split(":")[1]
  endTime.value.hours = dataForm.value.end_time.split(":")[0]
  endTime.value.minutes = dataForm.value.end_time.split(":")[1]
  end_date.value = dataForm.value.recurrence_end || dataForm.value.end_date
  tempTime.value[0] = startTime.value
  tempTime.value[1] = endTime.value
  time.value = tempTime.value
  is_recurrence.value = dataForm.value.is_recurrence
  external.value = dataForm.value.external
  recurrence.value = dataForm.value.recurrence
  participant.value = dataForm.value.participant

  form.days = dataForm.value.days.split(",").map(Number)

  listRoom.value = [
    {
      id: dataForm.value.id_meeting_room,
      name_meeting_room: dataForm.value.name_meeting_room,
    },
  ]
  id_meeting_room.value = dataForm.value.id_meeting_room

  listEmployee.value = dataForm.value.participant_array.map((item) => {
    return { ...item, id: item.id_employee }
  })
  selectedEmployee.value = dataForm.value.participant

  // selectedEmployee.value = 1
  // listEmployee.value = 1
}

const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get("/company/get")
  Company.value = res.data.data
}

const fetchGetCompanyID = async (id_company) => {
  changeCompany(id_company)
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/company/get/${id_company}`)
  Company.value = res.data.data
  selectedCompany.value = id_company
}

const changeCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/site/get_by_company/${id_company}`)
  Site.value = res.data.data
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index]
    if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
      selectedSite.value = element.id
    }
  }
}
// END

const onFileSelected = (event) => {
  if (event.target.files[0].size >= 3000000) {
    Swal.fire({
      html: "<b>Max File is 3MB</b>",
      timer: 2000,
      timerProgressBar: true,
      position: "top-end",
      background: "#EA5455",
      color: "#ffffff",
      showCancelButton: false,
      showConfirmButton: false,
      width: "300px",
    })
  } else {
    const file = event.target.files[0]

    selectedImage.value = file ? file : null
    filename.value = file.name
  }
}

const saveForm = async () => {
  const payload = {
    id_company: id_company,
    id_site: site_local,
    remarks: remarks.value,
    id_meeting_room: id_meeting_room.value,
    title: title.value,
    capacity: capacity.value,
    floor: floor.value,
    is_online_meeting: is_online_meeting.value,
    link: link.value,
    participant: selectedEmployee.value,
    start_date: moment(start_date.value).format("yyyy-MM-DD"),
    end_date: moment(start_date.value).format("yyyy-MM-DD"),
    start_time: time.value
      ? time.value[0].hours + ":" + time.value[0].minutes
      : "",
    end_time: time.value
      ? time.value[1].hours + ":" + time.value[1].minutes
      : "",
    external: external.value,
    is_recurrence: is_recurrence.value ? 1 : 0,
    recurrence: recurrence.value.toLowerCase(),
    attachment: selectedImage.value,
    facility: facility.value,
    until_ocurs: moment(format_date(recurrence.value.toLowerCase())).format(
      "yyyy-MM-DD"
    ),
    days: form.days,
  }

  if (!payload.is_recurrence) delete payload.until_ocurs

  if (type.value == "add") {
    save(payload)
  } else if (type.value == "edit" || type.value == "view") {
    edit(payload)
  }
}

const edit = async (payload) => {
  try {
    Api.post(`book_meeting_room/update_data/${idItem.value}`, payload)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        close()
        router.push({ path: `/booking-meeting-room/${idItem.value}` })
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

const save = async (payload) => {
  try {
    if (!isExtenalEmailsValid.value) {
      throw "Please insert valid email on External Participan!"
    }

    if (!form.days.length && recurrence.value == "weekly") {
      throw "Please select day for weekly recurrence!"
    }
    Api.post("book_meeting_room/store/", payload)
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
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

const getWeekly = async () => {
  disabledDates.value = []
  for (let i = 0; i <= 6; i++) {
    if (start_date.value.getDay() != i) {
      disabledDates.value.push(i)
    }
  }
}

const close = () => {
  remarks.value = ""
  id_meeting_room.value = ""
  facility = []
  capacity.value = ""
  floor.value = ""
  link.value = ""
  participant.value = ""
  start_date.value = ""
  time.value = ""
  selectedEmployee.value = []
  emits("close")
}

const fetchCondition = async () => {
  id_role === "ADMTR" ? fetchGetCompany() : fetchGetCompanyID(id_company)
}

watchEffect((newValue) => {
  // listFasilitis.map((item) => {
  //   item.value = parseInt(item.id)
  // })
  listEmployee.value.map((item) => {
    item.value = parseInt(item.id)
  })
})

watch(
  () => props.data,
  fetchDataById,
  () => {
    Object.assign(dataForm.value, ...props.data)
    fetchDataById()
  },
  {
    deep: true,
  }
)

const fetchSitesByUserId = async () => {
  const token = localStorage.getItem("token")
  const decodeToken = storageHelper.decodeToken(token)
  const userId = decodeToken?.users?.id

  const res = await fetchSiteByUseID(userId)

  userSites.value = res?.data || []
}

const filteredSites = computed(() => {
  const primarySite = JSON.parse(localStorage.getItem("id_site"))
  const userSitesIds = [primarySite]

  return Site.value?.filter(({ id }) => userSitesIds.includes(id))
})

onMounted(async () => {
  console.log("open")
  fetchCondition()
  await fetchSitesByUserId()
  if (dataForm.value) {
    getDetailRoom()
    fetchDataById()
  }
})
</script>

<template>
  <div>
    <input type="checkbox" id="booking_modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-dialog bg-white w-3/5 rounded-2xl">
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
            Booking Meeting Room
          </p>
        </nav>

        <form @submit.prevent="saveForm()">
          <main class="modal-box-inner pb-5 overflow-auto h-[80vh]">
            <div>
              <div
                v-if="readOnly && dataForm.status == 'Waiting Approval'"
                class="flex gap-5 pb-5 px-5"
              >
                <button
                  class="btn btn-md w-[150px] bg-red border-none"
                  @click="
                    () => {
                      approvalDialog.status = true
                      approvalDialog.type = 'reject'
                    }
                  "
                >
                  Reject
                </button>
                <button
                  class="btn btn-md w-[150px] bg-green border-none"
                  @click="
                    () => {
                      approvalDialog.status = true
                      approvalDialog.type = 'approve'
                    }
                  "
                >
                  Approve
                </button>
              </div>
              <div
                class="flex flex-wrap gap-2 justify-start items-center px-5 pb-5 ma-5"
              >
                <img :src="icondanger" class="w-5 h-5" />
                <p class="font-JakartaSans font-semibold text-lg">
                  Requestor Info
                </p>
              </div>

              <div class="grid grid-cols-2 px-6 items-center gap-2">
                <div class="mb-4 w-full">
                  <label
                    for="company"
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Company<span class="text-red">*</span></label
                  >
                  <select
                    class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    required
                    v-model="selectedCompany"
                    @change="changeCompany(selectedCompany)"
                    :disabled="props.readOnly"
                  >
                    <option disabled selected>Company</option>
                    <option
                      v-for="(company, i) in Company"
                      :key="i"
                      :value="company.id"
                    >
                      {{ company.company_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4 w-full">
                  <label
                    for="site"
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Site<span class="text-red">*</span></label
                  >
                  <select
                    class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    required
                    v-model="selectedSite"
                    @input="fetchMeetingRoom()"
                    :disabled="props.readOnly"
                  >
                    <option disabled selected>Site</option>
                    <option
                      v-for="(site, i) in filteredSites"
                      :key="i"
                      :value="site.id"
                    >
                      {{ site.site_name }}
                    </option>
                  </select>
                </div>

                <div v-if="type == 'view'">
                  <div :class="colClass">
                    <label
                      class="block mb-2 font-JakartaSans font-medium text-sm"
                      >Created by</label
                    >
                    <input
                      v-model="dataForm.name_created"
                      mode="single"
                      placeholder="Created By"
                      track-by="id"
                      label="employee_name"
                      :close-on-select="false"
                      :searchable="true"
                      :options="listEmployee"
                      :hide-selected="true"
                      class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div
                class="flex flex-wrap gap-2 justify-start items-center p-5 ma-5"
              >
                <img :src="icondanger" class="w-5 h-5" />
                <p class="font-JakartaSans font-semibold text-lg">
                  Booking Info
                </p>
              </div>

              <div :class="rowClass">
                <div :class="colClass">
                  <input type="hidden" name="idItem" v-model="itemsId" />
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Subject<span class="text-red">*</span></label
                  >
                  <input
                    v-model="title"
                    type="text"
                    name="item"
                    :class="inputClass"
                    placeholder="Subject"
                    :disabled="props.readOnly"
                    required
                  />
                </div>
                <div :class="colClass">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Meeting Room<span class="text-red">*</span></label
                  >
                  <select
                    v-model="id_meeting_room"
                    :class="inputClass"
                    @change="getDetailRoom()"
                    :disabled="props.readOnly"
                    @focus="fetchMeetingRoom()"
                    required
                  >
                    <option disabled selected>List Meeting Room</option>
                    <option
                      v-for="data in listRoom"
                      :key="data.id"
                      :value="data.id"
                    >
                      {{ data.name_meeting_room }}
                    </option>
                  </select>
                </div>
                <div :class="colClass">
                  <label
                    class="block mb-2 font-JakartaSans font-medium text-sm"
                  >
                    Floor
                  </label>
                  <input
                    v-model="floor"
                    type="number"
                    name="floor"
                    :class="inputClass"
                    placeholder="Floor"
                    required
                    disabled
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
                    disabled
                  />
                </div>
                <div :class="colClass">
                  <input type="hidden" name="idItem" v-model="itemsId" />
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Date<span class="text-red">*</span></label
                  >
                  <VueDatePicker
                    v-model="start_date"
                    :enable-time-picker="false"
                    placeholder="Select Date"
                    :disabled="props.readOnly"
                    :min-date="new Date()"
                    auto-apply
                    @update:model-value="getWeekly"
                    required
                  />
                </div>
                <div :class="colClass">
                  <input type="hidden" name="idItem" v-model="itemsId" />
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Detail Time<span class="text-red">*</span></label
                  >
                  <VueDatePicker
                    v-model="time"
                    time-picker
                    disable-time-range-validation
                    range
                    :disabled="props.readOnly"
                    placeholder="Select Time"
                    required
                  />
                </div>
                <div :class="colClass">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Online Meetings</label
                  >
                  <input
                    type="checkbox"
                    class="toggle toggle-primary"
                    v-model="is_online_meeting"
                    :disabled="props.readOnly"
                  />
                </div>
                <div :class="colClass" v-if="is_online_meeting">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Link<span class="text-red">*</span></label
                  >
                  <input
                    v-model="link"
                    name="link"
                    :class="inputClass"
                    placeholder="Generate by System"
                    required
                    disabled
                  />
                </div>
                <div :class="colClass">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Participant <span class="text-red">*</span></label
                  >
                  <Multiselect
                    v-model="selectedEmployee"
                    mode="tags"
                    placeholder="Select Employee"
                    track-by="employee_name"
                    label="employee_name"
                    valueProp="id"
                    :close-on-select="false"
                    :searchable="true"
                    :options="listEmployee"
                    :limit="10"
                    :loading="isLoading"
                    :hide-selected="true"
                    :disabled="props.readOnly"
                    @search-change="fetchEmployee"
                    required
                  >
                    <template
                      v-slot:tag="{ option, handleTagRemove, disabled }"
                    >
                      <div
                        class="multiselect-tag is-user"
                        :class="{
                          'is-disabled': disabled,
                        }"
                      >
                        {{ option.employee_name }}
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
                </div>
                <div :class="colClass">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >External Participant</label
                  >

                  <Multiselect
                    v-model="external"
                    name="link"
                    :searchable="true"
                    mode="tags"
                    :disabled="props.readOnly"
                    :options="external"
                    placeholder="External Participant"
                    createTag
                    :clear-on-select="true"
                  />
                </div>
                <div :class="colClass">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Recurrence</label
                  >
                  <input
                    type="checkbox"
                    class="toggle toggle-primary"
                    v-model="is_recurrence"
                    :disabled="props.readOnly"
                    @change=""
                  />
                </div>
                <div
                  :class="colClass"
                  v-if="is_recurrence"
                  class="align-top h-full"
                >
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >recurrence<span class="text-red">*</span></label
                  >
                  <select
                    v-model="recurrence"
                    :class="inputClass"
                    :disabled="props.readOnly"
                    @change="
                      () => {
                        form.days = []
                        end_date = null
                      }
                    "
                  >
                    <option disabled selected>List recurrence</option>
                    <option
                      v-for="data in listrecurrence"
                      :key="data"
                      :value="data"
                    >
                      <div class="capitalize">
                        {{ data.toUpperCase() }}
                      </div>
                    </option>
                  </select>
                </div>
                <div
                  :class="colClass"
                  class="align-top h-full"
                  v-if="is_recurrence"
                >
                  <input type="hidden" name="idItem" v-model="itemsId" />
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Occurs Until<span class="text-red">*</span></label
                  >
                  <VueDatePicker
                    v-model="end_date"
                    :enable-time-picker="false"
                    placeholder="Select Date"
                    :disabled="props.readOnly"
                    :min-date="new Date()"
                    :month-picker="recurrence == 'monthly'"
                    :year-picker="recurrence == 'yearly'"
                    auto-apply
                    required
                  />
                  <div v-if="recurrence == 'weekly'" class="grid grid-rows-1">
                    <WeeklyDayPicker
                      :disabled="readOnly"
                      :value="form.days"
                      @update="
                        ($event) => {
                          form.days = $event
                            .filter(({ selected }) => selected)
                            .map(({ value }) => value)
                        }
                      "
                    />
                  </div>

                  <!-- <VueDatePicker
                    v-model="end_date"
                    :enable-time-picker="false"
                    placeholder="Select Date"
                    :disabled="props.readOnly"
                    :disabled-week-days="disabledDates"
                    :min-date="new Date()"
                    auto-apply
                    hide-offset-dates
                  /> -->

                  <!-- <VueDatePicker
                  v-else-if="recurrence == 'Monthly'"
                  v-model="end_date"
                  :enable-time-picker="false"
                  placeholder="Select Date"
                  :disabled="props.readOnly"
                  month-picker
                  auto-apply
                />
                <VueDatePicker
                  v-else-if="recurrence == 'Yearly'"
                  v-model="end_date"
                  :enable-time-picker="false"
                  placeholder="Select Date"
                  :disabled="props.readOnly"
                  year-picker
                  auto-apply
                /> -->
                </div>

                <div :class="colClass" class="place-self-end">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Facility<span class="text-red">*</span></label
                  >
                  <Multiselect
                    v-model="facility"
                    placeholder="Select Facility"
                    mode="tags"
                    valueProp="id"
                    label="facility_name"
                    track-by="facility_name"
                    :close-on-select="false"
                    :searchable="true"
                    :options="listFasilitis"
                    :hide-selected="true"
                    :disabled="props.readOnly"
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
                  </div>
                </template> -->
                  </Multiselect>
                </div>
                <div :class="colClass">
                  <div v-if="!readOnly">
                    <label
                      class="block mb-2 font-JakartaSans font-medium text-sm"
                      >Attachment (Optional)
                      <span class="text-slate-400 text-xs italic"
                        >Format file: jpg,jpeg,png,pdf,xlsx. Max file: 3MB</span
                      >
                    </label>
                    <input
                      type="file"
                      class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Attachment"
                      accept="image/*,.pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      @change="onFileSelected"
                      :disabled="props.readOnly"
                    />
                  </div>

                  <div
                    v-else
                    class="py-2 font-JakartaSans font-medium text-sm border p-2 rounded-md"
                  >
                    <label
                      class="block mb-2 font-JakartaSans font-medium text-sm"
                    >
                      Attachment
                    </label>
                    <a
                      :href="data.attachment_path"
                      target="_blank"
                      class="text-blue"
                    >
                      {{ data.attachment }}
                    </a>
                  </div>
                </div>
                <div :class="colClass">
                  <label class="block mb-2 font-JakartaSans font-medium text-sm"
                    >Remarks</label
                  >
                  <textarea
                    rows="1"
                    class="textarea textarea-bordered resize-none"
                    placeholder="Remarks"
                    v-model="remarks"
                    :disabled="props.readOnly"
                    :class="inputClass"
                  ></textarea>
                </div>
              </div>
            </div>
          </main>
          <div
            class="sticky bottom-0 bg-white py-2 rounded-2xl"
            v-if="!props.readOnly"
          >
            <div class="flex justify-end gap-4 mr-6">
              <button
                type="button"
                @click="close"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >
                Cancel
              </button>
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
    <ApprovalDialog
      ref="approvalDialogRef"
      @success="emits('close')"
      @close="approvalDialog.status = false"
      :data="data"
      :type="approvalDialog.type"
      :dialog="approvalDialog.status"
    >
      <template></template>
    </ApprovalDialog>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner {
  --tw-scale-x: 1;
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
