<script setup>
    import Api from '@/utils/Api'
    import forgotPasswordImage from '@/assets/forgot-password.png'
    import arrowLeft from '@/assets/Arrow-Left.png'
    import NavbarLogin from '@/components/layout/NavbarLogin.vue'
    import Footer from '@/components/layout/Footer.vue'
    import Swal from "sweetalert2"

    import { ref } from 'vue'

    let email = ref('')
    let serverResponse = ref('')

    const forgotPassword = async () => {
        serverResponse.value = 0

        try {
            
            const token = JSON.parse(localStorage.getItem('token'))
            Api.defaults.headers.common.Authorization = `Bearer ${token}`
            const api = await Api.post(`/forget_password`, {
                email: email.value
            })
            // console.log(api)
            serverResponse.value = api.status

        } catch (error) {

            console.log(error)
            
            // position: "center",
            Swal.fire({
                icon: "error",
                title: error.response.data.error?.email || error.response.data.message,
                showConfirmButton: false,
                showCloseButton: true
            })
            
            serverResponse.value = error.response.status
            
        }

    }
    
</script>

<template>

    <div class="flex flex-col font-JakartaSans h-screen">

        <NavbarLogin />
    
        <div class="flex items-center justify-center bg-[#e4e4e6] h-full sm:px-10">
            <div class="flex flex-col flex-wrap items-center justify-center gap-8 bg-white px-[6%] py-[3%] rounded-lg">
                    
                    <div v-if="serverResponse === 0" class="text-bold text-lg text-blue bg-lime-200 py-5 w-full text-center rounded-lg">
                        Waiting for response...
                    </div>

                    <div v-if="serverResponse == 200" class="text-bold text-lg text-red bg-yellow-50 py-5 w-full text-center rounded-lg">
                        A message has been sent to your email address, check it to get your password
                    </div>

                    <div class="flex flex-wrap items-center justify-center gap-8">

                        <div class="hidden sm:block">
                            <img :src=forgotPasswordImage class="w-[574px] h-[373px] object-scale-down" alt="">
                        </div>
    
                        <div class="flex-1 h-full">
                            <div class="mx-auto mb-16">
                                <h1 class="text-3xl font-semibold">Forgot Your Password?</h1>
                                <h1 class="text-sm font-medium">Please enter the email associated with your account.</h1>
                            </div>
                            <form class="flex flex-col" @submit.prevent="forgotPassword">
                                <label for="email" class="text-sm font-medium">Email<span class="text-[#f5333f] text-sm font-semibold">*</span></label>
                                <input type="text" id="email" v-model="email" class="border-black border-2 px-4 py-3 rounded-lg mt-1" placeholder="Input Your Email">
                                <div class="flex flex-col items-center">
                                    <button @click="forgotPassword" class="bg-blue text-white py-3 px-11 rounded-lg w-[70%] mt-3">
                                        Reset Password
                                    </button>
                                    <router-link to="/">
                                        <div class="flex gap-2 items-center mt-4">
                                            <img class="w-4 h-4" :src="arrowLeft" />
                                            <span>Back to log in</span>
                                        </div>
                                    </router-link>
                                </div>
                            </form>
                        </div>
                        
                    </div>

            </div>
        </div>
    
        <Footer />

    </div>

</template>

<style scoped>



</style>
