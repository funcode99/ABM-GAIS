<script setup>
  import loginImage from '@/assets/login-frame.png'
  import closeEye from '@/assets/eye-off.png'
  import openEye from '@/assets/eye.png'

  import NavbarLogin from '@/components/layout/NavbarLogin.vue'
  import Footer from '@/components/layout/Footer.vue'

  import { ref } from 'vue'
  import Api from '@/utils/Api'
  import router from '@/router'

  const username = ref('')
  const password = ref('')
  const isHide = ref(true)

  const submit = async () => {
      console.log('masuk ke submit')
    try {


        // store.commit('isLoading', true);
        const data = await Api.post('/login', 
        {
            username: username.value,
            password: password.value
        }
        )
        // tambah withCredentials malah error :(
        // console.log(JSON.stringify(data.data.users.id_employee))
        //add local storage tomy

        let deleteBacktick = data.data.users.logo_path.replaceAll('"', '')
        // console.log('mengganti menjadi backtick')
        // console.log(deleteBacktick)

        localStorage.setItem('token', JSON.stringify(data.data.token.data.access_token))
        localStorage.setItem('id_company', JSON.stringify(data.data.users.id_company))
        localStorage.setItem('id_role', JSON.stringify(data.data.users.id_role))
        localStorage.setItem('id_employee', JSON.stringify(data.data.users.id_employee))
        localStorage.setItem('company_logo', deleteBacktick)

        // $cookies.set('token', data.data.data.access_token)
        // store.commit('isLoading', false);
        router.push('/user');

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

  <div class="flex flex-col h-[100vh]">
    
    <NavbarLogin />
  
    <!-- content -->
      <div class="flex items-center justify-center content py-[20px] lg:py-[30px] bg-[#e4e4e6]">
  
          <div class="flex flex-wrap items-center justify-center gap-8 bg-white px-[2%] lg:px-[6%] py-[1%] lg:py-[3%] rounded-lg">
            
            <div class="hidden sm:block">
                <img :src=loginImage class="w-[292px] h-[200px] md:w-[408px] md:h-[280px] 2xl:w-[544px] 2xl:h-[373px] object-scale-down" alt="">
            </div>
       
            <div class="mx-auto">
                <div class="mt-2 lg:mt-6 text-black">
                            
                    <div class="mb-2 lg:mb-5 pb-1 border-b-2 text-center font-semibold">
                        <h1 class="text-xl lg:text-3xl">Welcome to GAIS</h1>
                    </div>
    
                    <div class="text-sm text-center font-semibold text-black capitalize mb-5 lg:mb-20">
                        please login to your account
                    </div>
    
                    <div class="mb-2 lg:mt-8">
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
                                    class="text-base block px-2 py-1 md:px-3 md:py-2 xl:px-4 xl:py-3 rounded-lg w-full placeholder:text-base bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                  />
                          </div>
                          <!-- password -->
                          <div class="py-2">
                                  <span class="px-1 font-medium text-sm text-black"
                                    >Password</span
                                  >
                                  <div class="px-2 py-1 md:px-3 md:py-2 xl:px-4 xl:py-3 rounded-lg w-full bg-white border-2 border-gray-300 flex items-center shadow-md">
                                      <input
                                      @keyup.enter="submit"
                                        v-model="password"
                                        :type="isHide ?  'password' : 'text'"
                                        placeholder="Input Passwords"
                                        class="w-full text-base placeholder:text-base block placeholder-gray-600  focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none "> 
                                      <span class="" @click="isHide = !isHide">
                                          <img :src="isHide ? closeEye : openEye" class="w-5 h-5">
                                      </span>
                                  </div>
                          </div>
                          <!-- remember me & forgot password -->
                          <div class="flex justify-between text-sm">
                                  <div class="flex gap-2 items-center">
                                    <input type="checkbox">
                                    <h1>Remember me</h1>
                                  </div>
                                  <router-link to="/forgot">
                                    <p class="underline cursor-pointer text-[#015289]">Forgot Password?</p>
                                  </router-link>
                          </div>
                          <!-- login button -->
                          <button class="text-sm sm:text-base lg:text-lg font-semibold bg-[#015289] w-full text-white rounded-lg  px-4 lg:px-6 py-2 lg:py-3 mt-5 block shadow-xl hover:text-white hover:bg-black" @click="submit">
                            Login
                          </button>
                          <h1 class="text-center py-2 lg:py-5 font-bold">OR</h1>
                          <!-- login via falcon button -->
                          <button class="text-sm sm:text-base lg:text-lg font-semibold bg-[#015289] w-full text-white rounded-lg px-4 lg:px-6 py-2 lg:py-3 block shadow-xl hover:text-white hover:bg-black">
                                  Login via Falcon
                          </button>
                      </div>
                    </div>
    
                </div>
            </div>
         
          </div>
  
      </div>

    <!-- footer -->
    <Footer />

  </div>


</template>

<style scoped>
  .content {
    flex: 1 1 auto !important;
  }
</style>