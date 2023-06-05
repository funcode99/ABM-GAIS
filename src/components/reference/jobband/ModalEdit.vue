<script setup>
import iconPlus from "@/assets/navbar/icon_plus.svg";
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import checkIcon from "@/assets/checkmark.png";
import closeIcon from "@/assets/close-window.png";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Api from "@/utils/Api";

import { ref, onMounted, onBeforeMount, watch } from "vue";
import { useFormEditStore } from "@/stores/reference/jobband/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "savedJobBand", "editJobBand"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let Company = ref("");
let FlightClass = ref();
let jobBandName = ref(props.formContent[0]);
let hotelFare = ref(props.formContent[1]);
let mealsRate = ref(props.formContent[2]);
let selectedCompany = ref(props.formContent[3]);
let selectedFlightClass = ref(props.formContent[4]);
let approverLines = ref(props.formContent[5] || []);

const formEditState = useFormEditStore();

const props = defineProps({
  formContent: Array,
});

//for inner table
let instanceArray = [];
let idMatrix = props.formContent[5];
let idMatrixActual = ref(null);
let authorities = ref("");
let currentAuthoritiesId = ref();
let dropdownRemoveList = ref([]);
let addZona = ref([]);
let zonaName = ref("");
let addAuthoritiesData = ref([]);
let levelValue = ref();

if (props.formContent[5] == undefined) {
  console.log("array detail tidak ada");
} else {
  idMatrix.map((item, index) => {
    if (index == idMatrix.length - 1) {
      // console.log("ini adalah index terakhir " + index);
    } else {
      dropdownRemoveList.value.push(item.id_zona);
    }
  });
  idMatrixActual.value = idMatrix[0].id_matrix;
}

const fetchApproverAuthorities = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/zona_job/get/");
  instanceArray = res.data.data;
  addAuthoritiesData.value = instanceArray;
  authorities.value = addAuthoritiesData.value[0].level;
  levelValue.value = addAuthoritiesData.value[0].level;
  console.log(
    "ini data instance array addAuthoritiesData" + JSON.stringify(instanceArray)
  );
  // console.log("ini data authorities" + JSON.stringify(authorities));
  // console.log("ini data level" + JSON.stringify(levelValue));
};

const saveField = () => {
  formEditState.jobBand.jobBandIdCompany = selectedCompany.value;
  formEditState.jobBand.jobBandName = jobBandName.value;
  formEditState.jobBand.jobBandHotelFare = hotelFare.value;
  formEditState.jobBand.jobBandMealrate = mealsRate.value;
  formEditState.jobBand.jobBandIdFlight = selectedFlightClass.value;
  isVisible.value = false;
  emits("editJobBand");
};

const saveApproverLines = async (data, jobbandId, mealsRate, idx) => {
  console.log(jobbandId);

  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  await Api.post("/zona_job/store", {
    id_zona: data[idx].id_zona,
    // id_job_band: jobbandId,
    tlk_rate: mealsRate,
  });

  // data[idx].isPosted = undefined;
  // console.log("tlk telah ditambahkan!");
};

const editApproverLines = async () => {
  // console.log("masuk ke edit approver lines");
  // emits('editApprover')
};

const addField = (fieldType, isi) => {
  if (isi) {
    dropdownRemoveList.value.push(isi);
  }

  fieldType.push({
    id_zona: addZona.value,
    tlk_rate: mealsRate.value,
    isPosted: false,
  });
};

