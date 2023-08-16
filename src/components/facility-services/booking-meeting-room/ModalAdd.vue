<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import Multiselect from "@vueform/multiselect";

import { useReferenceFetchResult } from "@/stores/fetch/reference.js";
const referenceFetch = useReferenceFetchResult();

import { ref, onMounted, watch, watchEffect, computed } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import moment from "moment";
import { useRouter } from "vue-router";
import icondanger from "@/assets/icon-danger-circle.png";

let listFasilitis = [
  { id: 1, name: "Projector" },
  { id: 2, name: "TV" },
  { id: 3, name: "Speaker" },
  { id: 4, name: "WebCam" },
  { id: 5, name: "Jabra" },
];

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
});

const emits = defineEmits(["close"]);
const router = useRouter();

let listRoom = ref([]);
let listEmployee = ref([]);
let selectedEmployee = ref([]);

let type = ref(props.status);
let idItem = ref(props.id);
let dataForm = ref(props.data);

let id_meeting_room = ref("");
let facility = ref([]);
let site_local = JSON.parse(localStorage.getItem("id_site"));
let id_company = JSON.parse(localStorage.getItem("id_company"));
const id_role = JSON.parse(localStorage.getItem("id_role"));

let remarks = ref("");
let floor = ref("");
let link = ref("");
let participant = ref([]);
let capacity = ref("");
let start_date = ref("");
let end_date = ref("");
let time = ref("");
let itemsId = 0;
let title = ref("");
let tempDate = ref([]);
let startTime = ref({ hours: 0, minutes: 0 });
let endTime = ref({ hours: 0, minutes: 0 });
let tempTime = ref([]);
let isLoading = ref(false);
let Company = ref("");
let Site = ref("");
let selectedCompany = ref("");
let selectedSite = ref("");
let is_online_meeting = ref(false);
let is_recurrence = ref(false);
let external = ref("");
let reccurence = ref("");
let disabledDates = ref([]);
const selectedImage = ref(null);
let filename = ref(null);

const listReccurence = ["Daily", "Weekly", "Monthly", "Yearly"];

const rowClass = "grid grid-cols-2 px-6 items-center gap-2";
const colClass = "mb-6 w-full";
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const format_date = (type) => {
  if (type === "monthly") {
    const day = start_date.value.getDate();
    const month = end_date.value.getMonth() + 1;
    const year = end_date.value.getFullYear();
    return `${day}/${month}/${year}`;
  } else if (type === "yearly") {
    const day = start_date.value.getDate();
    const month = start_date.value.getMonth() + 1;
    const year = end_date.value.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    return end_date.value;
  }
};

// FETCH DATA
const fetchEmployee = async (query) => {
  let payload = {
    search: query,
  };
  isLoading.value = true;
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (query) {
    const api = await Api.get(`employee/get_by_keyword`, { params: payload });
    listEmployee.value = api.data.data;
  } else {
    listEmployee.value = [];
  }

  isLoading.value = false;
};

const fetchMeetingRoom = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (id_role == "ADMTR") {
    const api = await Api.get(`master_meeting_room/get`);
    listRoom.value = api.data.data;
  } else {
    const api = await Api.get(`master_meeting_room/get_by_site/${site_local}`);
    listRoom.value = api.data.data;
  }
};

const getDetailRoom = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get(`master_meeting_room/get/${id_meeting_room.value}`);
  floor.value = api.data.data[0].floor;
  capacity.value = api.data.data[0].capacity;
  listFasilitis = listFasilitis.filter(function (item) {
    return api.data.data[0].facility.includes(item.id);
  });
};

