<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_jurnal from "@/assets/icon_jurnal.svg";

const emits = defineEmits(["unlockScrollbar"]);

const tableHead = [
  { Id: 1, title: "Item", jsonData: "item_name" },
  { Id: 2, title: "PK", jsonData: "pk" },
  { Id: 3, title: "Doc Date", jsonData: "doc_date" },
  { Id: 4, title: "G/L Account", jsonData: "gl_account" },
  { Id: 5, title: "Account Short Text", jsonData: "account_text" },
  { Id: 6, title: "Amount", jsonData: "amount" },
  { Id: 7, title: "Text", jsonData: "text" },
  { Id: 8, title: "Cost Center", jsonData: "cost_center_name" },
  { Id: 9, title: "Profit Center", jsonData: "profit_status" },
  { Id: 10, title: "Posting Date", jsonData: "posting_date" },
];
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    type="button"
    class="btn btn-sm mx-4 text-white text-base font-JakartaSans font-bold capitalize bg-blue border-blue hover:bg-blue hover:border-blue hover:text-white"
  >
    <span> <img :src="icon_jurnal" class="w-5 h-5 mr-2" /> </span>Jurnal
  </label>

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative w-11/12 max-w-5xl">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Jurnal
        </p>
      </nav>

      <main class="modal-box-inner">
        <div class="sticky top-0 bg-white">
          <div
            class="flex flex-wrap justify-start gap-2 items-center px-8 py-2"
          >
            <button
              class="btn w-[100px] text-white text-base font-JakartaSans font-bold capitalize bg-blue border-blue hover:bg-white hover:border-blue hover:text-blue"
            >
              Edit
            </button>

            <button
              class="btn w-[100px] text-white text-base font-JakartaSans font-bold capitalize bg-green border-green hover:bg-white hover:border-green hover:text-green"
            >
              Posting
            </button>

            <button
              class="btn w-[100px] text-white text-base font-JakartaSans font-bold capitalize bg-[#FF9900] border-[#FF9900] hover:bg-white hover:border-[#FF9900] hover:text-[#FF9900]"
            >
              Reverse
            </button>
          </div>
        </div>

        <div class="flex flex-wrap justify-around items-center pt-4">
          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Number</label
            >
            <input
              type="text"
              name="doc_number"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Doc Number"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company Code</label
            >
            <input
              type="text"
              name="company_code"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Company Code"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Date</label
            >
            <input
              type="text"
              name="doc_date"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Doc Date"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Posting Date</label
            >
            <input
              type="text"
              name="post_date"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Posting Date"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Ref Doc</label
            >
            <input
              type="text"
              name="ref_doc"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Ref Doc"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Fiscal Year</label
            >
            <input
              type="text"
              name="fiscal_year"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Fiscal Year"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Currency</label
            >
            <input
              type="text"
              name="currency"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Currency"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Period</label
            >
            <input
              type="text"
              name="period"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Period"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Order</label
            >
            <input
              type="text"
              name="order"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Order"
              disabled
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Claim Category</label
            >
            <input
              type="text"
              name="claim_category"
              class="font-JakartaSans capitalize block bg-white w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed"
              placeholder="Claim Category"
              disabled
            />
          </div>
        </div>

        <!-- TABLE -->
        <div class="pb-4">
          <div class="table-wrapper">
            <table>
              <thead class="text-center font-JakartaSans text-sm font-bold">
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
                  </span>
                </th>
              </thead>
              <tbody>
                <tr class="font-JakartaSans font-normal text-sm text-center">
                  <td>1</td>
                  <td>31</td>
                  <td>27/03/23</td>
                  <td>231321234</td>
                  <td>Employee</td>
                  <td>231.000</td>
                  <td>Meals</td>
                  <td>902922</td>
                  <td>9900</td>
                  <td>28/02/23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
  width: 100%;
}

.modal-box-inner {
  height: 500px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.table-wrapper {
  overflow-y: scroll;
  overflow-x: scroll;
  height: fit-content;
  max-height: 66.4vh;
  margin-top: 22px;
  margin: 25px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid rgb(229, 228, 228);
}

table {
  min-width: max-content;
}

table tbody :hover {
  background-color: rgb(193, 192, 192);
  cursor: pointer;
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
}

table th {
  position: sticky;
  top: 0px;
  font-weight: normal;
  padding: 8px;
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}

table th,
table td {
  padding: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}

table td {
  font-size: 15px;
  padding-left: 20px;
}
</style>
