<script setup>
  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

  import { Modal } from "usemodal-vue3"
  import Swal from "sweetalert2"
  import Api from "@/utils/Api"

  import { ref, watch } from "vue"

  let newCurrency = ref("");
  let CurrencySymbol = ref("");
  let CurrencyCode = ref("");
  let isVisible = ref(false)
  let isAdding = ref(false)
  let modalPaddingHeight = "25vh"
  const emits = defineEmits(["unlockScrollbar", "currency-saved"]);
  
  const resetInput = () => {
  newCurrency.value = "";
  CurrencySymbol.value = "";
  CurrencyCode.value = "";
  // emits("unlockScrollbar")
  }

  const saveCurrency = async () => {
    isAdding.value = true
    isVisible.value = !isVisible.value
    setTimeout(callAddApi, 500)
  }

  const callAddApi = async () => {

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;

      await Api.post(`/currency/store`, {
        currency_name: newCurrency.value,
        currency_symbol: CurrencySymbol.value,
        currency_code: CurrencyCode.value,
      });

      resetInput()

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      })

      emits("currency-saved")

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
        title="New Currency"
      />

      <form class="pt-4" @submit.prevent="saveCurrency">
          
          <div class="mb-6 px-4 w-full">
            <label
              for="currency"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Currency<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="currency"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Currency"
              required
              v-model="newCurrency"
              @keyup.enter="$emit('currency-saved')"
            />
          </div>

          <div class="mb-6 px-4 w-full">
            <label
              for="symbol"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Symbol<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="symbol"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Symbol"
              required
              v-model="CurrencySymbol"
              @keyup.enter="$emit('currency-saved')"
            />
          </div>

          <div class="mb-6 px-4 w-full">
            <label
              for="code"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Code<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="code"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Code"
              required
              v-model="CurrencyCode"
              @keyup.enter="$emit('currency-saved')"
            />
          </div>

          <modalFooter
            @closeEdit="isVisible = false"
          />

      </form>

    </main>

    <!-- <main class="modal-box-inner-currency">
    </main> -->

  </Modal>



</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-currency {
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
  max-height: 400px !important;
  max-width: 510px !important;
}

</style>
