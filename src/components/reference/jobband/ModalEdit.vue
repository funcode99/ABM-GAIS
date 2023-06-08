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

import Multiselect from "@vueform/multiselect";
import Api from "@/utils/Api";

import { ref, onMounted, onBeforeMount, watch, computed } from "vue";
import { useFormEditStore } from "@/stores/reference/jobband/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeJobband"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

//for form
let Company = ref("");
let FlightClass = ref();
let jobBandName = ref(props.formContent[0]);
let hotelFare = ref(props.formContent[1]);
let mealsRate = ref(props.formContent[2]);
let selectedFlightClass = ref(props.formContent[4]);

//for inner table
let instanceArray = [];
let idMatrix = props.formContent[5];
let idMatrixActual = ref(null);
let authorities = ref("");
let currentAuthoritiesId = ref();
let dropdownRemoveList = ref([]);
let addZona = ref([]);
// let zonaName = ref(props.formContent[5]);
let addAuthoritiesData = ref([]);
let levelValue = ref();
let approverLines = ref(props.formContent[5] || []);

// if (props.formContent[5] == undefined) {
//   console.log("array detail tidak ada");
// } else {
//   idMatrix.map((item, index) => {
//     if (index == idMatrix.length - 1) {
//       console.log("ini adalah index terakhir " + index);
//     } else {
//       dropdownRemoveList.value.push(item.id_tlk);
//     }
//   });
//   idMatrixActual.value = idMatrix[0].id_matrix;
// }

const fetchZonaJobband = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/zona_job/get/");
  instanceArray = res.data.data;
  addZona.value = instanceArray;
  // authorities.value = addZona.value[0].level;
  // levelValue.value = addZona.value[0].level;
  // console.log(
  //   "ini data instance array addAuthoritiesData" + JSON.stringify(instanceArray)
  // );
  // console.log("ini data authorities" + JSON.stringify(authorities));
  // console.log("ini data level" + JSON.stringify(levelValue));
};

//for get site in select
// const fetchZonaJobbandById = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;

//   const id = 76;
//   try {
//     const response = await Api.get(`/zona_job/get_by_job/${id}`);
//     const dataZona = response.data;
//     console.log(dataZona);
//   } catch (error) {
//     console.error("Terjadi kesalahan:", error);
//   }
// };

// const saveField = () => {
//   formEditState.jobBand.jobBandIdCompany = selectedCompany.value;
//   formEditState.jobBand.jobBandName = jobBandName.value;
//   formEditState.jobBand.jobBandHotelFare = hotelFare.value;
//   formEditState.jobBand.jobBandMealrate = mealsRate.value;
//   formEditState.jobBand.jobBandIdFlight = selectedFlightClass.value;
//   isVisible.value = false;
//   emits("editJobBand");
// };

// const saveApproverLines = async (data, jobbandId, mealsRate, idx) => {
//   // console.log(jobbandId);

//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   await Api.post("/zona_job/store", {
//     id_zona: data[idx].id_zona,
//     // id_job_band: jobbandId,
//     tlk_rate: mealsRate,
//   });

//   // data[idx].isPosted = undefined;
//   // console.log("tlk telah ditambahkan!");
// };

// const editApproverLines = async () => {
//   // console.log("masuk ke edit approver lines");
//   // emits('editApprover')
// };

//untuk menambahkan field
const addField = (fieldType, isi) => {
  if (isi) {
    dropdownRemoveList.value.push(isi);
  }

  fieldType.push({
    id_zona: "",
    tlk_rate: "",
    isPosted: false,
  });
};

//untuk menghapus field
const removeField = async (index, fieldType) => {
  if (fieldType[index].id_detail) {
    console.log("masuk ke api");

    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.delete(
      `/zona_job/delete_data/${fieldType[index].id_detail}`
    );

    console.log("approval berhasil dihapus");
    emits("fetchApproval");
  }

  fieldType.splice(index, 1);
  dropdownRemoveList.value.splice(index - 1, 1);
  dropdownRemoveList.value.splice(index + 1, 1);
};

//for form
const formEditState = useFormEditStore();

let companyData = ref(null);
let companyIdArray = ref([]);

let companyIdObject = ref(props.formContent[3]);
let companyIdObjectKeys = ref(Object.values(companyIdObject.value));

companyIdObjectKeys.value.map((item) => {
  let number = Number(item);

  if (Number.isInteger(number)) {
    companyIdArray.value.push(item);
  }
});

