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

const emits = defineEmits(["unlockScrollbar", "changeJobband", "fetchJobband"]);

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
let idZona = props.formContent[5];
let idZonaActual = ref(null);
let idJobBand = ref(props.formContent[6]);

//for inner table
let dropdownRemoveList = ref([]);
let zonaCode = ref("");
let jobBandCode = ref("");
let tlkRate = ref("");
let zonaTlkRateLines = ref(props.formContent[5] || []);
let addZonaTlkRateData = ref([]);
let currentAuthoritiesId = ref();
let instanceArray = [];
let addData = ref([]);

// initialization for fetched approver lines with default property & value
if (props.formContent[5] == undefined) {
  console.log("array detail tidak ada");
} else {
  idZona.map((item, index) => {
    item.isEdit = false;
    item.fromFetch = true;
    if (index == idZona.length - 1) {
    } else {
      dropdownRemoveList.value.push(item.id_zona);
    }
  });
  idZonaActual.value = idZona[0].id_zona;
}

const saveApproverLines = async (data, idx, zonaId) => {
  console.log(data);
  console.log(idx);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.post("/zona_job/store/", {
    id_zona: zonaId,
    id_job_band: parseInt(data[idx].id_job_band),
    tlk_rate: parseInt(data[idx].tlkRate),
  });

  data[idx].forAdd = undefined;
  console.log("zona tlk rate telah ditambahkan!");
  emits("fetchJobband");

  const insertDefault = () => {
    zonaTlkRateLines.value = props.formContent[5];

    console.log(zonaTlkRateLines.value);

    if (props.formContent[5] == undefined) {
      console.log("array detail tidak ada");
    } else {
      zonaTlkRateLines.value.map((item, index) => {
        item.isEdit = false;
        item.fromFetch = true;
        if (index == idZona.length - 1) {
        } else {
          dropdownRemoveList.value.push(item.id_zona);
        }
      });
      // idMatrixActual.value = idMatrix[0].id_matrix
    }
  };
  setTimeout(insertDefault, 100);
};

const editApproverLines = async (data, idx, zonaId) => {
  console.log("masuk ke edit approver lines");
  // console.log(data)
  // console.log(idx)
  console.log(data[idx].tlk_rate);

  const api = await Api.post(`/zona_job/update_data/${idJobBand.value}`, {
    id_zona: zonaId,
    id_job_band: parseInt(data[idx].id_job_band),
    tlk_rate: data[idx].tlk_rate,
  });
  console.log(api);
  console.log("Zona TLK Rate telah diubah!");
  // emits("fetchJobband");
  console.log(zonaTlkRateLines.value);
  const insertDefault = () => {
    zonaTlkRateLines.value = props.formContent[5];

    if (props.formContent[5] == undefined) {
      console.log("array detail tidak ada");
    } else {
      zonaTlkRateLines.value.map((item, index) => {
        item.isEdit = false;
        item.fromFetch = true;
        if (index == idZona.length - 1) {
          // console.log('ini adalah index terakhir ' + index)
        } else {
          dropdownRemoveList.value.push(item.id_zona);
        }
      });
      // idMatrixActual.value = idMatrix[0].id_matrix
    }
  };
  setTimeout(insertDefault, 100);
};

//untuk menambahkan field
const addField = (fieldType, isi) => {
  if (isi) {
    dropdownRemoveList.value.push(isi);
  }

  fieldType.push({
    id_zona: zonaCode.value,
    id_job_band: jobBandCode.value,
    tlk_rate: tlkRate.value,
    forAdd: false,
  });
};

//untuk menghapus field
const removeField = async (index, fieldType) => {
  console.log(idJobBand.value);
  if (idJobBand) {
    console.log("masuk ke api delete");

    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.delete(
      `/zona_job/delete_data/${idJobBand.value}`
    );

    console.log("zona tlk rate berhasil dihapus");
    // emits("fetchJobband");
  }

  console.log("setelah masuk ke api");
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

  isVisible.value = false;
  emits("changeJobband"); // Memanggil event 'changeJobband'
  console.log("Berhasil submit");
};

