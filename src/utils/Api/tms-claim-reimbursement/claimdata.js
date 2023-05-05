const claimdata = [
    {
        id: 1,
        no: 1,
        created_date: "2023-04-23",
        claim_no: "CLM-ABM/123/23.04",
        requestor: "John Doe",
        type: "Meals",
        status: "Request submitted by John Doe",
        type_status: "Pending"
    },
    {
        id: 2,
        no: 2,
        created_date: "2023-04-24",
        claim_no: "CLM-ABM/124/23.04",
        requestor: "Jane Smith",
        type: "Transport",
        status: "Request submitted by Jane Smith",
        type_status: "Approve"
    },
    {
        id: 3,
        no: 3,
        created_date: "2023-04-25",
        claim_no: "CLM-ABM/125/23.04",
        requestor: "Bob Johnson",
        type: "Bensin",
        status: "Request submitted by Bob Johnson",
        type_status: "Reject"
    },
    {
        id: 4,
        no: 4,
        created_date: "2023-04-26",
        claim_no: "CLM-ABM/126/23.04",
        requestor: "Sara Lee",
        type: "Meals",
        status: "Request submitted by Sara Lee",
        type_status: "Reject"
    },
    {
        id: 5,
        no: 5,
        created_date: "2023-04-27",
        claim_no: "CLM-ABM/127/23.04",
        requestor: "David Lee",
        type: "Transport",
        status: "Request submitted by David Lee",
        type_status: "Pending"
    },
    {
        id: 6,
        no: 6,
        created_date: "2023-04-28",
        claim_no: "CLM-ABM/128/23.04",
        requestor: "Anna Wang",
        type: "Bensin",
        status: "Request submitted by Anna Wang",
        type_status: "Approve"
    },
    {
        id: 7,
        no: 7,
        created_date: "2023-04-29",
        claim_no: "CLM-ABM/129/23.04",
        requestor: "Brian Lee",
        type: "Meals",
        status: "Request submitted by Brian Lee",
        type_status: "Reject"
    },
    {
        id: 8,
        no: 8,
        created_date: "2023-04-30",
        claim_no: "CLM-ABM/130/23.04",
        requestor: "Tina Chen",
        type: "Transport",
        status: "Request submitted by Tina Chen",
        type_status: "Pending"
    },
    {
        id: 9,
        no: 9,
        created_date: "2023-05-01",
        claim_no: "CLM-ABM/131/23.04",
        requestor: "Henry Tan",
        type: "Bensin",
        status: "Request submitted by Henry Tan",
        type_status: "Approve"
    },
    {
        id: 10,
        no: 10,
        created_date: "2023-05-02",
        claim_no: "CLM-ABM/132/23.04",
        requestor: "Grace Wong",
        type: "Meals",
        status: "Request submitted by Grace Wong",
        type_status: "Pending"
    },
    {
        id: 11,
        no: 11,
        created_date: "2023-05-03",
        claim_no: "CLM-ABM/133/23.04",
        requestor: "Andrew Tan",
        type: "Transport",
        status: "Request submitted by Andrew Tan",
        type_status: "Approve"
    },
    {
        id: 12,
        no: 12,
        created_date: "2023-05-04",
        claim_no: "CLM-ABM/134/23.04",
        requestor: "Melissa Lim",
        type: "Bensin",
        status: "Request submitted by Melissa Lim",
        type_status: "Reject"
    },
    {
        id: 13,
        no: 13,
        created_date: "2023-05-05",
        claim_no: "CLM-ABM/135/23.04",
        requestor: "William Goh",
        type: "Meals",
        status: "Request submitted by William Goh",
        type_status: "Reject"
    },
    {
        id: 14,
        no: 14,
        created_date: "2023-05-06",
        claim_no: "CLM-ABM/136/23.04",
        requestor: "Rachel Lee",
        type: "Transport",
        status: "Request submitted by Rachel Lee",
        type_status: "Approve"
    },
    {
        id: 15,
        no: 15,
        created_date: "2023-05-07",
        claim_no: "CLM-ABM/137/23.04",
        requestor: "Daniel Tan",
        type: "Bensin",
        status: "Request submitted by Daniel Tan",
        type_status: "Pending"
    },
    {
        id: 16,
        no: 16,
        created_date: "2023-05-08",
        claim_no: "CLM-ABM/138/23.04",
        requestor: "Linda Ng",
        type: "Meals",
        status: "Request submitted by Linda Ng",
        type_status: "Pending"
    },
    {
        id: 17,
        no: 17,
        created_date: "2023-05-09",
        claim_no: "CLM-ABM/139/23.04",
        requestor: "Eric Lim",
        type: "Transport",
        status: "Request submitted by Eric Lim",
        type_status: "Approve"
    },
    {
        id: 18,
        no: 18,
        created_date: "2023-05-10",
        claim_no: "CLM-ABM/140/23.04",
        requestor: "Megan Tan",
        type: "Bensin",
        status: "Request submitted by Megan Tan"
        ,
        type_status: "Approve"
    },
    {
        id: 19,
        no: 19,
        created_date: "2023-05-11",
        claim_no: "CLM-ABM/141/23.04",
        requestor: "Ryan Lee",
        type: "Meals",
        status: "Request submitted by Ryan Lee",
        type_status: "Reject"
    },
    {
        id: 20,
        no: 20,
        created_date: "2023-05-12",
        claim_no: "CLM-ABM/142/23.04",
        requestor: "Siti Rahayu",
        type: "Transport",
        status: "Request submitted by Siti Rahayu",
        type_status: "Pending"
        
    },
    {
        id: 21,
        no: 21,
        created_date: "2023-05-13",
        claim_no: "CLM-ABM/143/23.04",
        requestor: "David Lim",
        type: "Bensin",
        status: "Request submitted by David Lim",
        type_status: "Reject"
    },
    {
        id: 22,
        no: 22,
        created_date: "2023-05-14",
        claim_no: "CLM-ABM/144/23.04",
        requestor: "Sheryl Tan",
        type: "Meals",
        status: "Request submitted by Sheryl Tan",
        type_status: "Reject"
    },
    {
        id: 23,
        no: 23,
        created_date: "2023-05-15",
        claim_no: "CLM-ABM/145/23.04",
        requestor: "Josephine Lim",
        type: "Transport",
        status: "Request submitted by Josephine Lim",
        type_status: "Approve"
    },
    {
        id: 24,
        no: 24,
        created_date: "2023-05-16",
        claim_no: "CLM-ABM/146/23.04",
        requestor: "Aaron Tan",
        type: "Bensin",
        status: "Request submitted by Aaron Tan",
        type_status: "Pending"
    },
    {
        id: 25,
        no: 25,
        created_date: "2023-05-17",
        claim_no: "CLM-ABM/147/23.04",
        requestor: "Cynthia Lim",
        type: "Meals",
        status: "Request submitted by Cynthia Lim",
        type_status: "Reject"
    }
];

export default claimdata