<script setup>
  import loginImage from '@/assets/login-frame.png'
  import tailImage from '@/assets/topbar-image.png'
  import abmImage from '@/assets/abm.png'
  import NavbarLogin from '@/components/layout/NavbarLogin.vue'
  import Footer from '@/components/layout/Footer.vue'

  import { ref } from 'vue'
  import Api from '@/utils/Api';
  import router from '@/router';

  const username = ref('')
  const password = ref('')

  const submit = async () => {
      console.log('masuk ke submit')
    try {
        // store.commit('isLoading', true);
        const data = await Api.post('/login', {
            username: username.value,
            password: password.value
        })
        // console.log(data.data.data.access_token)
        localStorage.setItem('token', JSON.stringify(data.data.data.access_token))
        // $cookies.set('token', data.data.data.access_token)
        // store.commit('isLoading', false);
        router.push('/menu');
    } catch (error) {
        console.log(error)
        if (error?.response?.status === 400) {
            // router.push('/registration')
        }
        else {
            // store.commit('isLoading', false);
            // const toast = useToast();
            // toast.error(error?.response?.data?.message, {
            //     position: 'top-center',
            //     timeout: 2000
            // });
        }
    }
}

</script>

<template>
  
  <!-- navbar -->
  <!-- <div class="flex justify-between bg-base-100">
    <img :src=tailImage alt="" class="w-[285.85px] h-[90.27px]">
    <img :src=abmImage alt="" class="w-[57px] h-[43px] md:w-[114px] md:h-[86px]">
    <img src="" alt="">
    <div class=""></div>
  </div> -->

  <div class="max-h-[100vh]">
    
    <NavbarLogin />
  
    <!-- content -->
    <section class="h-full w-full font-JakartaSans">
      <div class="flex items-center justify-center py-[30px] bg-[#e4e4e6] w-full h-full">
  
        <div class="flex flex-wrap items-center justify-center gap-8 bg-white px-[6%] py-[3%] rounded-lg">
          <div class="hidden sm:block">
              <img :src=loginImage class="w-[544px] h-[373px] object-scale-down" alt="">
          </div>
          <div class="flex-1 h-full">
            <div class="mx-auto">
              <div class="mt-6 text-black">
                          
                  <div
                            class="mb-5 pb-1border-b-2 text-center font-semibold"
                          >
                            <h1 class="text-3xl">Welcome to GAIS</h1>
                  </div>
  
                  <div
                            class="text-center font-semibold text-black capitalize mb-20"
                          >
                            please login to your account
                  </div>
  
                  <div class="mt-8">
                    <div class="mx-auto max-w-lg">
                              <!-- username -->
                              <div class="py-2">
                                <span class="px-1 font-medium text-sm text-black"
                                  >Username</span
                                >
                                <input
                                v-model="username"
                                  placeholder="Input Username"
                                  type="text"
                                  class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                              </div>
                              <!-- password -->
                              <div class="py-2">
                                <span class="px-1 font-medium text-sm text-black"
                                  >Password</span
                                >
                                <div class="relative">
                                  <input
                                    v-model="password"
                                    placeholder="Input Passwords"
                                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                  />
                                </div>
                              </div>
                              <div class="flex justify-between text-sm">
                                <div class="flex gap-2 items-center">
                                  <input type="checkbox">
                                  <h1>Remember me</h1>
                                </div>
                                <router-link to="/forgot">
                                  <a class="underline cursor-pointer text-[#015289]">Forgot Password?</a>
                                </router-link>
                              </div>
                              <button
                                @click="submit"
                                class="text-lg font-semibold bg-[#015289] w-full text-white rounded-lg px-6 pt-3 pb-3 mt-5 block shadow-xl hover:text-white hover:bg-black"
                              >
                                Login
                              </button>
                              <h1 class="text-center py-5 font-bold">OR</h1>
                              <button
                                class="text-lg font-semibold bg-[#015289] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                              >
                                Login via Falcon
                              </button>
                    </div>
                  </div>
  
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </section>
  
    <!-- footer -->
    <Footer />
  </div>


</template>
