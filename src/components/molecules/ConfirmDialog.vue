<template>
  <div></div>
</template>

<script setup>
import Swal from "sweetalert2"

import icondanger from "@/assets/Danger.png"
import iconClose from "@/assets/navbar/icon_close.svg"

const props = defineProps({
  title: {
    type: String,
    default: "Are you sure want to delete this?",
  },
})

const emit = defineEmits(["confirm", "cancel"])

Swal.fire({
  template: "my-template",
  title: `<span class='font-JakartaSans font-medium text-[28px]'>${props.title}</span>`,
  html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
  iconHtml: `<img src="${icondanger}" />`,
  showCloseButton: true,
  closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
  showCancelButton: true,
  buttonsStyling: false,
  cancelButtonText: "Cancel",
  customClass: {
    cancelButton: "swal-cancel-button",
    confirmButton: "swal-confirm-button",
  },
  reverseButtons: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes",
}).then((result) => {
  if (result.isConfirmed) {
    emit("confirm")

    emit("cancel")
  } else {
    emit("cancel")
  }
})
</script>
