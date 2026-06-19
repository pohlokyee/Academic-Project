
// ==========================================
// A. Data Modeling 
// ==========================================
print("\n---------------------------------------------------");
print("A. Data Modeling");
print("---------------------------------------------------");
// ==========================================
print("1. Create organizers collection");
printjson(db.organizers.insertMany([
    { name: "Grab", industry: "Technology", country: "Malaysia", contactEmail: "grab@gmail.com", contactNumber: "03-1111 5678" },
    { name: "Shopee", industry: "E-Commerse", country: "Malaysia", contactEmail: "shopee@gmail.com", contactNumber: "03-2222 5678" },
    { name: "Lazada", industry: "E-Commerse", country: "Malaysia", contactEmail: "lazada@gmail.com", contactNumber: "03-3333 5678" }]));


// ==========================================
print("2. Create events collection");
// ==========================================
printjson(db.events.insertMany([
    {
        title: "Grab Tech Summit 2026",
        category: "Technology",
        organizerID: db.organizers.findOne({ name: "Grab" })._id,
        location: "Kuala Lumpur",
        eventDate: new Date("2026-06-15"),
        price: 100,
        capacity: 100,
        tags: ["Technology", "Innovation", "Networking"]
    },

    {
        title: "Lazada Online Seller Workshop",
        category: "Business",
        organizerID: db.organizers.findOne({ name: "Lazada" })._id,
        location: "Kuala Lumpur",
        eventDate: new Date("2026-05-10"),
        price: 50,
        capacity: 70,
        tags: ["Business", "E-Commerse", "Workshop"]
    },

    {
        title: "Shopee E-Commerse Expo",
        category: "Business",
        organizerID: db.organizers.findOne({ name: "Shopee" })._id,
        location: "Johor Bahru",
        eventDate: new Date("2026-04-20"),
        price: 20,
        capacity: 300,
        tags: ["Business", "E-Commerse", "Expo"]
    },

    {
        title: "Grab Ride & Tech Conference",
        category: "Technology",
        organizerID: db.organizers.findOne({ name: "Grab" })._id,
        location: "Johor Bahru",
        eventDate: new Date("2026-2-25"),
        price: 50,
        capacity: 150,
        tags: ["Technology", "Conference", "Mobility"]
    },

    {
        title: "Lazada Seller Growth Seminar",
        category: "Business",
        organizerID: db.organizers.findOne({ name: "Lazada" })._id,
        location: "Selangor",
        eventDate: new Date("2026-03-13"),
        price: 80,
        capacity: 100,
        tags: ["Business", "Seminar"]
    }
]));


