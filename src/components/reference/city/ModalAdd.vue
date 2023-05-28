<script setup>
  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { Modal } from "usemodal-vue3"
  import Swal from "sweetalert2";
  import Api from "@/utils/Api";

  import { ref, watch } from "vue";

  let CityCode = ref("");
  let CityName = ref("");
  const emits = defineEmits(["unlockScrollbar", "city-saved"]);
  let isVisible = ref(false)
  let modalPaddingHeight = "25vh"
  let isAdding = ref(false)

  const resetInput = () => {
  CityCode.value = "";
  CityName.value = "";
  }

  const saveCity = async () => {
  isAdding.value = true
  isVisible.value = !isVisible.value
  setTimeout(callAddApi, 500)
  }

  const callAddApi = async () => {
  
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    await Api.post(`/city/store`, {
      city_code: CityCode.value,
      city_name: CityName.value,
    });

    // Reset the input values
    CityCode.value = "";
    CityName.value = "";

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("city-saved");

  } catch (error) {
    console.log(error);
  }

  }

  watch(isVisible, () => {

if(isAdding.value == true) {
  isAdding.value = false
} else {
  resetInput()
}

  })

</script>

<template>

  <button 
    @click="isVisible = true" 
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

    <main>

      <modalHeader
        @closeVisibility="isVisible = false"
        title="New City"
      />

      <form class="pt-4" @submit.prevent="saveCity">

        <div class="mb-6 w-full px-4">
          <label
            for="city_code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="city_code"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="City Code"
            required
            v-model="CityCode"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="city_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="city_name"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="City Name"
            required
            v-model="CityName"
          />
        </div>

        <modalFooter
            @closeEdit="isVisible = false"
          />

      </form>
  
      <!-- <main class="modal-box-inner-city">
      </main> -->

    </main>


  </Modal>

</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-city {
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
  max-height: 310px !important;
  max-width: 510px !important;
}

</style>