//for get jobband
const fetchZonaJobband = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/zona_job/get/");
  instanceArray = res.data.data;
  addZonaTlkRateData.value = instanceArray;
  zonaCode.value = addZonaTlkRateData.value[0].level;
  tlkRate.value = addZonaTlkRateData.value[0].level;
  jobBandCode.value = addZonaTlkRateData.value[0].level;
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  companyData = res.data.data;
  companyData.map((item) => {
    item.value = item.id;
  });
};

//for get site in select
const fetchGetFlightClass = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/flight_class/");
  FlightClass.value = res.data.data;
};

onMounted(() => {
  fetchGetCompany();
  fetchGetFlightClass();
  fetchZonaJobband();
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

        <!-- {{ zonaTlkRateLines }} -->

            <tbody class="bg-[#F5F5F5]">
              <!-- {{ addZonaTlkRateData }} -->
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="(input, index) in zonaTlkRateLines"
                :key="`${index}`"
              >
                <td class="text-center justify-center">
                  <select
                    v-model="input.id_zona"
                    :id="index"
                    :disabled="
                      addZonaTlkRateData.length - 1 > index && !input.isEdit
                    "
                    class="w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  >
                    <option
                      v-for="data in addZonaTlkRateData"
                      :key="data.id"
                      :value="data.id_zona"
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
                  <!-- {{  input.tlk_rate }} -->
                  <input
                    type="text"
                    class="px-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    v-model="input.tlk_rate"
                    :disabled="
                      addZonaTlkRateData.length - 1 > index && !input.isEdit
                    "
                  />
                </td>

                <td class="flex flex-wrap gap-4 justify-center">
                  <!-- jika sudah ada maka pasang ke isEdit untuk mengganti value -->
                  <button
                    v-if="input.fromFetch == true && input.isEdit == false"
                    type="button"
                    :class="zonaTlkRateLines.length - 1 > index ? 'hidden' : ''"
                    @click="input.isEdit = true"
                  >
                    <img :src="editicon" class="w-6 h-6" />
                  </button>

                  <button
                    v-if="input.fromFetch == true && input.isEdit == false"
                    type="button"
                    @click="removeField(index, zonaTlkRateLines)"
                    :class="zonaTlkRateLines.length - 1 > index ? 'hidden' : ''"
                  >
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button>

                  <!-- <h1 v-if="input.isEdit == true"> confirm for edit api</h1> -->
                  <button
                    v-if="input.isEdit == true"
                    type="button"
                    @click="
                      editApproverLines(zonaTlkRateLines, index, idZonaActual)
                    "
                  >
                    <img :src="checkIcon" class="w-5 h-5" />
                  </button>

                  <button
                    v-if="input.isEdit == true"
                    type="button"
                    @click="input.isEdit = false"
                  >
                    <img :src="closeIcon" class="w-5 h-5" />
                  </button>

                  <button
                    v-if="input.forAdd == false"
                    type="button"
                    @click="input.forAdd = true"
                  >
                    <img :src="editicon" class="w-6 h-6" />
                  </button>

                  <button
                    v-if="input.forAdd == false"
                    type="button"
                    @click="removeField(index, zonaTlkRateLines)"
                  >
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button>

                  <!-- <h1 v-if="input.forAdd == true"> confirm for add api</h1> -->
                  <button
                    v-if="input.forAdd == true"
                    type="button"
                    @click="
                      saveApproverLines(zonaTlkRateLines, index, idZonaActual)
                    "
                  >
                    <img :src="checkIcon" class="w-5 h-5" />
                  </button>

                  <button
                    v-if="input.forAdd == true"
                    type="button"
                    @click="input.forAdd = false"
                  >
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
                    @click="addField(zonaTlkRateLines, currentAuthoritiesId)"
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