// ==========================================
print("3. Create participants collection");
// ==========================================
printjson(db.participants.insertMany([
    {
        firstName: "Lok Yee",
        lastName: "Poh",
        email: "polok@gmail.com",
        phone: "011-10026148",
        gender: "Female",
        age: 22,
        address: "Kuala Lumpur",
        bookedEventIds: db.events.findOne({ title: "Grab Tech Summit 2026" })._id
    },
    {
        firstName: "Yee Wen",
        lastName: "Lau",
        email: "lyw@gmail.com",
        phone: "012-3456789",
        gender: "Female",
        age: 25,
        address: "Kuala Lumpur",
        bookedEventIds: db.events.findOne({ title: "Lazada Online Seller Workshop" })._id
    },
    {
        firstName: "Yin Shen",
        lastName: "Lee",
        email: "lys@gmail.com",
        phone: "012-1249548",
        gender: "Male",
        age: 24,
        address: "Johor",
        bookedEventIds: db.events.findOne({ title: "Shopee E-Commerse Expo" })._id
    },
    {
        firstName: "Heng",
        lastName: "Sabrina",
        email: "sab@gmail.com",
        phone: "014-5872613",
        gender: "Female",
        age: 19,
        address: "Melaka",
        bookedEventIds: db.events.findOne({ title: "Grab Ride & Tech Conference" })._id
    },
    {
        firstName: "Cheong",
        lastName: "Cheryl",
        email: "cheryl@gmail.com",
        phone: "013-6854210",
        gender: "Female",
        age: 35,
        address: "Johor",
        bookedEventIds: db.events.findOne({ title: "Lazada Seller Growth Seminar" })._id
    },
    {
        firstName: "Cheng Shuan",
        lastName: "Woo",
        email: "woo@gmail.com",
        phone: "012-6485132",
        gender: "Female",
        age: 30,
        address: "Kuala Lumpur",
        bookedEventIds: db.events.findOne({ title: "Grab Tech Summit 2026" })._id
    },
    {
        firstName: "Ying Jia",
        lastName: "Chau",
        email: "chau@gmail.com",
        phone: "011-85642356",
        gender: "Female",
        age: 23,
        address: "Perak",
        bookedEventIds: db.events.findOne({ title: "Lazada Online Seller Workshop" })._id
    },
    {
        firstName: "Ng",
        lastName: "Rick",
        email: "rick@gmail.com",
        phone: "019-6581481",
        gender: "Male",
        age: 28,
        address: "Johor",
        bookedEventIds: db.events.findOne({ title: "Shopee E-Commerse Expo" })._id
    },
    {
        firstName: "Neo",
        lastName: "Jason",
        email: "neo@gmail.com",
        phone: "016-3456789",
        gender: "Male",
        age: 26,
        address: "Kuala Lumpur",
        bookedEventIds: db.events.findOne({ title: "Grab Ride & Tech Conference" })._id
    },
    {
        firstName: "Kah Sin",
        lastName: "Gui",
        email: "gui@gmail.com",
        phone: "018-3741789",
        gender: "Female",
        age: 20,
        address: "Johor",
        bookedEventIds: db.events.findOne({ title: "Lazada Seller Growth Seminar" })._id
    },
    {
        firstName: "Tan",
        lastName: "Reynard",
        email: "tan@gmail.com",
        phone: "019-3456823",
        gender: "Male",
        age: 19,
        address: "Negeri Sembilan",
        bookedEventIds: db.events.findOne({ title: "Grab Tech Summit 2026" })._id
    },
    {
        firstName: "Chia",
        lastName: "Brendan",
        email: "bren@gmail.com",
        phone: "017-3456823",
        gender: "Male",
        age: 29,
        address: "Melaka",
        bookedEventIds: db.events.findOne({ title: "Shopee E-Commerse Expo" })._id
    }
]));


