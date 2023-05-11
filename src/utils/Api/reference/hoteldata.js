const hoteldata = [
    { id: 1, no: 1, hotel_name: 'Hotel A', city: 'Jakarta', type: 'hotel', address: 'Jl. Sudirman No. 1', email: 'hotelA@example.com', phone_number: '0812345678', rating: 4.5 },
    { id: 2, no: 2, hotel_name: 'Guest House B', city: 'Surabaya', type: 'guest house', address: 'Jl. Gajah Mada No. 2', email: 'guesthouseB@example.com', phone_number: '0823456789', rating: 3.8 },
    { id: 3, no: 3, hotel_name: 'Hotel C', city: 'Yogyakarta', type: 'hotel', address: 'Jl. Malioboro No. 3', email: 'hotelC@example.com', phone_number: '0834567890', rating: 4.2 },
    { id: 4, no: 4, hotel_name: 'Guest House D', city: 'Bandung', type: 'guest house', address: 'Jl. Merdeka No. 4', email: 'guesthouseD@example.com', phone_number: '0845678901', rating: 3.5 },
    { id: 5, no: 5, hotel_name: 'Hotel E', city: 'Denpasar', type: 'hotel', address: 'Jl. Sunset Road No. 5', email: 'hotelE@example.com', phone_number: '0856789012', rating: 4.0 },
    { id: 6, no: 6, hotel_name: 'Guest House F', city: 'Medan', type: 'guest house', address: 'Jl. Ahmad Yani No. 6', email: 'guesthouseF@example.com', phone_number: '0867890123', rating: 3.2 },
    { id: 7, no: 7, hotel_name: 'Hotel G', city: 'Semarang', type: 'hotel', address: 'Jl. Pemuda No. 7', email: 'hotelG@example.com', phone_number: '0878901234', rating: 4.3 },
    { id: 8, no: 8, hotel_name: 'Guest House H', city: 'Palembang', type: 'guest house', address: 'Jl. Sudirman No. 8', email: 'guesthouseH@example.com', phone_number: '0889012345', rating: 3.6 },
    { id: 9, no: 9, hotel_name: 'Hotel I', city: 'Makassar', type: 'hotel', address: 'Jl. Andi Mappanyukki No. 9', email: 'hotelI@example.com', phone_number: '0890123456', rating: 4.1 },
    { id: 10, no: 10, hotel_name: 'Guest House J', city: 'Bali', type: 'guest house', address: 'Jl. Raya Ubud No. 10', email: 'guesthouseJ@example.com', phone_number: '0812345678', rating: 3.9 },
    { id: 11, no: 11, hotel_name: 'Hotel K', city: 'Manado', type: 'hotel', address: 'Jl. Sam Ratulangi No. 11', email: 'hotelK@example.com', phone_number: '0823456789', rating: 4.4 },
    { id: 12, no: 12, hotel_name: 'Guest House L', city: 'Balikpapan', type: 'guest house', address: 'Jl. Sudirman No. 12', email: 'guesthouseL@example.com', phone_number: '0834567890', rating: 3.7 },
    { id: 13, no: 13, hotel_name: 'Hotel M', city: 'Pekanbaru', type: 'hotel', address: 'Jl. Ahmad Yani No. 13', email: 'hotelM@example.com', phone_number: '0845678901', rating: 4.2 },
    { id: 14, no: 14, hotel_name: 'Guest House N', city: 'Pontianak', type: 'guest house', address: 'Jl. Gajah Mada No. 14', email: 'guesthouseN@example.com', phone_number: '0856789012', rating: 3.4 },
    { id: 15, no: 15, hotel_name: 'Hotel O', city: 'Semarang', type: 'hotel', address: 'Jl. Pemuda No. 15', email: 'hotelO@example.com', phone_number: '0867890123', rating: 4.1 },
    { id: 16, no: 16, hotel_name: 'Guest House P', city: 'Banyuwangi', type: 'guest house', address: 'Jl. Raya Banyuwangi No. 16', email: 'guesthouseP@example.com', phone_number: '0878901234', rating: 3.8 },
    { id: 17, no: 17, hotel_name: 'Hotel Q', city: 'Surabaya', type: 'hotel', address: 'Jl. Diponegoro No. 17', email: 'hotelQ@example.com', phone_number: '0889012345', rating: 4.3 },
    { id: 18, no: 18, hotel_name: 'Guest House R', city: 'Makassar', type: 'guest house', address: 'Jl. Jendral Sudirman No. 18', email: 'guesthouseR@example.com', phone_number: '0890123456', rating: 3.5 },
    { id: 19, no: 19, hotel_name: 'Hotel S', city: 'Denpasar', type: 'hotel', address: 'Jl. Kuta No. 19', email: 'hotelS@example.com', phone_number: '0812345678', rating: 4.0 },
    { id: 20, no: 20, hotel_name: 'Guest House T', city: 'Jakarta', type: 'guest house', address: 'Jl. Thamrin No. 20', email: 'guesthouseT@example.com', phone_number: '0823456789', rating: 3.3 },
    { id: 21, no: 21, hotel_name: 'Hotel U', city: 'Yogyakarta', type: 'hotel', address: 'Jl. Malioboro No. 21', email: 'hotelU@example.com', phone_number: '0834567890', rating: 4.5 },
    { id: 22, no: 22, hotel_name: 'Guest House V', city: 'Bandung', type: 'guest house', address: 'Jl. Dago No. 22', email: 'guesthouseV@example.com', phone_number: '0845678901', rating: 3.6 },
    { id: 23, no: 23, hotel_name: 'Hotel W', city: 'Palembang', type: 'hotel', address: 'Jl. Sudirman No. 23', email: 'hotelW@example.com', phone_number: '0856789012', rating: 4.2 },
    { id: 24, no: 24, hotel_name: 'Guest House X', city: 'Medan', type: 'guest house', address: 'Jl. Pemuda No. 24', email: 'guesthouseX@example.com', phone_number: '0867890123', rating: 3.9 },
    { id: 25, no: 25, hotel_name: 'Hotel Y', city: 'Samarinda', type: 'hotel', address: 'Jl. Veteran No. 25', email: 'hotelY@example.com', phone_number: '0878901234', rating: 4.4 }
]

export default hoteldata
