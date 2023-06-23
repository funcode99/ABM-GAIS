<script setup>
    import Api from '@/utils/Api'
    import forgotPasswordImage from '@/assets/forgot-password.png'
    import NavbarLogin from '@/components/layout/NavbarLogin.vue'
    import Footer from '@/components/layout/Footer.vue'

    import { ref } from 'vue'

    let email = ref('')

    const forgotPassword = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/forget_password`, {
            email: email.value
        })
        console.log(api)
    }
    
</script>

<template>

    <NavbarLogin />

    <section class="w-full h-screen font-JakartaSans">
        <div class="flex items-center justify-center py-[30px] bg-[#e4e4e6] w-full h-full">
                <div class="flex flex-wrap items-center justify-center gap-8 bg-white px-[6%] py-[3%] rounded-lg">
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
    </section>

    <Footer />

</template>