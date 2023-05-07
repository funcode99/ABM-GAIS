<script setup>
    import { ref } from 'vue'
    import { Modal } from 'usemodal-vue3'
    import iconClose from "@/assets/navbar/icon_close.svg"
    import editIcon from "@/assets/navbar/edit_icon.svg"

    let isVisible = ref(false)
    let type = '' 
    let modalPaddingHeight = 50

    const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<template>
    
    <button @click="isVisible = !isVisible" class="cursor-pointer">
        <img :src="editIcon" class="w-6 h-6" />
    </button>

    <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

        <div class="sticky w-full top-0 z-50 bg-white px-8 pb-4 pt-8 flex justify-between">
            <p class="font-JakartaSans text-2xl font-semibold">Edit User</p>
            <button @click="isVisible = false" class="cursor-pointer">
                <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </button>
        </div>

        <div class="px-8 text-left modal-box-inner">

            <div class="mb-6">
            <span>Employee?<span class="text-red-star">*</span></span>
            <div class="flex gap-2 pt-2">
              <div class="flex gap-1">
                <!-- fill the same name value for individual select -->
                <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]">
                <label for="">Yes</label>
              </div>
              <div class="flex gap-1">
                <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]">
                <label for="">No</label>
              </div>
            </div>
            </div>

            <div class="mb-6">
                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                        Username<span class="text-red">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Username"
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
              type="password"
              placeholder="Passwords"
              :class=inputStylingClass
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
            <select :class=inputStylingClass required>
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
                    <div class="flex justify-between">
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
            <span>Company <span class="text-red-star">*</span></span>
            <vue3-tags-input :tags="tags" placeholder="Company Tag" @on-tags-changed="handleChangeCompanyTag" />
          </div>

          <div class="mb-6">
            <span>Site <span class="text-red-star">*</span></span>
            <vue3-tags-input :tags="tags" placeholder="Site Tag" @on-tags-changed="handleChangeSiteTag" />
          </div>


            <div class="mb-6">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Email<span class="text-red">*</span></label
            >
            <input
              type="text"
              placeholder="Email"
              :class=inputStylingClass
              required
            />
            </div>

        </div>

        <div class="sticky bottom-0 bg-white px-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <button
                @click="isVisible = false"
                class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</button
            >
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
            >
              Save
            </button>
          </div>
        </div>

    </Modal>

</template>