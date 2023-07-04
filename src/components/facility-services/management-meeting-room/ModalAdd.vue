<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
import { ref, onBeforeMount, computed, reactive, onMounted } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import { Modal } from "usemodal-vue3";
import { useRouter } from "vue-router";

const props = defineProps({
  status: String,
  id: Number,
});

const emits = defineEmits(["close"]);
const id_role = JSON.parse(localStorage.getItem("id_role"));

const listStatus = [
  { id: 1, title: "Available" },
  { id: 2, title: "Booked" },
];

let listCompany = ref([]);
let listSite = ref([]);
let dataArr = ref([]);

let type = ref(props.status);
let idItem = ref(props.id);

let id_company = ref("");
let id_site = ref("");
let code_meeting_room = ref("");
let floor = ref("");
let available_status = ref("");
let name_meeting_room = ref("");
let capacity = ref("");
let itemsId = 0;

let localIdSite = ref("");
let selectSite = ref(true);

const rowClass = "flex justify-between px-6 items-center gap-2";
const colClass = "mb-6 w-full";
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

// FETCH DATA
const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("company/get");
  listCompany.value = api.data.data;
};

const fetchCompanyID = async (id_comp) => {
  fetchSite(id_comp);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_comp}`);
  listCompany.value = res.data.data;
  id_company.value = id_comp;
};

const fetchSite = async (id_comp) => {
  let idComp = id_comp ? id_comp : id_company.value;
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get(`site/get_by_company/${idComp}`);
  listSite.value = api.data.data;
  selectSite.value = false;
  for (let index = 0; index < api.data.data.length; index++) {
    const element = api.data.data[index];
    if (type.value == "add") {
      if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
        id_site.value = element.id;
      }
    } else {
      if (id_site.value === element.id) {
        id_site.value = element.id;
      }
    }
    if (id_role == "ADM") {
      listSite.value = listSite.value.filter((e) => e.id === id_site.value);
    }
  }
};

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`master_meeting_room/get/${id}`);
  dataArr.value = res.data.data[0];
  code_meeting_room.value = dataArr.value.code_meeting_room;
  id_company.value = dataArr.value.id_company;
  id_site.value = dataArr.value.id_site;
  floor.value = dataArr.value.floor;
  name_meeting_room.value = dataArr.value.name_meeting_room;
  available_status.value = dataArr.value.available_status;
  capacity.value = dataArr.value.capacity;
  fetchSite(id_company.value);
};
// END

const generateNumber = async () => {
  code_meeting_room.value = Math.floor(100000000 + Math.random() * 900000000);
};

const saveForm = async () => {
  const payload = {
    code_meeting_room: code_meeting_room.value,
    id_company: id_company.value,
    id_site: id_site.value,
    name_meeting_room: name_meeting_room.value,
    capacity: capacity.value,
    floor: floor.value,
    available_status: available_status.value,
  };
  if (type.value == "add") {
    save(payload);
  } else if (type.value == "edit") {
    edit(payload);
  }
};

const edit = async (payload) => {
  const api = await Api.post(
    `master_meeting_room/update_data/${idItem.value}`,
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
  }
};

const save = async (payload) => {
  const api = await Api.post("master_meeting_room/store/", payload);
  Swal.fire({
    position: "center",
    icon: "success",
    title: api.data.message,
    showConfirmButton: false,
    timer: 1500,
  });
  if (api.data.success) {
    close();
  }
};

const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  id_role === "ADMTR" ? fetchCompany() : fetchCompanyID(id_company);
};

onMounted(() => {
  fetchCondition();
  if (type.value == "edit" && idItem.value != 0) {
    fetchDataById(idItem.value);
  }
});

const close = () => {
  code_meeting_room.value = "";
  id_company.value = "";
  id_site.value = "";
  name_meeting_room.value = "";
  capacity.value = "";
  floor.value = "";
  available_status.value = "";
  emits("close");
};
</script>

<template>
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
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
          Meeting Room
        </p>
      </nav>
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
            >
              <option disabled selected>Site</option>
              <option
                v-for="data in listSite"
                :key="data.id"
                :value="data.id"
              >
                {{ data.site_code }} - {{ data.site_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mx-3">
          <p class="font-JakartaSans font-medium text-sm pb-2">Details Item</p>
          <hr class="h-px bg-[#8B8B8B] border-0 mb-4" />
        </div>

        <div :class="rowClass">
          <div :class="colClass">
            <input type="hidden" name="idItem" v-model="itemsId" />
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >ID Meeting Room<span class="text-red">*</span></label
            >
            <div class="flex items-center w-full">
              <input
                v-model="code_meeting_room"
                type="text"
                name="item"
                :class="inputClass"
                placeholder="Item"
                required
                :disabled="type == 'edit' ? true : false"
              />
              <button
                v-if="type == 'add'"
                class="flex-shrink-0 bg-[#015289] text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                title="Generate Number"
                @click="generateNumber"
              >
                <img :src="iconPlus" class="w-[10px] h-[10px]" />
              </button>
            </div>
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
            />
          </div>
        </div>

        <div :class="rowClass">
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Meeting Room Name</label
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
        </div>
        <div :class="rowClass">
          <div :class="colClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Capacity<span class="text-red">*</span></label
            >
            <input
              v-model="capacity"
              type="number"
              name="capacity"
              :class="inputClass"
              class="max-w-[50%]"
              placeholder="Capacity"
              required
            />
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
