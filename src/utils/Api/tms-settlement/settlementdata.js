const settlementdata = [
    {
        id: 1,
        no: 1,
        created_date: "2023-04-01",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "John Doe",
        ca: "TCA-ABM/1232/23.04",
        total: 1000000,
        status: "Paid"
    },
    {
        id: 2,
        no: 2,
        created_date: "2023-04-02",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Jane Doe",
        ca: "TCA-ABM/1232/23.04",
        total: 500000,
        status: "Paid"
    },
    {
        id: 3,
        no: 3,
        created_date: "2023-04-03",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Bob Smith",
        ca: "TCA-ABM/1232/23.04",
        total: 750000,
        status: "Pending"
    },
    {
        id: 4,
        no: 4,
        created_date: "2023-04-04",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Alice Johnson",
        ca: "TCA-ABM/1232/23.04",
        total: 250000,
        status: "Paid"
    },
    {
        id: 5,
        no: 5,
        created_date: "2023-04-05",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Chris Lee",
        ca: "TCA-ABM/1232/23.04",
        total: 1250000,
        status: "Pending"
    },
    {
        id: 6,
        no: 6,
        created_date: "2023-04-06",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "David Wang",
        ca: "TCA-ABM/1232/23.04",
        total: 500000,
        status: "Paid"
    },
    {
        id: 7,
        no: 7,
        created_date: "2023-04-07",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Samantha Chan",
        ca: "TCA-ABM/1232/23.04",
        total: 100000,
        status: "Pending"
    },
    {
        id: 8,
        no: 8,
        created_date: "2023-04-08",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Tommy Ng",
        ca: "TCA-ABM/1232/23.04",
        total: 200000,
        status: "Paid"
    },
    {
        id: 9,
        no: 9,
        created_date: "2023-04-09",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Lisa Wong",
        ca: "TCA-ABM/1232/23.04",
        total: 300000,
        status: "Pending"
    },
    {
        id: 10,
        no: 10,
        created_date: "2023-04-10",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Michael Yuen",
        ca: "TCA-ABM/1232/23.04",
        total: 150000,
        status: "Paid"
    },
    {
        id: 11,
        no: 11,
        created_date: "2023-04-11",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Tina Lam",
        ca: "TCA-ABM/1232/23.04",
        total: 400000,
        status: "Pending"
    },
    {
        id: 12,
        no: 12,
        created_date: "2023-04-12",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Kevin Chan",
        ca: "TCA-ABM/1232/23.04",
        total: 800000,
        status: "Paid"
    },
    {
        id: 13,
        no: 13,
        created_date: "2023-04-13",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Amy Wong",
        ca: "TCA-ABM/1232/23.04",
        total: 1500000,
        status: "Pending"
    },
    {
        id: 14,
        no: 14,
        created_date: "2023-04-14",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Steven Lee",
        ca: "TCA-ABM/1232/23.04",
        total: 100000,
        status: "Paid"
    },
    {
        id: 15,
        no: 15,
        created_date: "2023-04-15",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Emily Chu",
        ca: "TCA-ABM/1232/23.04",
        total: 500000,
        status: "Pending"
    },
    {
        id: 16,
        no: 16,
        created_date: "2023-04-16",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "David Wong",
        ca: "TCA-ABM/1232/23.04",
        total: 750000,
        status: "Paid"
    },
    {
        id: 17,
        no: 17,
        created_date: "2023-04-17",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Brenda Ng",
        ca: "TCA-ABM/1232/23.04",
        total: 200000,
        status: "Pending"
    },
    {
        id: 18,
        no: 18,
        created_date: "2023-04-18",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Frankie Chan",
        ca: "TCA-ABM/1232/23.04",
        total: 300000,
        status: "Paid"
    },
    {
        id: 19,
        no: 19,
        created_date: "2023-04-19",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Catherine Wong",
        ca: "TCA-ABM/1232/23.04",
        total: 1000000,
        status: "Pending"
    },
    {
        id: 20,
        no: 20,
        created_date: "2023-04-20",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Tony Leung",
        ca: "TCA-ABM/1232/23.04",
        total: 500000,
        status: "Paid"
    },
    {
        id: 21,
        no: 21,
        created_date: "2023-04-21",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Angela Lee",
        ca: "TCA-ABM/1232/23.04",
        total: 250000,
        status: "Pending"
    },
    {
        id: 22,
        no: 22,
        created_date: "2023-04-22",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Michael Chan",
        ca: "TCA-ABM/1232/23.04",
        total: 600000,
        status: "Paid"
    },
    {
        id: 23,
        no: 23,
        created_date: "2023-04-23",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Eddie Ng",
        ca: "TCA-ABM/1232/23.04",
        total: 1200000,
        status: "Pending"
    },
    {
        id: 24,
        no: 24,
        created_date: "2023-04-24",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Grace Wong",
        ca: "TCA-ABM/1232/23.04",
        total: 200000,
        status: "Paid"
    },
    {
        id: 25,
        no: 25,
        created_date: "2023-04-25",
        settlement_no: "STL-ABM/1232/23.04",
        requestor: "Tommy Lee",
        ca: "TCA-ABM/1232/23.04",
        total: 400000,
        status: "Pending"
    },
]

export default settlementdata
