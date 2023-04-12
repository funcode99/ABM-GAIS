<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
</script>

<template>
  <label
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
      
      <div class="modal-box relative">
        <nav class="sticky top-0 z-50 bg-white py-4">
          <label for="my-modal-3" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold">New User</p>
          <div className="divider m-0"></div>
        </nav>

        <form>

          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Username<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="name"
              placeholder="Masukkan Username"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Passwords<span class="text-red">*</span></label
            >
            <input
              type="password"
              id="name"
              placeholder="Passwords"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
          </div>

          <div class="mb-6">
            <label
                for="name"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >User Role<span class="text-red">*</span></label
              >
              <div class="flex gap-2 text-[12px]">
                <input type="checkbox" name="Administrator" id="">
                <label for="">Administrator</label>
                <input type="checkbox" name="Super Admin" id="">
                <label for="">Super Admin</label>
                <input type="checkbox" name="Admin" id="">
                <label for="">Admin</label>
                <input type="checkbox" name="Receptionist" id="">
                <label for="">Receptionist</label>
                <input type="checkbox" name="Employee" id="">
                <label for="">Employee</label>
              </div>
          </div>

          <div class="mb-6">
            <label
                for="name"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Approval Authorities<span class="text-red">*</span></label
              >
              <div class="flex justify-between text-[12px]">
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="PM" id="">
                    <label for="">PM</label>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="GA" id="">
                    <label for="">GA</label>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="HR" id="">
                    <label for="">HR</label>
                </div>
                <div class="flex items-center gap-2">                
                    <input type="checkbox" name="Finance / Accounting" id="">
                    <label class="" for="">Finance / Accounting</label>
                </div>
              </div>
          </div>

          <div class="mb-6">
          <label
            for="company"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            id="company"
            >Company<span class="text-red">*</span></label
          >
          <select class="select select-accent w-40" required>
            <option disabled selected>Company</option>
            <option>Company A</option>
            <option>Company B</option>
          </select>
        </div>

        </form>

        <div class="sticky bottom-0 bg-white py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <label
              for="my-modal-3"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</label
            >
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
            >
              Save
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
  max-width: 32rem /* 512px */;
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
