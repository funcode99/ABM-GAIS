<script setup>
    import { ref, watch } from 'vue'
    
    let activator = ref(null)
    let attach = ref(null)
    let menu = ref(false)
    let x = ref(0)
    let y = ref(0)

    let colors = ref(['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'])
    let items = ref([
        { header: 'Select an option or create one' },
        {
            text: 'Foo',
            color: 'blue'
        },
        {
            text: 'Bar',
            color: 'red'
        }
    ])
    let editing = ref(null)
    let index = ref(-1)
    
    let nonce = ref(1)
    let model = ref([{text: 'Foo', color: 'blue'}])
    let search = ref(null)

    watch(model, (next, previous) => {

        console.log(next)
        console.log(previous)

        if(next.length === previous.length) return
        model.value = next.map(v => {
            if(typeof v === 'string') {
                v = {
                    text: v,
                    color: colors.value[nonce.value - 1]
                }
                items.value.push(v)
                nonce.value++
            }
            return v
        })
    })

    const edit = (idx, item) => {
        if(!editing.value) {
            editing.value = item
            index.value = idx
        } else {
            editing.value = null
            index.value = -1
        }
    }

    const filter = (item, queryText, itemText) => {

        console.log(item)
        console.log(queryText)
        console.log(itemText)

        if(item.header.value) return false

        const hasValue = val => val != null ? val : ''
        const text = hasValue(itemText)
        const query = hasValue(queryText)
        return text.value.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1 

    }

</script>

<template>
    <div id="app">
        <v-app id="inspire">
            <v-combobox
            v-model="model"
            :filter="filter"
            :hide-no-data="!search"
            :items="items"
            :search-input.sync="search"
            hide-selected
            label="Search for an option"
            multiple
            small-chips
            solo
            >
            
            <template v-slot:append-item>
                <v-list-tile v-if="search" @click="model.push({text:search}), search=''">
                <span class="subheading">+ Add</span>
                <v-chip
                    :color="`${colors[nonce - 1]} lighten-3`"
                    label
                    small
                >
                    {{ search }}
                </v-chip>
                </v-list-tile>
            </template>

            <template v-slot:no-data>

                <v-list-tile>
                    <span class="subheading">+ Add</span>
                    <v-chip
                    :color="`${colors[nonce - 1]} lighten-3`"
                    label
                    small
                    >
                    {{ search }}
                    </v-chip>
                </v-list-tile>

            </template>

            <!-- disini selectItem nya error -->
            <template v-slot:selection="{ item, parent, selected }">

                <v-chip
                v-if="item === Object(item)"
                :color="`${item.color} lighten-3`"
                :selected="selected"
                label
                small
                >
                <span class="pr-2">
                    {{ item.text }}
                </span>
                <v-icon
                    small
                    @click="parent.selectItem(item)"
                >close</v-icon>
                </v-chip>

            </template>

            <template v-slot:item="{ index, item }">
                
                <v-list-tile-content>
                    <!-- untuk mengedit -->
                <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                >
                </v-text-field>
                <v-chip
                    v-else
                    :color="`${item.color} lighten-3`"
                    dark
                    label
                    small
                >
                    {{ item.text }}
                </v-chip>
                </v-list-tile-content>

                <v-spacer></v-spacer>

                <v-list-tile-action @click.stop>
                    <v-btn
                        icon
                        @click.stop.prevent="edit(index, item)"
                    >
                        <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
                    </v-btn>
                </v-list-tile-action>

            </template>

            </v-combobox>
        </v-app>
    </div>
</template>