<script setup>
  import tail from "@/assets/topbar-image.png";
  import highlight from "@/assets/navbar/highlight_logo.svg";
  import user from "@/assets/navbar/user.svg";
  import ABMIcon from '@/assets/abm.png'
</script>

<template>

  <div class="flex fixed justify-between md:justify-start w-full bg-white zInfinite top-0">

    <div class="flex justify-center items-center h-[115px] min-w-[100px] md:min-w-[260px] z-50">
        <img :src=ABMIcon class="w-[57px] h-[43px] md:w-[114px] md:h-[86px]" alt="">
    </div>
    
    <div class="navbar bg-base-100 py-0 px-0 h-[115px]">
  
      <div class="navbar-start hidden md:block">
        <img :src="tail" class="w-[365px] h-[115px]" />
      </div>
  
      <div class="hidden navbar-center md:flex justify-center items-center">
        <img :src="highlight" class="w-[120px] h-[79px]" />
      </div>
  
      <div class="navbar-end">
        
        <div class="md:grid md:grid-flow-col md:auto-cols-max">

            <div class="flex justify-center items-center ">
             
              <div>
  
                <div class="dropdown dropdown-end">
                  <button class="mx-10 hover:scale-125" tabindex="0">
                    <div class="indicator hover:bg-slate-300 hover:rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span
                        class="badge badge-sm bg-[#F04438] border-none indicator-item"
                        >8</span
                      >
                    </div>
                  </button>
                  <ul tabindex="0" class="border-black border-2 dropdown-content menu p-3 shadow bg-base-100 rounded-box w-52">
                    <li><a>Contoh kalimat panjang 1, apakah yang akan terjadi</a></li>
                    <li><a>Notifikasi 2</a></li>
                    <li><a>Notifikasi 3</a></li>
                  </ul>
                </div>
  
              </div>
  
              <div class="rounded-full bg-[#E4E4E4] grid grid-flow-row md:auto-cols-max w-[195px] h-[60px]">
  
                <div class="flex justify-center items-center px-3">
                  
                  <div class="avatar">
                    <div class="w-10 rounded-full">
                      <div class="w-[42px] h-[42px]">
                        <img :src="user" class="background w-[42px] h-[42px]" />
                      </div>
                    </div>
                  </div>
  
                  <div class="dropdown dropdown-end">
                    <button tabindex="0">
                      <div tabindex="0" class="collapse collapse-arrow">
                        <div class="collapse-title min-h-max py-3">
                          <p
                            class="font-Montserrat text-sm justify-center items-center"
                          >
                            Halo, User
                          </p>
                        </div>
                      </div>
                    </button>
                    <ul
                      tabindex="0"
                      class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li><a>Profile</a></li>
                      <li><a>Settings</a></li>
                      <li><a>Logout</a></li>
                    </ul>
                  </div>
  
                </div>
  
              </div>
  
            </div>

        </div>
      </div>
  
    </div>

  </div>
  
</template>

<style scoped>
  .background {
    background-color: #3e5aed;
  }

  .zInfinite {
    z-index: 999;
  }

</style>