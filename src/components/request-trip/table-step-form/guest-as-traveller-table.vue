<script setup>
    const tableHeadTravellers = [
        {id: 1, title: 'Name'},
        {id: 3, title: 'Gender'},
        {id: 4, title: 'Contact No'},
        {id: 5, title: 'Department'},
        {id: 6, title: 'Company'},
        {id: 7, title: 'Type'},
        {id: 8, title: 'Max Hotel Fare'},
        {id: 9, title: 'Flight Class'},
        {id: 10, title: 'Action'}
    ]
</script>

<template>

    <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">    
    </div>

    <div class="overflow-x-auto mt-5">

      <table class="table">

        <thead>
          <tr>
            <th v-for="data in tableHeadTravellers" :key="data.id">
              {{ data.title }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="data in travellerGuestTable" :key="data.id">
            <td>
              {{ data.name_guest }}
            </td>
            <td>
              {{ data.gender }}
            </td>
            <td>
              {{ data.contact_no }}
            </td>
            <td>
              <!-- kenapa departement nya cuma id -->
              {{ data.departement }}
            </td>
            <td>
              {{ data.company }}
            </td>
            <td>
              {{ data.type_traveller }}
            </td>
            <td>
              {{ data.hotel_fare }}
            </td>
            <td>
              {{ data.flight_class }}
            </td>
            <td>
    
            </td>
          </tr>
        </tbody>

      </table>

    </div>

</template>