<scrip setup>

</scrip>

<template>

    <div class="px-[20%] py-2 flex flex-col items-center">
        <h1 class="text-center">My Profile</h1>
        <div class="w-32 h-32 rounded-full bg-red-700">
            <img src="" alt="">
        </div>
    </div>

    <div class="px-[10%] sm:px-[20%] py-2">
        <form>
            <div class="grid grid-cols-2 gap-x-16 sm:gap-x-40 md:gap-x-48 lg:gap-x-60 gap-y-2">
                <div class="flex flex-col">
                    <label for="">Username*</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="text">
                </div>  
                <div class="flex flex-col">
                    <label class="w-screen">Change Password</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="password">
                </div>
                <div class="flex flex-col">
                    <label class="w-screen">Previous Passwords</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="text">
                </div>
            </div>
            <div class="flex justify-center items-center my-5">
                <button class="border-2 w-40 border-black px-3 py-1 rounded-md">Save</button>
            </div>
        </form>
    </div>

    <div class="px-[10%]">
            <h1>Details</h1>
            <hr class="border-1 border-black">
    </div>

    <div class="px-[10%] sm:px-[20%] py-2">
        <form>
            <div class="grid grid-cols-2 grid-rows-3 gap-x-16 sm:gap-x-40 md:gap-x-48 lg:gap-x-60 gap-y-2">
                <div class="flex flex-col">
                    <label for="">Username*</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="text">
                </div>  
                <div class="flex flex-col">
                    <label class="w-screen">Change Password</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="password">
                </div>
                <div class="flex flex-col">
                    <label class="w-screen">Previous Passwords</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="text">
                </div>
                <div class="flex flex-col">
                    <label for="">Username*</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="text">
                </div>  
                <div class="flex flex-col">
                    <label class="w-screen">Change Password</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="password">
                </div>
                <div class="flex flex-col">
                    <label class="w-screen">Previous Passwords</label>
                    <input class="border-2 w-24 sm:w-48 md:w-64 lg:w-80 border-[#000] p-1" type="text">
                </div>
            </div>
        </form>
    </div>

</template>