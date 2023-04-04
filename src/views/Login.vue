<script setup></script>

<template>
  <!-- navbar -->
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <!-- logo -->
      <a class="normal-case text-xl">ABM</a>
    </div>
    <div class="flex-none">
      <ul class="menu-horizontal px-1">
        <li><a>FAQ</a></li>
        <div class="px-4">|</div>
        <li><a>Contact Us</a></li>
      </ul>
    </div>
  </div>

  <!-- konten -->
  <section class="h-screen">
    <div class="container h-full px-6">
      <div
        class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between"
      >
        <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
            alt="Phone image"
          />
        </div>
        <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
          <form>
            <div class="container max-w-full mx-auto lg:py-24 md:py-4 px-6">
              <div class="font-sans">
                <div class="max-w-sm mx-auto px-6">
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
    </div>
  </section>

  <!-- footer -->
  <footer class="footer p-4 bg-base-100 text-black fixed bottom-0 left-0">
    <div class="items-center grid-flow-col">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        class="fill-current"
      >
        <path
          d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
        ></path>
      </svg>

      <p>© PT SINERGI INFORMATIKA SEMEN INDONESIA - 2023</p>
    </div>
  </footer>
</template>
