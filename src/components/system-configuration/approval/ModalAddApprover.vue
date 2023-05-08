<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";

const inputStylingClass ='py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

</script>

<template>
  <label
    for="add-approver-modal"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input type="checkbox" id="add-approver-modal" class="modal-toggle" />

  <div class="modal">
    <div class="modal-box relative">

      <div class="sticky top-0 w-full z-50 bg-white py-4">
        <label for="add-approver-modal" class="cursor-pointer absolute right-0">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold">New Matrix</p>
        <div className="divider m-0"></div>
      </div>

      <div class="mb-3 px-8 text-left modal-box-inner">
        
        <div class="mb-3">
          <label for="name" class="block mb-2 font-JakartaSans font-medium text-sm">
            Nama Matrix<span class="text-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nama Matrix"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-3 flex items-center">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Menu<span class="text-red">*</span>
            </label>
            <select :class="inputStylingClass">
              <option disabled selected hidden value="">
                Menu
              </option>
              <option value="">
                ABC
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3 flex items-center">
          <div class="flex flex-col w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Company<span class="text-red">*</span>
            </label>
            <select :class="inputStylingClass">
              <option disabled selected hidden value="">
                Company
              </option>
              <option value="">
                ABC
              </option>
            </select>
          </div>
        </div>

        <h1 class="font-medium">Approver Lines <span>*</span></h1>
        <hr class="border border-black">

        <!-- scroll nya di dalam kalau semua konten masuk di container ini -->
        <table
          class="table table-zebra table-compact border w-full rounded-lg"
        >

          <thead class="text-center font-Montserrat text-sm font-bold">
            <tr class="">
              <th class="relative">
                <span class="flex justify-center">Level</span>
                <button class="absolute right-0 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="relative">
                <span class="flex justify-center">Approver Name</span>
                <button class="absolute right-1 top-0 bottom-0">
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </th>
              <th class="flex justify-center">Actions</th>
            </tr>
          </thead>

          <tbody class="bg-[#F5F5F5]">

            <tr class="text-center">
              
              <td
              >
                1
              </td>
              <td
                
              >
                John Mane
              </td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
                <button>
                  <img :src="deleteicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class="text-center">
            
              <td
              >
                2
              </td>
              <td
                
              >
                Mae X
              </td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>

                <button>
                  <img :src="deleteicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class="text-center">
            
              <td
              >
                3
              </td>
              <td
              >
                Nina Max
              </td>
              <td class="flex flex-wrap gap-4 justify-center">
                <button>
                  <img :src="editicon" class="w-6 h-6" />
                </button>
                <button>
                  <img :src="deleteicon" class="w-6 h-6" />
                </button>
              </td>
            </tr>

            <tr class='text-center'>
              <td></td>
              <td></td>
              <td class="flex justify-center"><img class="cursor-pointer" :src="iconPlus" alt=""></td>
            </tr>

            <!-- <tr v-for="data in dataDummy" :key="data.blogId">
              <td>{{ data.title }}</td>
              <td>{{ data.name }}</td>
            </tr> -->

          </tbody>
          
        </table>

      </div>



      <div class="sticky bottom-0 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <label
            for="add-approver-modal"
            class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
            Cancel
          </label>
          <button class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
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
  max-width: 32rem 
  /* 512px */;
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
