<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import Multiselect from "@vueform/multiselect";

import { useReferenceFetchResult } from "@/stores/fetch/reference.js";
const referenceFetch = useReferenceFetchResult();

import { ref, onMounted, watch, watchEffect } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const props = defineProps({
  status: String,
  id: Number,
  data: Array,
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
let id_site = "";
let site_local = JSON.parse(localStorage.getItem("id_site"));
let id_company = JSON.parse(localStorage.getItem("id_company"));
const id_role = JSON.parse(localStorage.getItem("id_role"));

let remarks = ref("");
let floor = ref("");
let link = ref("");
let participant = ref([]);
let capacity = ref("");
let date = ref("");
let time = ref("");
let itemsId = 0;
let title = ref("");
let tempDate = ref([]);
let startTime = ref({ hours: 0, minutes: 0 });
let endTime = ref({ hours: 0, minutes: 0 });
let tempTime = ref([]);
let isLoading = ref(false);
const rowClass = "flex justify-between px-6 items-center gap-2";
const colClass = "mb-6 w-full";
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

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
  //   selectSite.value = false;
};

const fetchDataById = async () => {
  remarks.value = dataForm.value.remarks;
  id_meeting_room.value = dataForm.value.id_meeting_room;
  floor.value = dataForm.value.floor;
  link.value = dataForm.value.link;
  capacity.value = dataForm.value.capacity;
  title.value = dataForm.value.title;
  //   participant.value = dataForm.value.participant;
  tempDate.value[0] = dataForm.value.start_date;
  tempDate.value[1] = dataForm.value.end_date;
  date.value = tempDate.value;
  startTime.value.hours = dataForm.value.start_time.split(":")[0];
  startTime.value.minutes = dataForm.value.start_time.split(":")[1];
  endTime.value.hours = dataForm.value.end_time.split(":")[0];
  endTime.value.minutes = dataForm.value.end_time.split(":")[1];
  tempTime.value[0] = startTime.value;
  tempTime.value[1] = endTime.value;
  time.value = tempTime.value;

  const api = await Api.get(`employee/get`);
  listEmployee.value = api.data.data;

  let tempParticipant = dataForm.value.participant
    .replace("/", "")
    .replace("[", "")
    .replace("]", "");

  let numberArray = [];

  if (tempParticipant.includes(",")) {
    participant.value = tempParticipant.split(",");
    participant.value.forEach((ele) => numberArray.push(+ele));
  } else {
    numberArray.push(parseInt(tempParticipant.replace('"', '')))
  }

  selectedEmployee.value = numberArray;
//   console.log(numberArray);
};
// END

const saveForm = async () => {
  const payload = {
    id_company: id_company,
    id_site: site_local,
    remarks: remarks.value,
    id_meeting_room: id_meeting_room.value,
    title: title.value,
    capacity: capacity.value,
    floor: floor.value,
    link: link.value,
    participant: selectedEmployee.value,
    start_date: date.value ? date.value[0] : "",
    end_date: date.value ? date.value[1] : "",
    start_time: time.value
      ? time.value[0].hours + ":" + time.value[0].minutes
      : "",
    end_time: time.value
      ? time.value[1].hours + ":" + time.value[1].minutes
      : "",
  };

  if (type.value == "add") {
    save(payload);
  } else if (type.value == "edit") {
    edit(payload);
  }
};

const edit = async (payload) => {
  const api = await Api.post(
    `book_meeting_room/update_data/${idItem.value}`,
    payload
  );
  Swal.fire({
    position: "center",
    icon: "success",
    title: api.data.message,
    showConfirmButton: false,
    timer: 1500,
  });
  if (api.data.success) {
    close();
    router.push({ path: `/booking-meeting-room/${idItem.value}` });
  }
};

const save = async (payload) => {
  const api = await Api.post("book_meeting_room/store/", payload);
  Swal.fire({
    position: "center",
    icon: "success",
    title: api.data.message,
    showConfirmButton: false,
    timer: 1500,
  });
  if (api.data.success) {
    close();
    router.push({ path: `/booking-meeting-room` });
  }
};

onMounted(() => {
  fetchMeetingRoom();
  if (type.value == "edit" && dataForm.value) {
    fetchDataById();
  }
  //   fetchEmployee();
});

const close = () => {
  remarks.value = "";
  id_meeting_room.value = "";
  id_site = "";
  capacity.value = "";
  floor.value = "";
  link.value = "";
  participant.value = "";
  date.value = "";
  time.value = "";
  selectedEmployee.value = [];
  emits("close");
};

watchEffect((newValue) => {
  listEmployee.value.map((item) => {
    item.value = parseInt(item.id);
  });
});
</script>

<template>
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal min-h-[300px]">
    <div class="modal-box relative">
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
      <main class="modal-box-inner pb-4 lg:pb-16">
        <div :class="rowClass">
          <div :class="colClass">
            <input type="hidden" name="idItem" v-model="itemsId" />
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Title<span class="text-red">*</span></label
            >
            <input
              v-model="title"
              type="text"
              name="item"
              :class="inputClass"
              placeholder="Item"
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
            >
              <option disabled selected>List Meeting Room</option>
              <option v-for="data in listRoom" :key="data.id" :value="data.id">
                {{ data.name_meeting_room }}
              </option>
            </select>
          </div>
        </div>
        <div :class="rowClass">
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
        </div>
        <div :class="rowClass">
          <div :class="colClass">
            <input type="hidden" name="idItem" v-model="itemsId" />
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Date<span class="text-red">*</span></label
            >
            <VueDatePicker
              v-model="date"
              range
              :enable-time-picker="false"
              placeholder="Select Date"
              :min-date="new Date()"
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
              placeholder="Select Time"
            />
          </div>
        </div>
        <div :class="rowClass">
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Participant<span class="text-red">*</span></label
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
              >Link</label
            >
            <input
              v-model="link"
              type="text"
              name="link"
              :class="inputClass"
              placeholder="Link"
              required
            />
          </div>
        </div>
        <div :class="rowClass">
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Remarks</label
            >
            <textarea
              class="textarea textarea-bordered w-max-[50%]"
              placeholder="Remarks"
              v-model="remarks"
              :class="inputClass"
            ></textarea>
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
  height: 650px;
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
