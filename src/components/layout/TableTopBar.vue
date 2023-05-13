<script setup>
    import icon_filter from "@/assets/icon_filter.svg";
    import icon_reset from "@/assets/icon_reset.svg";
    import icon_receive from "@/assets/icon-receive.svg";

    import ModalAddMenu from "@/components/system-configuration/menu/ModalAddMenu.vue"
    import ModalAddApproval from '@/components/system-configuration/approval/ModalAddApprover.vue'
    import ModalAddUser from '@/components/system-configuration/user/ModalAddUser.vue'
    import ModalAddSequence from '@/components/system-configuration/sequence/ModalAddSequence.vue'
    import ModalAddRole from "@/components/system-configuration/role/ModalAddRole.vue"

    import { ref, computed } from 'vue'

    let search = ref('')
    let pageMultiplier = ref(10)
    let pageMultiplierReactive = computed(() => pageMultiplier.value)

    const props = defineProps({
        title: String,
        modalAddType: String
    })

</script>

<template>
    <div class="bg-white rounded-t-xl pb-3 relative custom-card">

<!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
<div class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2">
  <p class="font-Poppins text-base capitalize text-[#0A0A0A] font-semibold">
    {{ props.title }}
  </p>

  <div class="flex items-center gap-4">
    
    <!-- modal add ini perlu di segregasi -->
    <ModalAddMenu @add-menu="$emit('increaseMenu')" v-if="props.modalAddType === 'menu'" />
    <ModalAddUser @add-user="$emit('increaseUser')" v-if="props.modalAddType === 'user'" />
    <ModalAddApproval @add-approver="$emit('increaseApprover')" v-if="props.modalAddType === 'approval'" />
    <ModalAddSequence @add-sequence="$emit('increaseSequence')" v-if="props.modalAddType === 'sequence'" />
    <ModalAddRole @add-role="$emit('increaseRole')" v-if="props.modalAddType === 'role'" />

    <button class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green">
      <img :src="icon_receive" class="w-6 h-6" />
    </button>

  </div>

</div>

<!-- SORT & SEARCH -->
<div class="flex flex-wrap items-center px-4 py-2 gap-y-2">

    <div class="flex flex-wrap md:grid md:grid-flow-col md:auto-cols-max items-center gap-4">
    
    <!-- sort company filter -->
    <div class="flex items-center gap-4">

    <p class="capitalize font-Fira text-xs text-black font-medium">
      Company
    </p>

    <div class="dropdown dropdown-bottom bg-white rounded-lg h-9 border">
      <button tabindex="0">
        <div tabindex="0" class="collapse collapse-arrow">
          <div class="collapse-title min-h-max py-3">
            <p
              class="flex justify-center items-center capitalize font-Fira text-xs text-black font-medium"
            >
              company
            </p>
          </div>
        </div>
      </button>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 capitalize"
      >
        <li><a>company A</a></li>
        <li><a>company B</a></li>
        <li><a>company C</a></li>
      </ul>
    </div>
    </div>

    <!-- filter & reset button -->
    <div class="flex gap-4 flex-wrap items-center">
        <button
          class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
        >
          <span>
            <img :src="icon_filter" class="w-5 h-5" />
          </span>
          Filter
        </button>
        <button
          class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
        >
          <span>
            <img :src="icon_reset" class="w-5 h-5" />
          </span>
          Reset
        </button>
    </div>

    </div>

  <div class="sm:flex-1"></div>
  
  <!-- searchbar -->
  <div class="py-2 flex md:mx-0">
    <div class="relative block">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search..."
        class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        v-model="search"
        @keyup="$emit('doSearch', search)"
      />
    </div>
  </div>
  

</div>

<!-- SHOWING -->
<div class="flex items-center gap-1 pt-2 pb-4 px-4 h-4">
  <h1 class="text-xs">Showing</h1>
  <select class="border-2 border-[#808080] rounded-lg w-15" name="" id="" v-model="pageMultiplier" @change="$emit('changeShowing', pageMultiplierReactive)">
    <option>10</option>
    <option>25</option>
    <option>50</option>
    <option>75</option>
    <option>100</option> 
  </select>
</div>

    </div>
</template>

<style scoped>
  .custom-card {
    box-shadow: 0px -4px #015289;
    border-radius: 4px;
  }
</style>