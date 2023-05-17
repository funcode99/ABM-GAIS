<script setup>
  import { ref } from 'vue'
  import iconClose from "@/assets/navbar/icon_close.svg"
  import { useFormAddStore } from '@/stores/add-modal.js'
  let formState = useFormAddStore()

  let username = ref('')
  let email = ref('')
  let password = ref('')
  let role = ref('Administrator')

  let isOpenModal = ref(false)

  const submitUser = () => {
    formState.user.username = username.value,
    formState.user.email = email.value
    formState.user.password = password.value
    formState.user.roleId = 1
    isOpenModal.value = !isOpenModal.value
  }

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<template>

    <label
      for="add-user-modal"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
      + Add New
    </label>

    <input type="checkbox" id="add-user-modal" class="modal-toggle" v-model="isOpenModal" />
    
    <div class="modal">
      <div class="modal-box relative">

        <div class="sticky top-0 w-full z-50 bg-white py-4">
          <label for="add-user-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold">New User</p>
          <div className="divider m-0"></div>
        </div>

        <div class="px-8 text-left modal-box-inner">
  
          <div class="mb-6">
          <span>Employee?<span class="text-red-star">*</span></span>
          <div class="flex gap-2 pt-2">
            <div class="flex gap-1">
              <!-- fill the same name value for individual select -->
              <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]" required>
              <label for="">Yes</label>
            </div>
            <div class="flex gap-1">
              <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]" required>
              <label for="">No</label>
            </div>
          </div>
          </div>

          <div class="mb-6">
              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                      Username<span class="text-red">*</span>
              </label>
              <input
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  :class="inputStylingClass"
                  required
              />
          </div>

          <div class="mb-6">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm">
              Email<span class="text-red">*</span>
            </label>
            <input
              v-model="email"
              type="text"
              placeholder="Email"
              :class=inputStylingClass
              required
            />
          </div>

          <div class="mb-6">
          <label
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Passwords<span class="text-red">*</span></label
          >
          <input
            v-model="password"
            type="password"
            placeholder="Passwords"
            :class="inputStylingClass"
            required
          />
          </div>

          <div class="mb-6 flex flex-col text-left justify-start">
          <span
            for="company"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            id="company"
            >User Role<span class="text-red">*</span></span
          >
          <select :class="inputStylingClass" v-model="role" required>
            <option disabled selected hidden>Role</option>
            <option>Administrator</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Receptionist</option>
            <option>Employee</option>
            <option>Driver</option>
          </select>
          </div>

          <div class="mb-6">
            <label
                for="name"
                class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                >Approval Authorities<span class="text-red">*</span></label
            >
            <div class="grid grid-cols-3">
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
                    <input type="checkbox" name="Treasury" id="">
                    <label class="" for="">Treasury</label>
                </div>
                <div class="flex items-center gap-2">                
                    <input type="checkbox" name="Accounting" id="">
                    <label class="" for="">Accounting</label>
                </div>
                <div class="flex items-center gap-2">                
                    <input type="checkbox" name="Atasan" id="">
                    <label class="" for="">Atasan</label>
                </div>
            </div>
          </div>

          <div class="mb-6 flex flex-col gap-2">
              <span class="text-sm">Company <span class="text-red-star">*</span></span>
              <select v-model="company" :class="inputStylingClass">
                <option>
                  Company A
                </option>
              </select>
          </div>

          <div class="mb-6 flex flex-col gap-2">
              <span class="text-sm">Location <span class="text-red-star">*</span></span>
              <select v-model="location" :class="inputStylingClass">
                <option>
                  Location A
                </option>
              </select>
          </div>

        </div>

        <div class="sticky bottom-0 bg-white px-4 py-8">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <label
              for="add-user-modal"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</label
            >
            <button @click="submitUser">
              <button
                @click="$emit('addUser')"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
              >
                Save
              </button>
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

.btn:hover {
  background-color: white;
}

</style>