// ==========================================
print("4. Create bookings collection");
// ==========================================
printjson(db.bookings.insertMany([
    {
        participantId: db.participants.findOne({ firstName: "Lok Yee", lastName: "Poh" })._id,
        eventId: db.events.findOne({ title: "Grab Tech Summit 2026" })._id,
        bookingDate: new Date("2025-12-01"),
        status: "Confirmed",
        payment: {
            method: "Credit Card",
            amount: db.events.findOne({ title: "Grab Tech Summit 2026" }).price,
            paidAt: new Date("2025-12-01T09:05:00")
        }
    },
    {
        participantId: db.participants.findOne({ firstName: "Yee Wen", lastName: "Lau" })._id,
        eventId: db.events.findOne({ title: "Lazada Online Seller Workshop" })._id,
        bookingDate: new Date("2025-12-02"),
        status: "Confirmed",
        payment: { method: "E-Wallet", amount: db.events.findOne({ title: "Lazada Online Seller Workshop" }).price, paidAt: new Date("2025-12-02T10:10:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Yin Shen", lastName: "Lee" })._id,
        eventId: db.events.findOne({ title: "Shopee E-Commerse Expo" })._id,
        bookingDate: new Date("2025-12-03"),
        status: "Confirmed",
        payment: { method: "Credit Card", amount: db.events.findOne({ title: "Shopee E-Commerse Expo" }).price, paidAt: new Date("2025-12-03T11:05:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Heng", lastName: "Sabrina" })._id,
        eventId: db.events.findOne({ title: "Grab Ride & Tech Conference" })._id,
        bookingDate: new Date("2025-12-04"),
        status: "Confirmed",
        payment: { method: "Bank Transfer", amount: db.events.findOne({ title: "Grab Ride & Tech Conference" }).price, paidAt: new Date("2025-12-04T09:40:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Cheong", lastName: "Cheryl" })._id,
        eventId: db.events.findOne({ title: "Lazada Seller Growth Seminar" })._id,
        bookingDate: new Date("2025-12-05"),
        status: "Confirmed",
        payment: { method: "Credit Card", amount: db.events.findOne({ title: "Lazada Seller Growth Seminar" }).price, paidAt: new Date("2025-12-05T10:35:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Cheng Shuan", lastName: "Woo" })._id,
        eventId: db.events.findOne({ title: "Grab Tech Summit 2026" })._id,
        bookingDate: new Date("2025-12-06"),
        status: "Confirmed",
        payment: { method: "E-Wallet", amount: db.events.findOne({ title: "Grab Tech Summit 2026" }).price, paidAt: new Date("2025-12-06T09:05:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Ying Jia", lastName: "Chau" })._id,
        eventId: db.events.findOne({ title: "Lazada Online Seller Workshop" })._id,
        bookingDate: new Date("2025-12-07"),
        status: "Confirmed",
        payment: { method: "Credit Card", amount: db.events.findOne({ title: "Lazada Online Seller Workshop" }).price, paidAt: new Date("2025-12-07T10:20:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Ng", lastName: "Rick" })._id,
        eventId: db.events.findOne({ title: "Shopee E-Commerse Expo" })._id,
        bookingDate: new Date("2025-12-08"),
        status: "Confirmed",
        payment: { method: "Bank Transfer", amount: db.events.findOne({ title: "Shopee E-Commerse Expo" }).price, paidAt: new Date("2025-12-08T11:25:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Neo", lastName: "Jason" })._id,
        eventId: db.events.findOne({ title: "Grab Ride & Tech Conference" })._id,
        bookingDate: new Date("2025-12-09"),
        status: "Confirmed",
        payment: { method: "E-Wallet", amount: db.events.findOne({ title: "Grab Ride & Tech Conference" }).price, paidAt: new Date("2025-12-09T09:50:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Kah Sin", lastName: "Gui" })._id,
        eventId: db.events.findOne({ title: "Lazada Seller Growth Seminar" })._id,
        bookingDate: new Date("2025-12-10"),
        status: "Confirmed",
        payment: { method: "Credit Card", amount: db.events.findOne({ title: "Lazada Seller Growth Seminar" }).price, paidAt: new Date("2025-12-10T10:45:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Tan", lastName: "Reynard" })._id,
        eventId: db.events.findOne({ title: "Grab Tech Summit 2026" })._id,
        bookingDate: new Date("2025-12-11"),
        status: "Confirmed",
        payment: { method: "Credit Card", amount: db.events.findOne({ title: "Grab Tech Summit 2026" }).price, paidAt: new Date("2025-12-11T09:20:00") }
    },
    {
        participantId: db.participants.findOne({ firstName: "Chia", lastName: "Brendan" })._id,
        eventId: db.events.findOne({ title: "Shopee E-Commerse Expo" })._id,
        bookingDate: new Date("2025-12-12"),
        status: "Confirmed",
        payment: { method: "Bank Transfer", amount: db.events.findOne({ title: "Shopee E-Commerse Expo" }).price, paidAt: new Date("2025-12-12T11:15:00") }
    }
]));

// ==========================================
// B. CRUD Operations
// ==========================================
print("\n---------------------------------------------------");
print("B. CRUD Operations");
print("---------------------------------------------------");
// 1. Create data

print("1. Create data");
print("insertOne()\n");

// insertOne()
printjson(db.participants.insertOne({
    "firstName": "Ricky",
    "lastName": "Tan",
    "email": "ricky@gmail.com",
    "phone": "012-9998887",
    "gender": "Male",
    "age": 21,
    "address": "Selangor"
}));

// insertMany()
print("insertMany()\n");
printjson(db.events.insertMany([
    {
        "title": "AI & Future Tech Symposium",
        "category": "Technology",
        "organizerID": ObjectId("695ab30df084f228b404f025"),
        "location": "Kuala Lumpur",
        "eventDate": ISODate("2026-07-20T09:00:00Z"),
        "price": 120,
        "capacity": 200,
        "tags": ["AI", "Future Tech", "Symposium"]
    },
    {
        "title": "Digital Marketing Mastery 2026",
        "category": "Business",
        "organizerID": ObjectId("695ab30df084f228b404f026"),
        "location": "Penang",
        "eventDate": ISODate("2026-08-15T10:00:00Z"),
        "price": 45,
        "capacity": 80,
        "tags": ["Marketing", "Digital", "Workshop"]
    },
    {
        "title": "Cloud Computing Bootcamp",
        "category": "Technology",
        "organizerID": ObjectId("695ab30df084f228b404f025"),
        "location": "Online",
        "eventDate": ISODate("2026-09-05T08:00:00Z"),
        "price": 60,
        "capacity": 500,
        "tags": ["Cloud", "Coding", "Education"]
    }
]));

// 2. Read data

print("2. Read data");

