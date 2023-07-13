<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import ModalAddDelivery from "@/components/facility-services/document-delivery/ModalAddDelivery.vue";

import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar.js";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import moment from "moment";

const sidebar = useSidebarStore();
const router = useRouter();
let lengthCounter = 0;
const idDetail = router.currentRoute.value.params.id;
const type = router.currentRoute.value.params.type;

const id_role = JSON.parse(localStorage.getItem("id_role"));
const id_company = JSON.parse(localStorage.getItem("id_company"));

// for modal
let statusForm = ref("add");
let visibleModal = ref(false);
let visibleBtn = ref(false);
let idItem = ref(0);
const btnLabelSubmit = ref("");
let dataArr = ref([]);

const tableHead = [
  { Id: 1, title: "Sender", jsonData: "sender_name" },
  { Id: 2, title: "Location", jsonData: "name_site_receiver" },
  { Id: 3, title: "Receiver", jsonData: "receiver_name" },
  { Id: 4, title: "Subject", jsonData: "subject" },
  { Id: 5, title: "Attachment", jsonData: "attachment" },
  { Id: 6, title: "Remarks", jsonData: "remarks" },
];

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`document_delivery/get/${id}`);
  dataArr.value = res.data.data[0];
  labelSubmit(dataArr.value.status);
  visibleBtnApproval(dataArr.value.status, dataArr.value.id_company_receiver);
};

const labelSubmit = (status) => {
  if (status == "Created") {
    btnLabelSubmit.value = "Received";
  } else if (status == "Received") {
    btnLabelSubmit.value = "Delivering";
  } else if (status == "Delivering") {
    btnLabelSubmit.value = "Delivered";
  }
};
onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(idDetail);
});

const openModal = (type, id) => {
  visibleModal.value = true;
  statusForm.value = type;
  if (id) {
    idItem.value = id;
  }
};

const closeModal = () => {
  visibleModal.value = false;
  fetchDataById(idDetail);
};

const visibleBtnApproval = (status, id_comp_receiver) => {
  if (status != "Delivered") {
    visibleBtn.value = true;
    if (status == "Delivering") {
      if (id_comp_receiver == id_company) {
        visibleBtn.value = true;
      } else {
        visibleBtn.value = false;
      }
    }
  }
};

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (dataArr.value.status == "Created") {
    received();
  } else if (dataArr.value.status == "Received") {
    delivering();
  } else if (dataArr.value.status == "Delivering") {
    delivered();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Unabled to submit. Please check your data!",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#EA5455",
      color: "#ffffff",
    });
  }
};

const received = async () => {
  Api.post(`document_delivery/received/${idDetail}`)
    .then((res) => {
      let status = res.data.success == true ? "success" : "error";
      Swal.fire({
        position: "center",
        icon: status,
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchDataById(idDetail);
    })
    .catch((e) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.response.data.error,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#EA5455",
        color: "#ffffff",
      });
    });
};

const delivering = async () => {
  Api.post(`document_delivery/delivering/${idDetail}`)
    .then((res) => {
      let status = res.data.success == true ? "success" : "error";
      Swal.fire({
        position: "center",
        icon: status,
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchDataById(idDetail);
    })
    .catch((e) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.response.data.error,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#EA5455",
        color: "#ffffff",
      });
    });
};

const delivered = async () => {
  Api.post(`document_delivery/delivered/${idDetail}`)
    .then((res) => {
      let status = res.data.success == true ? "success" : "error";
      Swal.fire({
        position: "center",
        icon: status,
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchDataById(idDetail);
    })
    .catch((e) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.response.data.error,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#EA5455",
        color: "#ffffff",
      });
    });
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
</script>

<template>
  <div class="flex flex-col w-full this min-h-[300px]">
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />
      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- HEADER -->
          <div class="flex justify-between">
            <router-link
              to="/doc-delivery"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h1 class="text-blue font-semibold font-JakartaSans text-2xl">
                Document Delivery<span
                  class="text-[#0a0a0a] font-semibold font-JakartaSans text-2xl"
                >
                  / {{ dataArr.no_document_delivery }}
                </span>
              </h1>
            </router-link>
            <div class="flex justify-start gap-4 mx-4 py-4">
              <!-- <button
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
              >
                Draft
              </button> -->
              <span
                class="badge text-blue text-base font-JakartaSans font-bold capitalize w-[120px] h-[40px] border-blue bg-white text-center"
              >
                {{ dataArr.status }}
              </span>
              <!-- <button
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit
              </button> -->
            </div>
          </div>

          <div class="flex justify-between ml-10" v-if="type == 'edit'">
            <div class="flex gap-2">
              <label
                v-if="visibleBtn"
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
                @click="openModal('edit', '')"
                for="my-modal-stock-in"
              >
                Edit
              </label>
              <button
                v-if="visibleBtn"
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
                :title="btnLabelSubmit"
              >
                {{ btnLabelSubmit }}</button
              ><br />
            </div>
          </div>
          <ModalAddDelivery
            v-if="visibleModal"
            @close="closeModal"
            :status="statusForm"
            :id="idDetail"
            :data="dataArr"
          />
          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-3 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                :value="format_date(dataArr.created_at)"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created By</span
              >
              <input
                type="text"
                disabled
                v-model="dataArr.sender_name"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Received By</span
              >
              <input
                type="text"
                disabled
                v-model="dataArr.name_updated"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE-->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]">
            <div
              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
            >
              <div
                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
              ></div>
              <p class="font-JakartaSans font-normal text-sm mx-8">Details</p>
            </div>
            <div class="overflow-x-auto bg-white">
              <table class="table table-compact w-full">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      v-for="data in tableHead"
                      :key="data.Id"
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      <span class="flex justify-center items-center gap-1">
                        {{ data.title }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="font-JakartaSans font-normal text-xs">
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.sender_name }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.name_site_receiver }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.receiver_name }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.subject }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      <a
                        :href="dataArr.attachment"
                        target="_blank"
                        class="text-blue"
                      >
                        File
                      </a>
                    </td>
                    <td class="border border-[#B9B9B9]">
                      <span style="white-space: pre">
                        {{ dataArr.remarks }}</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer class="fixed bottom-0 left-0 right-0" />
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}
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
</style>
