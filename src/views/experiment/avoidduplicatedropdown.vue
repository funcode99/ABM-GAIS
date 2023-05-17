<script setup>
    import { ref } from 'vue'

    let options = ref([
                    {
                        name: "Option 1",
                        value: 1,
                    },
                    {
                        name: "Option 2",
                        value: 2,
                    },
                    {
                        name: "Option 3",
                        value: 3,
                    },
                    {
                        name: "Option 4",
                        value: 4,
                    },
                    {
                        name: "Option 5",
                        value: 5,
                    },
                    {
                        name: "Option 6",
                        value: 6,
                    }
    ])

    let items = ref([])
    let selectableOptions = ref([])
    let selectedValueArray = ref([])

    selectableOptions.value = options.value
    console.log(selectableOptions.value)

    const addItem = () => {
        items.value.push({
            'value' : 0
        })
    }

    const removeItem = () => {
        // items.
    }

</script>

<template>

</template>