const removeField = async (index, fieldType) => {
  if (fieldType[index].id_detail) {
    // console.log("masuk ke api");

    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await Api.delete(`/zona_job/delete_data/${fieldType[index].id_detail}`);

    // console.log("tlk berhasil dihapus");
    emits("savedJobBand");
  }

  // console.log("setelah masuk ke api");

  fieldType.splice(index, 1);
  dropdownRemoveList.value.splice(index - 1, 1);
  dropdownRemoveList.value.splice(index + 1, 1);
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get site in select
const fetchGetFlightClass = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/flight_class/");
  FlightClass.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get zona
// const fetchGetZona = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   const res = await Api.get("/zona/get/");
//   instanceArray = res.data.data;
//   addZona.value = instanceArray;
//   // console.log("ini data zona" + JSON.stringify(res.data.data));
//   // console.log("ini instance array" + JSON.stringify(instanceArray));
// };

onMounted(() => {
  fetchGetCompany();
  fetchGetFlightClass();
  // fetchGetZona();
  fetchApproverAuthorities();
});
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main class="modal-box-inner-jobband">
      <modalHeader @closeVisibility="isVisible = false" title="Edit Job Band" />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCompany"
          >
            <option disabled selected>Company</option>
            <option v-for="company in Company" :value="company.id">
              {{ company.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Job Band"
            required
            v-model="jobBandName"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Fare<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Hotel Fare"
            required
            v-model="hotelFare"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Meals Rate<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Meal Rate"
            required
            v-model="mealsRate"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Flight<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedFlightClass"
          >
            <option disabled selected>Flight</option>
            <option v-for="flight in FlightClass" :value="flight.id">
              {{ flight.flight_class }}
            </option>
          </select>
        </div>

        <!-- INNER TABLE -->
        <h1 class="text-base font-JakartaSans font-bold py-2 px-4 text-start">
          TLK
        </h1>
        <div class="px-4 pb-10">
          <table
            class="table table-zebra table-compact border w-full rounded-lg"
          >
            <thead class="text-center font-JakartaSans text-sm font-bold">
              <tr>
                <th class="relative bg-blue">
                  <span class="text-center items-center text-white capitalize"
                    >Zona</span
                  >
                </th>
                <th class="relative bg-blue">
                  <span class="text-center items-center text-white capitalize"
                    >Gross/Hari</span
                  >
                </th>
                <th class="relative bg-blue">
                  <span class="text-center items-center text-white capitalize"
                    >Action</span
                  >
                </th>
              </tr>
            </thead>

            <tbody class="bg-[#F5F5F5]">
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="(input, index) in approverLines"
                :key="`${index}`"
              >
                <td class="text-center justify-center">
                  <select
                    v-model="input.id_zona"
                    :id="index"
                    :disabled="approverLines.length - 1 > index ? true : false"
                    class="w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  >
                    <option
                      v-for="data in addAuthoritiesData"
                      :key="data.id"
                      :value="data.id"
                      :hidden="
                        dropdownRemoveList.includes(data.id) ? true : false
                      "
                    >
                      {{ data.zona_name }}
                    </option>
                  </select>
                </td>

                <td
                  v-if="
                    input.level != 'R'
                      ? (currentAuthoritiesId = input.id_zona)
                      : ''
                  "
                  class="hidden"
                ></td>

                <td class="text-center justify-center">
                  <input
                    type="text"
                    class="px-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    v-model="input.tlk_rate"
                  />
                </td>

                <!-- jika sudah ada maka pasang ke isEdit untuk mengganti value -->
                <td
                  v-if="input.isPosted === undefined && input.isEdit != false"
                  class="flex flex-wrap gap-4 justify-center"
                >
                  <button @click="input.isEdit = false">
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                  <button @click="removeField(index, approverLines)">
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button>
                </td>

                <!-- jika belum ada maka pasang ke isPosted untuk menambah value baru -->
                <td
                  v-if="input.isPosted === false"
                  class="flex flex-wrap gap-4 justify-center"
                >
                  <button @click="input.isPosted = true">
                    <img :src="editicon" class="w-6 h-6" />
                  </button>
                  <button @click="removeField(index, approverLines)">
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button>
                </td>

                <!-- berisi fungsi untuk mengganti -->
                <td
                  v-if="input.isEdit === false"
                  class="flex flex-wrap gap-4 justify-center"
                >
                  <button @click="editApproverLines()">
                    <img :src="checkIcon" class="w-5 h-5" />
                  </button>
                  <button @click="removeField(index, approverLines)">
                    <img :src="closeIcon" class="w-5 h-5" />
                  </button>
                </td>

                <!-- berisi fungsi untuk menambahkan -->
                <td
                  v-if="input.isPosted === true"
                  class="flex flex-wrap gap-4 justify-center"
                >
                  <button
                    @click="
                      saveApproverLines(approverLines, index, idMatrixActual)
                    "
                  >
                    <img :src="checkIcon" class="w-5 h-5" />
                  </button>
                  <button @click="removeField(index, approverLines)">
                    <img :src="closeIcon" class="w-5 h-5" />
                  </button>
                </td>

                <!-- <td class="flex flex-wrap gap-4 justify-center">
                  <button @click="removeField(index, approverLines)">
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button>
                </td> -->
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td class="flex justify-center">
                  <img
                    class="cursor-pointer w-6 h-6"
                    :src="iconPlus"
                    alt=""
                    @click="addField(approverLines, currentAuthoritiesId)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <modalFooter @closeEdit="isVisible = false" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
.modal-box-inner-jobband {
  height: 360px;
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

:deep(.modal-vue3-content) {
  max-height: 330px !important;
  max-width: 510px !important;
}

:deep(.modal-vue3-body) {
  margin-top: -4% !important;
}
</style>
