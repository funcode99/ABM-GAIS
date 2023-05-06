const settlementdata = [
    {
        id: 1,
        no: 1,
        created_date: "22/04/2022",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "John Doe",
        ca: "TCA-ABM/1232/13.05",
        nominal: 5000000,
        status: "Request Submit By John Doe",
        ca_type: "Travel"
    },
    {
        id: 2,
        no: 2,
        created_date: "23/04/2022",
        settlement_no: "STL-ABM/1342/23.04",
        requestor: "Jane Smith",
        ca: "TCA-ABM/1342/13.05",
        nominal: 2500000,
        status: "Request Submit By Jane Smith",
        ca_type: "Travel"
    },
    {
        id: 3,
        no: 3,
        created_date: "24/04/2022",
        settlement_no: "STL-ABM/1452/23.04",
        requestor: "Bob Johnson",
        ca: "TCA-ABM/1452/13.05",
        nominal: 7500000,
        status: "Request Submit By Bob Johnson",
        ca_type: "Non Travel"
    },
    {
        id: 4,
        no: 4,
        created_date: "25/04/2022",
        settlement_no: "STL-ABM/1562/23.04",
        requestor: "Alice Lee",
        ca: "TCA-ABM/1562/13.05",
        nominal: 3000000,
        status: "Request Submit By Alice Lee",
        ca_type: "Travel"
    },
    {
        id: 5,
        no: 5,
        created_date: "26/04/2022",
        settlement_no: "STL-ABM/1672/23.04",
        requestor: "Michael Chen",
        ca: "TCA-ABM/1672/13.05",
        nominal: 2000000,
        status: "Request Submit By Michael Chen",
        ca_type: "Non Travel"
    },
    {
        id: 6,
        no: 6,
        created_date: "27/04/2022",
        settlement_no: "STL-ABM/1782/23.04",
        requestor: "Samantha Brown",
        ca: "TCA-ABM/1782/13.05",
        nominal: 6000000,
        status: "Request Submit By Samantha Brown",
        ca_type: "Travel"
    },
    {
        id: 7,
        no: 7,
        created_date: "28/04/2022",
        settlement_no: "STL-ABM/1892/23.04",
        requestor: "David Kim",
        ca: "TCA-ABM/1892/13.05",
        nominal: 1500000,
        status: "Request Submit By David Kim",
        ca_type: "Non Travel"
    },
    {
        id: 8,
        no: 8,
        created_date: "29/04/2022",
        settlement_no: "STL-ABM/1902/29.04",
        requestor: "Jane Smith",
        ca: "TCA-ABM/1902/14.05",
        nominal: 5000000,
        status: "Request Submit By Jane Smith",
        ca_type: "Travel"
    },
    {
        id: 9,
        no: 9,
        created_date: "30/04/2022",
        settlement_no: "STL-ABM/1902/30.04",
        requestor: "John Doe",
        ca: "TCA-ABM/1902/15.05",
        nominal: 2500000,
        status: "Request Submit By John Doe",
        ca_type: "Travel"
    },
    {
        id: 10,
        no: 10,
        created_date: "01/05/2022",
        settlement_no: "STL-ABM/1902/01.05",
        requestor: "Jane Smith",
        ca: "TCA-ABM/1902/16.05",
        nominal: 7500000,
        status: "Request Submit By Jane Smith",
        ca_type: "Travel"
    },
    {
        id: 11,
        no: 11,
        created_date: "02/05/2022",
        settlement_no: "STL-ABM/1902/02.05",
        requestor: "John Doe",
        ca: "TCA-ABM/1902/17.05",
        nominal: 3000000,
        status: "Request Submit By John Doe",
        ca_type: "Travel"
    },
    {
        id: 12,
        no: 12,
        created_date: "03/05/2022",
        settlement_no: "STL-ABM/1902/03.05",
        requestor: "Jane Smith",
        ca: "TCA-ABM/1902/18.05",
        nominal: 9000000,
        status: "Request Submit By Jane Smith",
        ca_type: "Travel"
    },
    {
        id: 13,
        no: 13,
        created_date: "04/05/2022",
        settlement_no: "STL-ABM/1902/04.05",
        requestor: "John Doe",
        ca: "TCA-ABM/1902/19.05",
        nominal: 2000000,
        status: "Request Submit By John Doe",
        ca_type: "Travel"
    },
    {
        id: 14,
        no: 14,
        created_date: "05/05/2022",
        settlement_no: "STL-ABM/1902/05.05",
        requestor: "Jane Smith",
        ca: "TCA-ABM/1902/20.05",
        nominal: 6000000,
        status: "Request Submit By Jane Smith",
        ca_type: "Travel"
    },
    {
        id: 15,
        no: 15,
        created_date: "05/05/2022",
        settlement_no: "STL-ABM/1622/23.04",
        requestor: "Andi",
        ca: "TCA-ABM/1622/14.05",
        nominal: 150000,
        status: "Request Submit By Andi",
        ca_type: "Travel"
    },
    {
        id: 16,
        no: 16,
        created_date: "06/05/2022",
        settlement_no: "STL-ABM/1722/23.04",
        requestor: "Budi",
        ca: "TCA-ABM/1722/14.05",
        nominal: 200000,
        status: "Request Submit By Budi",
        ca_type: "Travel"
    },
    {
        id: 17,
        no: 17,
        created_date: "07/05/2022",
        settlement_no: "STL-ABM/1822/23.04",
        requestor: "Cindy",
        ca: "TCA-ABM/1822/14.05",
        nominal: 250000,
        status: "Request Submit By Cindy",
        ca_type: "Non Travel"
    },
    {
        id: 18,
        no: 18,
        created_date: "08/05/2022",
        settlement_no: "STL-ABM/1922/23.04",
        requestor: "Denny",
        ca: "TCA-ABM/1922/14.05",
        nominal: 300000,
        status: "Request Submit By Denny",
        ca_type: "Non Travel"
    },
    {
        id: 19,
        no: 19,
        created_date: "09/05/2022",
        settlement_no: "STL-ABM/2022/23.04",
        requestor: "Eka",
        ca: "TCA-ABM/2022/14.05",
        nominal: 350000,
        status: "Request Submit By Eka",
        ca_type: "Travel"
    },
    {
        id: 20,
        no: 20,
        created_date: "10/05/2022",
        settlement_no: "STL-ABM/2122/23.04",
        requestor: "Fajar",
        ca: "TCA-ABM/2122/14.05",
        nominal: 400000,
        status: "Request Submit By Fajar",
        ca_type: "Travel"
    },
    {
        id: 21,
        no: 21,
        created_date: "11/05/2022",
        settlement_no: "STL-ABM/2222/23.04",
        requestor: "Gita",
        ca: "TCA-ABM/2222/14.05",
        nominal: 450000,
        status: "Request Submit By Gita",
        ca_type: "Non Travel"
    },
    {
        id: 22,
        no: 22,
        created_date: "12/05/2022",
        settlement_no: "STL-ABM/7989/23.05",
        requestor: "Helen",
        ca: "TCA-ABM/7989/13.05",
        nominal: 750000,
        status: "Request Submit By Helen",
        ca_type: "Travel"
    },
    {
        id: 23,
        no: 23,
        created_date: "13/05/2022",
        settlement_no: "STL-ABM/7990/23.05",
        requestor: "Peter",
        ca: "TCA-ABM/7990/13.05",
        nominal: 1200000,
        status: "Request Submit By Peter",
        ca_type: "Travel"
    },
    {
        id: 24,
        no: 24,
        created_date: "14/05/2022",
        settlement_no: "STL-ABM/7991/23.05",
        requestor: "Jenny",
        ca: "TCA-ABM/7991/13.05",
        nominal: 450000,
        status: "Request Submit By Jenny",
        ca_type: "Non Travel"
    },
    {
        id: 25,
        no: 25,
        created_date: "15/05/2022",
        settlement_no: "STL-ABM/7992/23.05",
        requestor: "David",
        ca: "TCA-ABM/7992/13.05",
        nominal: 250000,
        status: "Request Submit By David",
        ca_type: "Non Travel"
    }
]

export default settlementdata