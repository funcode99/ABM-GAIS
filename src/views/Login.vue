<script setup>
  import loginImage from '@/assets/login-frame.png'
  import tailImage from '@/assets/topbar-image.png'
  import abmImage from '@/assets/abm.png'
</script>

<template>
  <!-- navbar -->
  <div class="flex justify-between bg-base-100">
    <img :src=tailImage alt="" class="w-[285.85px] h-[90.27px]">
    <img :src=abmImage alt="" class="w-[57px] h-[43px] md:w-[114px] md:h-[86px]">
    <img src="" alt="">
    <div class="">
  </div>

  </div>

  <!-- konten -->
  <section class="h-full w-full">
    <div class="w-full h-full flex items-center px-6">
      <div class=" flex flex-wrap items-center justify-center">
        <div class="">
            <img :src=loginImage alt="">
        </div>
        <form>
            <div >
              <div class="font-sans">
                <div class="mx-auto px-6">
                  <div class="relative flex flex-wrap">
                    <div class="w-full relative">
                      <div class="mt-6">
                        <div
                          class="mb-5 pb-1border-b-2 text-center font-base text-gray-700"
                        >
                          <h1>Welcome to GAIS</h1>
                        </div>
                        <div
                          class="text-center font-semibold text-black capitalize"
                        >
                          please login to your account
                        </div>

                        <form class="mt-8">
                          <div class="mx-auto max-w-lg">
                            <!-- username -->
                            <div class="py-2">
                              <span class="px-1 text-sm text-gray-600"
                                >Username</span
                              >
                              <input
                                placeholder="username"
                                type="text"
                                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                              />
                            </div>
                            <!-- password -->
                            <div class="py-2">
                              <span class="px-1 text-sm text-gray-600"
                                >Password</span
                              >
                              <div class="relative">
                                <input
                                  placeholder="password"
                                  class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div class="flex justify-center">
                              <p>Forgot Your Password?</p>
                            </div>
                            <button
                              class="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </form>
      </div>
    </div>
  </section>

  <!-- footer -->
  <footer class="p-4 bg-base-100 w-full flex justify-center text-center fixed bottom-0">
      <div class="text-[#9e9e9e] relative">
        <p class="text-center">© PT SINERGI INFORMATIKA SEMEN INDONESIA - 2023</p>
      </div>
  </footer>
</template>
