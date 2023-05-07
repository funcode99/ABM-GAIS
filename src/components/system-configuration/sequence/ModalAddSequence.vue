<script setup>
  import { ref } from 'vue'
  import iconClose from "@/assets/navbar/icon_close.svg"

  let companyTags = ref([])
  let siteTags = ref([])

  // let tagNoRef = []

  const handleChangeCompanyTag = (newTag) => {
    // akan memasukkan nilai primitive
    companyTags.value = newTag
    // akan memasukkan array dalam array
    // tagNoRef.push(newTag)
  }

  const handleChangeSiteTag = (newTag) => {
    siteTags.value = newTag
  }

</script>

<template>
  
    <label
      for="add-user-modal"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
      >
      + Add New
      </label>

    <input type="checkbox" id="add-user-modal" class="modal-toggle" />
    
    <div class="modal">

      <div class="modal-box relative">

        <div class="sticky top-0 z-50 bg-white py-4">
          <label for="add-user-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold">New Sequence</p>
          <div className="divider m-0"></div>
        </div>

        <div>

          <div class="flex">
            <div class="mb-6">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Nama<span class="text-red">*</span></label
            >
            <input
              type="text"
              placeholder="Nama Sequence"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
            </div>

            <div class="flex-1"></div>

            <div class="mb-6">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Next Value<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="name"
              placeholder="Next Value"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
            </div>   
          </div>

          <div class="flex">

            <div class="mb-6">
            <label
              for="company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              id="company"
              >Menu<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40" required>
              <option disabled selected hidden>Menu</option>
              <option>Administrator</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Receptionist</option>
              <option>Employee</option>
              <option>Driver</option>
            </select>
            </div>

            <div class="flex-1"></div>

            <div class="mb-6">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Sequence Size<span class="text-red">*</span></label
            >
            <input
              type="text"
              placeholder="Sequence Size"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
            </div>

          </div>

          <div class="flex">
            
            <div class="mb-6">
            <label
              for="company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              id="company"
              >Recycle by<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40" required>
              <option disabled selected hidden>Month</option>
              <option>Administrator</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Receptionist</option>
              <option>Employee</option>
              <option>Driver</option>
            </select>
            </div>

            <div class="flex-1"></div>
            
            <div class="mb-6">
            <label
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Prefix<span class="text-red">*</span></label
            >
            <input
              type="text"
              placeholder="Prefix"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
            </div>

          </div>
  
          <div class="flex">

            <div class="mb-6">
              <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Suffix<span class="text-red">*</span></label
              >
              <input
                type="text"
                id="name"
                placeholder="Suffix"
                class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                required
              />
            </div>

            <div>

            </div>
            
          </div>


        </div>

        <div class="sticky left-0 right-0 bottom-0 z-50 bg-white px-4 py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <label
              for="add-user-modal"
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

.btn:hover {
  background-color: white;
}

</style>
