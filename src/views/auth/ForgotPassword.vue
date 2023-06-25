<script setup>
    import Api from '@/utils/Api'
    import forgotPasswordImage from '@/assets/forgot-password.png'
    import NavbarLogin from '@/components/layout/NavbarLogin.vue'
    import Footer from '@/components/layout/Footer.vue'

    import { ref } from 'vue'

    let email = ref('')
    let serverResponse = ref('')

    const forgotPassword = async () => {
        serverResponse.value = 0
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/forget_password`, {
            email: email.value
        })
        console.log(api)
        serverResponse.value = api.status
    }

    let a = ref('isi')

    a = 'berisi'

    console.log(a)
    console.log(a.value)
    
</script>

<template>

    <div class="flex flex-col font-JakartaSans h-screen">

        <NavbarLogin />
    
        <div class="flex items-center justify-center bg-[#e4e4e6] h-full">
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
                            </form>
                        </div>
                    </div>

            </div>
        </div>

        <!-- <section class="w-full flex-auto font-JakartaSans">
        </section> -->
    
        <Footer />

    </div>

</template>

<style scoped>



</style>
