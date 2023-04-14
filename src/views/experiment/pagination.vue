<script>
    export default {
    created() {
     this.paginate_total = this.heroes.length/this.paginate;
   },
   data() {
    return {
    current: 1,
    heroes: [
    { id: 1, name: 'Wolverine', universe: 'Marvel'},
    { id: 2, name: 'Batman', universe: 'DC' },
    { id: 3, name: 'Beast', universe: 'Marvel'},
    { id: 4, name: 'Superman', universe: 'DC' },
    { id: 5, name: 'Wonder Woman', universe: 'DC' },
    { id: 6, name: 'Iceman', universe: 'Marvel'},
    { id: 7, name: 'Black Panther', universe: 'Marvel'},
    { id: 8, name: 'Beast Boy', universe: 'DC' },
    { id: 9, name: 'Captain America', universe: 'Marvel'},
    { id: 10, name: 'Hawkgirl', universe: 'DC' },
    { id: 11, name: 'Cyclops', universe: 'Marvel'},
    { id: 12, name: 'Green Lantern', universe: 'DC' },
    { id: 13, name: 'Thor', universe: 'Marvel'},
    { id: 14, name: 'Flash', universe: 'DC' },
    { id: 15, name: 'Spider-man', universe: 'Marvel'},
    { id: 16, name: 'Martian Manhunter', universe: 'DC' },
    { id: 17, name: 'Nightwing', universe: 'DC' },
    { id: 18, name: 'Raven', universe: 'DC' },
    { id: 19, name: 'Hulk', universe: 'Marvel'},
    { id: 20, name: 'Shehulk', universe: 'Marvel'}
],
     paginate: 5,
     paginate_total: 0,
     search_filter: '',
     status_filter: ''
    }
   },
   methods: {
     setPaginate: function (i) {
       if (this.current == 1) {
         return i < this.paginate;
       }
       else {
         return (i >= (this.paginate * (this.current - 1)) && i < (this.current * this.paginate));
       }
     },
     setStatus: function (status) {
       this.status_filter = status;
       this.$nextTick(function () {
         this.updatePaginate();
       });
     },
     updateCurrent: function (i) {
       this.current = i;
     },
     updatePaginate: function () {
       this.current = 1;
       this.paginate_total = Math.ceil(document.querySelectorAll('tbody tr').length/this.paginate);
     }
   }
}
</script>

<script setup>
</script>

<template>

<div id="heroes">
  <!-- <form class="form-inline">
    <input type="text" class="form-control " placeholder="Search" v-model="search_filter" @keyup="updatePaginate">
    <button @click.prevent="setStatus('')">All</button>
    <button @click.prevent="setStatus('DC')">DC</button>
    <button @click.prevent="setStatus('Marvel')">Marvel</button>
  </form> -->

<table class="table table-striped">
  <thead>
    <tr>
        <td>Hero Name</td>
        <td>Universe</td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="({name, universe, id}, index) in heroes" v-show="setPaginate(index)" :key="id">
      <td>{{ name }}</td>
      <td>{{ universe }}</td>
    </tr>
  </tbody>
</table>
<div id="pagination">
  <a href="#" class="btn btn-default" v-for="page_index in paginate_total" @click.prevent="updateCurrent(page_index)" :key="page_index">
    {{ page_index }}
  </a>
</div>
</div>

</template>

<style scoped>
table thead {
    font-weight: bold;
    font-size: 20px;
}
</style>