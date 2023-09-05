<script setup>
import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"
import Swal from "sweetalert2"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"
import FieldTitle from "@/components/atomics/FieldTitle.vue"

import BookingService from "@/utils/Api/facility-service-system/booking-room-meeting/bookingMeetingRoom.js"

const emits = defineEmits(["success", "close"])

const dialog = ref(false)

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  dialog: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
  },
})

const form = ref({
  notes: null,
})

const submit = async () => {
  let res
  const bookingId = props.data.id
  const payload = {
    notes: form.value.notes,
  }

  if (props.type == "approve") {
    res = await BookingService.approveMeeting(bookingId, payload)
  } else {
    res = await BookingService.cancelMeeting(bookingId, payload)
  }

  if (await res.data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    })

    emits("close")
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}
</script>

<template>
  <slot>
    <button
      type="button"
      @click="dialog = true"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >
      + Add New
    </button>
  </slot>

  <Modal
    width="600px"
    v-model:visible="props.dialog"
    @onUnVisible="emits('close')"
  >
    <modalHeader
      class="capitalize"
      @closeVisibility="emits('close')"
      :title="`${props.type} Booking Meeting`"
    />
    <form @submit.prevent="submit()">
      <main class="overflow-y-scroll max-h-[70vh]">
        <div class="px-5 pt-5">
          Are you sure want to
          <span
            class="font-bold"
            :class="{
              'text-error': type == 'reject',
              'text-error': type == 'cancel',
              'text-green': type == 'approve',
            }"
            >{{ props.type }}
          </span>
          this booking?
        </div>
        <div class="p-5 grid gap-3 h-auto">
          <div class="flex gap-5">
            <div class="basis-full">
              <FieldTitle class="capitalize" :label="`Notes`" mandatory />
              <textarea
                type="text"
                rows="5"
                v-model="form.notes"
                class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Notes"
                style="resize: none"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </main>
      <modalFooter @closeEdit="emits('close')" class="py-3 b-white" />
    </form>
  </Modal>
</template>