const props = defineProps({
  formContent: Array,
});

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.jobBand) {
    formEditState.jobBand = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.jobBand.jobBandIdCompany = companyIdArray.value;
  formEditState.jobBand.jobBandName = jobBandName.value;
  formEditState.jobBand.jobBandHotelFare = hotelFare.value;
  formEditState.jobBand.jobBandMealrate = mealsRate.value;
  formEditState.jobBand.jobBandIdFlight = selectedFlightClass.value;

  // console.log("Form Edit State:", formEditState.jobBand); // Tambahkan log ini

  isVisible.value = false;
  emits("changeJobband"); // Memanggil event 'changeJobband'
  console.log("Berhasil submit");
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  companyData = res.data.data;
  // console.log("ini data company" + JSON.stringify(res.data.data));
  companyData.map((item) => {
    item.value = item.id;
  });
  // console.log("Data company setelah perubahan:", companyData);
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
  fetchZonaJobband();
  // fetchZonaJobbandById();
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const resetInput = () => {
  jobBandName.value = props.formContent[0];
  hotelFare.value = props.formContent[1];
  mealsRate.value = props.formContent[2];
  companyIdArray.value = [...props.formContent[3]];
  selectedFlightClass.value = props.formContent[4];
};

watch(isVisible, (newValue) => {
  if (newValue) {
    resetInput();
  }
});

// Buat computed property formattedHotelFare
const formattedHotelFare = computed({
  get() {
    return hotelFare.value
      ? parseFloat(hotelFare.value.replace(/\D/g, ""))
          .toLocaleString("id-ID", { minimumFractionDigits: 0 })
          .replaceAll(",", ".")
      : "";
  },
  set(value) {
    hotelFare.value = value;
  },
});

// Buat computed property formattedMealsRate
const formattedMealsRate = computed({
  get() {
    return mealsRate.value
      ? parseFloat(mealsRate.value.replace(/\D/g, ""))
          .toLocaleString("id-ID", { minimumFractionDigits: 0 })
          .replaceAll(",", ".")
      : "";
  },
  set(value) {
    mealsRate.value = value;
  },
});

// Fungsi untuk meng-update nilai hotel fare
const updateHotelFare = (event) => {
  const formattedValue = event.target.value
    .replace(/[^\d.]/g, "") // Menghapus semua karakter non-digit dan non-titik
    .replaceAll(".", ""); // Menghapus semua titik agar dapat di-parse sebagai angka

  hotelFare.value = formattedValue;
};

// Fungsi untuk meng-update nilai meals rate
const updateMealsRate = (event) => {
  const formattedValue = event.target.value
    .replace(/[^\d.]/g, "") // Menghapus semua karakter non-digit dan non-titik
    .replaceAll(".", ""); // Menghapus semua titik agar dapat di-parse sebagai angka

  mealsRate.value = formattedValue;
};

// Fungsi untuk memformat currency pada blur event
const formatCurrency = () => {
  hotelFare.value = hotelFare.value.replace(/\D/g, ""); // Menghapus semua karakter non-digit
  mealsRate.value = mealsRate.value.replace(/\D/g, ""); // Menghapus semua karakter non-digit

  if (hotelFare.value === "" || hotelFare.value === "0") {
    hotelFare.value = "";
  } else {
    const formattedHotelFare = parseFloat(hotelFare.value.replace(/\./g, ""));
    hotelFare.value = formattedHotelFare.toString(); // Mengubah nilai menjadi string tanpa desimal
    // Kirim formattedHotelFare ke API sebagai hotel fare
  }

  if (mealsRate.value === "" || mealsRate.value === "0") {
    mealsRate.value = "";
  } else {
    const formattedMealsRate = parseFloat(mealsRate.value.replace(/\./g, ""));
    mealsRate.value = formattedMealsRate.toString(); // Mengubah nilai menjadi string tanpa desimal
    // Kirim formattedMealsRate ke API sebagai meals rate
  }
};
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
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="companyIdArray"
            mode="tags"
            placeholder="Select Company"
            track-by="company_name"
            label="company_name"
            :close-on-select="false"
            :searchable="true"
            :options="companyData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.company_name }}
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

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Job Band"
            required
            v-model="jobBandName"
            :class="inputStylingClass"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Hotel Fare<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Hotel Fare"
            required
            :value="formattedHotelFare"
            :class="inputStylingClass"
            @input="updateHotelFare"
            @blur="formatCurrency"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Meals Rate<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Meal Rate"
            required
            :value="formattedMealsRate"
            :class="inputStylingClass"
            @input="updateMealsRate"
            @blur="formatCurrency"
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
                <th class="relative bg-[#e5e7eb]">
                  <span class="text-black text-center items-center capitalize"
                    >Zona</span
                  >
                </th>
                <th class="relative bg-[#e5e7eb]">
                  <span class="text-center items-center text-black capitalize"
                    >Gross/Hari</span
                  >
                </th>
                <th class="relative bg-[#e5e7eb]">
                  <span class="text-center items-center text-black capitalize"
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
                      v-for="data in addZona"
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
