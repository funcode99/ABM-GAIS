<script setup>
import { ref } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg"
import iconPlus from "@/assets/navbar/icon_plus.svg"
import editicon from "@/assets/navbar/edit_icon.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"

import arrow from '@/assets/arrow-multi-step-form.png'

</script>

<template>
  <label
    for="company-business-trip-request-modal"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input type="checkbox" id="company-business-trip-request-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box h-[476px]">
      
      <nav class="sticky top-0 z-50 bg-white py-4">
        <label for="company-business-trip-request-modal" class="cursor-pointer absolute right-0">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold">New Request Trip</p>
        <div className="divider m-0"></div>
      </nav>

      <div class="step-circle-indicator flex justify-center gap-x-[19px]">

        <!-- step 1 -->
        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Requester Info</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Purpose of Trip</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <!-- lebar div harus sama kaya text biar lingkarannya gak gepeng -->
        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 font-medium text-[10px]">Accomodation</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Cash Advance</h1>
          <!-- <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt=""> -->
        </div>


      </div>

      <form class="mb-3">

      </form>

      <div class="bg-white py-4 absolute bottom-0 left-4 right-4">
        <div class="flex justify-between gap-4">
          <label
            for="company-business-trip-request-modal"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</label
          >
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-box {
  max-height: calc(100vh - 5em);
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 91.666667%;
  /* max-width: 32rem 512px; */
  max-width: 700px;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-top-left-radius: var(--rounded-box, 1rem);
  border-top-right-radius: var(--rounded-box, 1rem);
  border-bottom-left-radius: var(--rounded-box, 1rem);
  border-bottom-right-radius: var(--rounded-box, 1rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
}
</style>