// findOne()
print("findOne()\n");

printjson(db.participants.findOne({ "gender": "Female" }));

// find() + $gt
print("find() + $gt\n");

printjson(db.events.find({
    "price": { $gt: 60 }
}));

// find() + $lt
print("find() + $lt\n");

printjson(db.participants.find({
    "age": { $lt: 20 }
}));

// find() + $eq
print("find() + $eq\n");

printjson(db.bookings.find({
    "category": { $eq: "Business" }
}));

// find() + $in
print("find() + $in\n");

printjson(db.participants.find({
    "address": { $in: ["Melaka"] }
}));

// find() + $and + $gt
print("find() + $and + $gt\n");

printjson(db.events.find({
    $and: [
        { "location": "Kuala Lumpur" },
        { "capacity": { $gt: 80 } }
    ]
}));

// find() + $or + $lt
print("find() + $or + $lt\n");

printjson(db.events.find({
    $or: [
        { "category": "Technology" },
        { "price": { $lt: 30 } }
    ]
}));

// find() + array field
print("find() + array field\n");

printjson(db.events.find({
    "tags": "Technology"
}));

// find() + projection
print("find() + projection\n");

printjson(db.events.find(
    {},
    { "title": 1, "price": 1, "_id": 0 }
));

// 3. Update data

print("3. Update data");

// updateOne() + $set
print("updateOne() + $set\n");
printjson(db.participants.updateOne(
    { "firstName": "Ricky" },
    { $set: { "phone": "012-3344556" } }
));

// updateMany() + $inc
print("updateMany() + $inc\n");

printjson(db.events.updateMany(
    { "category": "Technology" },
    { $inc: { "capacity": 50 } }
));

// updateOne() + $push + add to array field
print("updateOne() + $push + add to array field\n");

printjson(db.events.updateOne(
    { "title": "Shopee E-Commerse Expo" },
    { $push: { "tags": "Hot Selling" } }
));

// updateMany() + $pull + remove from array field
print("updateMany() + $pull + remove from array field\n");

printjson(db.events.updateMany(
    { "tags": "Workshop" },
    { $pull: { "tags": "Workshop" } }
));

// 4. Delete data   

print("4. Delete data");

// deleteOne()
print("deleteOne()\n");

printjson(db.bookings.deleteOne({
    "_id": ObjectId("695adc92f084f228b404f080")
}));

// deleteMany()
print("deleteMany()\n");
printjson(db.participants.deleteMany({
    "address": "Melaka"
}));


// ==========================================
// C. Advanced MongoDB Operations
// ==========================================
print("\n---------------------------------------------------");
print("C. Advanced MongoDB Operations");
print("---------------------------------------------------");

// indexes.js
// MongoDB Indexes 

print("Indexes");

// Single-field index on event category
print("Single-field index on event category\n");
printjson(db.events.createIndex({ category: 1 }));

// Single-field index on booking eventId
print("Single-field index on booking eventId\n");
printjson(db.bookings.createIndex({ eventId: 1 }));

// Compound index for event-based and time-based queries
print("Compound index for event-based and time-based queries\n");
printjson(db.bookings.createIndex({ eventId: 1, bookingDate: -1 }));


//Aggregation Pipelines
print("Aggregation Pipelines");

// Aggregation 1: Technology events summary
print("Aggregation 1: Technology events summary\n");
printjson(db.events.aggregate([
    { $match: { category: "Technology" } },
    {
        $group: {
            _id: "$category",
            avgPrice: { $avg: "$price" },
            totalEvents: { $sum: 1 }
        }
    }
]));

// Aggregation 2: Total bookings per event (descending)
print("Aggregation 2: Total bookings per event (descending)\n");
printjson(db.bookings.aggregate([
    {
        $group: {
            _id: "$eventId",
            totalBookings: { $sum: 1 }
        }
    },
    { $sort: { totalBookings: -1 } }
]));




print("1. ASCENDING SORT: Events sorted by Price (Low to High)\n");

printjson(db.events.find(
    {},
    { "title": 1, "price": 1, "category": 1 }).sort({ "price": 1 }
    ));



// 2. Descending Sort (Bookings)

print("2. DESCENDING SORT: Bookings sorted by Payment (High to Low)\n");

printjson(db.bookings.find(
    { "status": "Confirmed" },
    { "payment.amount": 1, "bookingDate": 1, "status": 1 }).sort({ "payment.amount": -1 }
    ));