const fetchDataById = async () => {
  remarks.value = dataForm.value?.remarks ?? "";
  id_meeting_room.value = dataForm.value.id_meeting_room;
  floor.value = dataForm.value.floor;
  link.value = dataForm.value.link;
  capacity.value = dataForm.value.capacity;
  title.value = dataForm.value.title;
  //   participant.value = dataForm.value.participant;
  tempDate.value[0] = dataForm.value.start_date;
  tempDate.value[1] = dataForm.value.end_date;
  start_date.value = tempDate.value;
  startTime.value.hours = dataForm.value.start_time.split(":")[0];
  startTime.value.minutes = dataForm.value.start_time.split(":")[1];
  endTime.value.hours = dataForm.value.end_time.split(":")[0];
  endTime.value.minutes = dataForm.value.end_time.split(":")[1];
  tempTime.value[0] = startTime.value;
  tempTime.value[1] = endTime.value;
  time.value = tempTime.value;

  const api = await Api.get(`employee/get`);
  listEmployee.value = api.data.data;
  selectedEmployee.value = dataForm.value.participant;
};

const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
};

const fetchGetCompanyID = async (id_company) => {
  changeCompany(id_company);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_company}`);
  Company.value = res.data.data;
  selectedCompany.value = id_company;
};

const changeCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  Site.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
      selectedSite.value = element.id;
    }
  }
};
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
    });
  } else {
    const file = event.target.files[0];

    selectedImage.value = file ? file : null;
    filename.value = file.name;
  }
};

const saveForm = async () => {
  external.value = external.value != "" ? external.value.split(/\s*,\s*/) : [];
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
    start_date: start_date.value,
    end_date: format_date(reccurence.value.toLowerCase()),
    start_time: time.value
      ? time.value[0].hours + ":" + time.value[0].minutes
      : "",
    end_time: time.value
      ? time.value[1].hours + ":" + time.value[1].minutes
      : "",
    external: external.value,
    is_recurrence: is_recurrence.value,
    reccurence: reccurence.value.toLowerCase(),
    attachment: selectedImage.value,
    facility: facility.value,
  };

  if (type.value == "add") {
    save(payload);
  } else if (type.value == "edit" || type.value == "view") {
    edit(payload);
  }
};

const edit = async (payload) => {
  Api.post(`book_meeting_room/update_data/${idItem.value}`, payload)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      close();
      router.push({ path: `/booking-meeting-room/${idItem.value}` });
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

const save = async (payload) => {
  Api.post("book_meeting_room/store/", payload)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      close();
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

const getWeekly = async () => {
  disabledDates.value = [];
  for (let i = 0; i <= 6; i++) {
    if (start_date.value.getDay() != i) {
      disabledDates.value.push(i);
    }
  }
};

const close = () => {
  remarks.value = "";
  id_meeting_room.value = "";
  facility = [];
  capacity.value = "";
  floor.value = "";
  link.value = "";
  participant.value = "";
  start_date.value = "";
  time.value = "";
  selectedEmployee.value = [];
  emits("close");
};

const fetchCondition = async () => {
  id_role === "ADMTR" ? fetchGetCompany() : fetchGetCompanyID(id_company);
};

watchEffect((newValue) => {
  listFasilitis.map((item) => {
    item.value = parseInt(item.id);
  });
  listEmployee.value.map((item) => {
    item.value = parseInt(item.id);
  });
});

watch(
  () => props.data,
  fetchDataById,
  () => {
    Object.assign(dataForm.value, ...props.data);
    fetchDataById();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  fetchMeetingRoom();
  fetchCondition();
  if (dataForm.value) {
    fetchDataById();
    getDetailRoom();
  }
});
</script>

<template>
  <input type="checkbox" id="booking_modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5 rounded-2xl">
      <nav class="sticky top-0 z-50 bg-[#015289]">
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

      <main class="modal-box-inner pb-5">
        <div
          class="flex flex-wrap gap-2 justify-start items-center px-5 pb-5 ma-5"
        >
          <img :src="icondanger" class="w-5 h-5" />
          <p class="font-JakartaSans font-semibold text-lg">Requestor Info</p>
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
              @change="changeSite(selectedSite)"
            >
              <option disabled selected>Site</option>
              <option v-for="(site, i) in Site" :key="i" :value="site.id">
                {{ site.site_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 justify-start items-center p-5 ma-5">
          <img :src="icondanger" class="w-5 h-5" />
          <p class="font-JakartaSans font-semibold text-lg">Booking Info</p>
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
            >
              <option disabled selected>List Meeting Room</option>
              <option v-for="data in listRoom" :key="data.id" :value="data.id">
                {{ data.name_meeting_room }}
              </option>
            </select>
          </div>
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Floor<span class="text-red">*</span></label
            >
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
            />
          </div>
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Online Meetings<span class="text-red">*</span></label
            >
            <input
              type="checkbox"
              class="toggle toggle-primary"
              v-model="is_online_meeting"
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
              >Participant</label
            >
            <Multiselect
              v-model="selectedEmployee"
              mode="tags"
              placeholder="Select Employee"
              track-by="employee_name"
              label="employee_name"
              :close-on-select="false"
              :searchable="true"
              :options="listEmployee"
              :limit="10"
              :loading="isLoading"
              :hide-selected="true"
              :disabled="props.readOnly"
              @search-change="fetchEmployee"
            >
              <template v-slot:tag="{ option, handleTagRemove, disabled }">
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
            <input
              v-model="external"
              name="link"
              :class="inputClass"
              :disabled="props.readOnly"
              placeholder="External Participant"
              required
            />
          </div>
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Reccurence<span class="text-red">*</span></label
            >
            <input
              type="checkbox"
              class="toggle toggle-primary"
              v-model="is_recurrence"
            />
          </div>
          <div :class="colClass" v-if="is_recurrence">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Reccurence<span class="text-red">*</span></label
            >
            <select
              v-model="reccurence"
              :class="inputClass"
              :disabled="props.readOnly"
            >
              <option disabled selected>List Reccurence</option>
              <option
                v-for="data in listReccurence"
                :key="data"
                :value="data"
                class="capitalize"
              >
                {{ data }}
              </option>
            </select>
          </div>
          <div :class="colClass" v-if="reccurence">
            <input type="hidden" name="idItem" v-model="itemsId" />
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Occurs Until<span class="text-red">*</span></label
            >
            <VueDatePicker
              v-if="reccurence == 'Daily'"
              v-model="end_date"
              :enable-time-picker="false"
              placeholder="Select Date"
              :disabled="props.readOnly"
              :min-date="new Date()"
              auto-apply
            />
            <VueDatePicker
              v-else-if="reccurence == 'Weekly'"
              v-model="end_date"
              :enable-time-picker="false"
              placeholder="Select Date"
              :disabled="props.readOnly"
              :disabled-week-days="disabledDates"
              :min-date="new Date()"
              auto-apply
              hide-offset-dates
            />
            <VueDatePicker
              v-else-if="reccurence == 'Monthly'"
              v-model="end_date"
              :enable-time-picker="false"
              placeholder="Select Date"
              :disabled="props.readOnly"
              month-picker
              auto-apply
            />
            <VueDatePicker
              v-else-if="reccurence == 'Yearly'"
              v-model="end_date"
              :enable-time-picker="false"
              placeholder="Select Date"
              :disabled="props.readOnly"
              year-picker
              auto-apply
            />
          </div>
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Facility<span class="text-red">*</span></label
            >
            <Multiselect
              v-model="facility"
              placeholder="Select Facility"
              mode="tags"
              track-by="name"
              label="name"
              :close-on-select="false"
              :searchable="true"
              :options="listFasilitis"
              :hide-selected="true"
              ><template v-slot:tag="{ option, handleTagRemove, disabled }">
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
            ></Multiselect>
          </div>
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
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
            />
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

        <div :class="rowClass" v-if="type == 'view'">
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Created by</label
            >
            <Multiselect
              v-model="dataForm.created_by"
              mode="single"
              placeholder="Created By"
              track-by="id"
              label="employee_name"
              :close-on-select="false"
              :searchable="true"
              :options="listEmployee"
              :hide-selected="true"
              disabled
            >
            </Multiselect>
          </div>
        </div>
      </main>

      <div class="sticky bottom-0 bg-white py-2" v-if="!props.readOnly">
        <div class="flex justify-end gap-4 mr-6">
          <label
            @click="close"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</label
          >
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            @click="saveForm"
          >
            Save
          </button>
        </div>
      </div>
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
  height: 450px;
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
