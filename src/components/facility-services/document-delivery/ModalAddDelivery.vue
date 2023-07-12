<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icondanger from "@/assets/icon-danger-circle.png";
import Multiselect from "@vueform/multiselect";
import { ref, onMounted, watchEffect } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  status: String,
  id: Number,
  data: Array,
});

let type = ref(props.status);
let idItem = ref(props.id);
let dataForm = ref(props.data);
let btnLabel = ref("");
let fieldDisable = ref(false);

let selectedEmployee = ref(JSON.parse(localStorage.getItem("id_employee")));
let username = ref(localStorage.getItem("username"));
let site_local = JSON.parse(localStorage.getItem("id_site"));
let id_company = JSON.parse(localStorage.getItem("id_company"));

let receiver = ref("");
let receiver_company = ref("");
let receiver_site = ref("");
let remarks = ref("");
let subject = ref("");
let id_company_receiver = ref("");
let id_site_receiver = ref("");

const selectedImage = ref(null);
let filename = ref(null);
const onFileSelected = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  filename.value = file.name;
};

let isLoading = ref(false);

const emits = defineEmits(["unlockScrollbar", "close"]);

let listEmployee = ref([]);
let detailEmployee = ref([]);

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

const fetchEmployeeById = async (id) => {
  isLoading.value = true;
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get(`employee/get/${id}`);
  detailEmployee.value = api.data.data[0];
  receiver_company.value = detailEmployee.value.company_name;
  receiver_site.value = detailEmployee.value.site_name;
  id_company_receiver.value = detailEmployee.value.id_company;
  id_site_receiver.value = detailEmployee.value.id_site;

  isLoading.value = false;
};

const fetchDataById = async () => {
  remarks.value = dataForm.value.remarks;
  selectedEmployee.value = dataForm.value.id_employee_sender;
  id_company_receiver.value = dataForm.value.id_company_receiver;
  id_site_receiver.value = dataForm.value.id_site_receiver;
  subject.value = dataForm.value.subject;
  remarks.value = dataForm.value.remarks;
  selectedImage.value = dataForm.value.attachment;
  receiver.value = dataForm.value.id_employee_receiver;
  username.value = dataForm.value.sender_name;
  isLoading.value = true;
  const api = await Api.get(`employee/get`);
  listEmployee.value = api.data.data;
  isLoading.value = false;
};
// END

const saveForm = async () => {
  if (receiver.value == "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Data Di Table Tidak Boleh Kosong",
      showConfirmButton: false,
      timer: 1500,
    });
    return false;
  } else {
    const payload = {
      id_employee_sender: selectedEmployee.value,
      id_employee_receiver: receiver.value,
      id_site: site_local,
      id_company: id_company,
      id_company_receiver: id_company_receiver.value,
      id_site_receiver: id_site_receiver.value,
      subject: subject.value,
      remarks: remarks.value,
      attachment: selectedImage.value,
    };

    if (type.value == "add") {
      save(payload);
    } else if (type.value == "edit") {
      edit(payload);
    }
  }
};

const save = async (payload) => {
  Api.post("document_delivery/store/", payload)
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

const edit = async (payload) => {
  Api.post(`document_delivery/update_data/${idItem.value}`, payload)
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

const close = async () => {
  reset();
  emits("close");
};
const reset = async () => {
  remarks.value = "";
  receiver.value = "";
  receiver_company.value = "";
  receiver_site.value = "";
  subject.value = "";
  id_company_receiver.value = "";
  filename.value = "";
  selectedImage.value = "";
};
onMounted(() => {
  if (type.value == "edit" && dataForm.value) {
    fetchDataById();
    btnLabel.value = "Update";
    if (dataForm.sender_name != username) {
      fieldDisable.value = true;
    }
  }

  if (type.value == "add") {
    btnLabel.value = "Create";
  }
});

watchEffect((newValue) => {
  listEmployee.value.map((item) => {
    item.value = parseInt(item.id);
  });
  if (receiver.value) {
    fetchEmployeeById(receiver.value);
  }
});
</script>

<template>
  <input type="checkbox" id="my-modal-stock-in" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5 rounded-2xl">
      <nav class="sticky top-0 z-50 bg-[#015289] rounded-t-2xl">
        <label
          @click="close"
          for="my-modal-stock-in"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Document Delivery
        </p>
      </nav>

      <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
        <img :src="icondanger" class="w-5 h-5" />
        <p class="font-JakartaSans font-semibold text-lg">
          Document Delivery Info
        </p>
      </div>

      <main class="modal-box-inner-brand pb-14">
        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Sender<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="username"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              disabled
              placeholder="Subject Document"
              required
            />
          </div>
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Subject Document<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="subject"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Subject Document"
              required
              :disabled="fieldDisable"
            />
          </div>
        </div>
        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Receiver<span class="text-red">*</span></label
            >
            <Multiselect
              v-model="receiver"
              :show-labels="false"
              placeholder="Select Employee"
              track-by="employee_name"
              label="employee_name"
              :close-on-select="true"
              :searchable="true"
              :options="listEmployee"
              :limit="10"
              :loading="isLoading"
              :hide-selected="true"
              @search-change="fetchEmployee"
              :disabled="fieldDisable"
            ></Multiselect>
          </div>
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Receiver Company<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="receiver_company"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              disabled
              placeholder="Receiver Company"
              required
            />
          </div>
        </div>
        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Location<span class="text-red">*</span></label
            >
            <input
              type="text"
              v-model="receiver_site"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              disabled
              placeholder="Location"
              required
            />
          </div>

          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Attachment (Optional)</label
            >
            <input
              type="file"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Attachment"
              @change="onFileSelected"
              required
            />
          </div>
        </div>

        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Remarks</label
            >
            <textarea
              rows="5"
              v-model="remarks"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Remarks"
              required
            />
          </div>
        </div>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-center gap-4">
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            @click="saveForm"
          >
            {{ btnLabel }}
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

.modal-box-inner-brand {
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

.inner-table {
  overflow-x: auto;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}
</style>
