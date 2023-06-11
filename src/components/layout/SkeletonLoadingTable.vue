<script setup>
    const props = defineProps({
        row: Number,
        column: Number
    })
</script>

<template>
    <tbody class="animate-pulse">
        <tr v-for="data in props.row">      
            <td v-for="data in props.column">
                <div class="w-[80%] h-5 bg-slate-700 mx-auto"></div>
            </td>
        </tr>
    </tbody>
</template>