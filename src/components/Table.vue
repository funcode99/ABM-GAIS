<script setup>
    import searchIcons from '@/assets/search-normal.png'
    import datas from '@/utils/Api/data'
</script>

<template>
    <div class="bg-[#e4e4e6] w-screen flex items-center justify-center h-screen">
        <div class="md:w-5/6 lg:w-11/12 md:max-h-3/4 rounded-lg bg-white p-4">
            <div class="flex justify-between items-center">
                <h1 class="text-base font-semibold">User</h1>
                <button class="rounded-lg py-3 px-6 bg-[#87c556] leading-[18px] text-xs text-white">
                    + Add New
                </button>
            </div>
            <div class="flex justify-between">
                <div>
                    <div class="py-3 flex gap-x-4">
                        <div class="flex items-center gap-4">
                            <h1>Sort</h1>
                            <select class="py-1 px-2 rounded-lg outline-none border-2 border-slate-100">
                                <option disabled selected hidden>A To Z</option>
                            </select>
                        </div>
                        <div class="flex gap-4 items-center">
                            <h1>Company</h1>
                            <select class="py-1 px-2 rounded-lg outline-none border-2 border-slate-100">
                                <option disabled selected hidden>Company</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex items-center py-3">
                        <div class="border-2 border-slate-100 rounded-lg flex items-center">
                            <button class="rounded-l-lg h-8 pl-2 pr-1 lg:pl-4 lg:pr-2 outline-none flex items-center justify-center" ><img class="h-5 w-5" :src=searchIcons alt="search"></button>
                            <input class="rounded-r-lg w-24 lg:w-36 xl:w-full h-8 pl-1 pr-2 lg:pl-2 lg:pr-4 outline-none" type="text">
                        </div>
                </div>
            </div>
            <div class="border-2 border-black rounded-lg mt-1">
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <!-- head -->
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>User Role</th>
                            <th>Approval Authorities</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in datas" :key="data.blogId">
                                <th>
                                    {{ data.blogId + 1 }}
                                </th>
                                <td>
                                    {{ data.title }}
                                </td>
                                <td>
                                    {{ data.name }}
                                </td>
                                <td>
                                    {{ data.title }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>