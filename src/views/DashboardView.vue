<script setup>
import { computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, BarElement, CategoryScale, LinearScale, Title } from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

// legend nya dihapus biar gaada keterangan
ChartJS.register(ArcElement, Tooltip, BarElement, CategoryScale, LinearScale, Title)

    const dataTotalTrip = {
        labels: ['Company Business', 'Site Visit', 'Field Break', 'Taxi Voucher Only'],
        datasets: [
            {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
            }
        ]
    }

    const dataTotalDocumentDelivered = {
        labels: ['Doc1', 'Doc2', 'Doc3'],
        datasets: [
            {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [40, 20, 10]
            }
        ]
    }

    const dataTotalOfficeSuppliesOut = {
        labels: ['Pen', 'Book', 'Paper'],
        datasets: [
            {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [20, 80, 10]
            }
        ]
    }

    const dataTotalMeetingRoomUsed = {
        labels: ['Room', 'Room', 'Room'],
        datasets: [
            {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [40, 20, 80]
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
    }

    const style = computed(() => {
        return {
            height: `${10}vw`,
            width: `${10}vw`

        }
    })

    const style2 = computed(() => {
        return {
            height: `${12}vw`,
            width: `${18}vw`

        }
    })

</script>

<template>
    <div class="flex justify-center space-x-5 py-2">

    <div class="grid grid-cols-3 gap-3">
        <div class="border-[#000] border-2 p-1 w-full">
            <select name="day" class="w-full outline-none">
                <option disabled selected hidden>Date</option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
            </select>
        </div>

        <div class="border-[#000] border-2 p-1 w-full">
            <select name="month" class="w-full outline-none">
                <option disabled selected hidden>Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select> 
        </div>

        <div class="border-[#000] border-2 p-1 w-full">
            <select name="year" class="w-full outline-none">
                <option disabled selected hidden>Year</option>
                <option value="2030">2030</option>
                <option value="2029">2029</option>
                <option value="2028">2028</option>
                <option value="2027">2027</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
            </select>
        </div>
    </div>

    </div>

    <div class="mt-5 flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-3 sm:gap-8 md:gap-12 p-2 sm:p-10 md:p-18">

        <div class="flex gap-5 border-2 text-[11px] p-5 border-black justify-around items-center md:justify-center">
            <Pie :data="dataTotalTrip" :options="options" :style="style" />
            <div class="flex flex-col justify-around">
                <h1>Total trip</h1>
                <div class="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-4">
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalTrip.labels[0] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalTrip.labels[1] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalTrip.labels[2] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalTrip.labels[3] }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-5 border-2 text-[11px] p-5 border-black justify-around items-center md:justify-center">
            <Pie :data="dataTotalDocumentDelivered" :options="options" :style="style" />
            <div class="flex flex-col justify-around">
                <h1>Total Document Delivered</h1>
                <div class="md:grid md:grid-cols-4 md:gap-4">
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalDocumentDelivered.labels[0] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalDocumentDelivered.labels[1] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalDocumentDelivered.labels[2] }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-5 border-2 text-[11px] p-5 border-black justify-around items-center md:justify-center">
            <Pie :data="dataTotalOfficeSuppliesOut" :options="options" :style="style" />
            <div class="flex flex-col justify-around">
                <h1>Total Office Supplies Out</h1>
                <div class="md:grid md:grid-cols-4 gap-4">
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalOfficeSuppliesOut.labels[0] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalOfficeSuppliesOut.labels[1] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalOfficeSuppliesOut.labels[2] }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-5 border-2 text-[11px] p-5 border-black justify-around items-center md:justify-center">
            <Bar :data="dataTotalMeetingRoomUsed" :options="options" :style="style2" />
            <div class="flex flex-col justify-around">
                <h1>Total Meeting Room Used</h1>
                <div class="flex flex-col lg:grid lg:grid-cols-4 lg:gap-4">
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalMeetingRoomUsed.labels[0] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalMeetingRoomUsed.labels[1] }}</h1>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="h-2 w-2 bg-[#41B883]"></div>
                        <h1>{{ dataTotalMeetingRoomUsed.labels[2] }}</h1>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template> 