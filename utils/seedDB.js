const mongoose = require("mongoose");
const User = require("../users/models/mongodb/User");
const Card = require("../cards/models/mongodb/Card");
const { generateBizNum } = require("../cards/helpers/generateBizNum");
const { generatePassword } = require("../users/helpers/bcrypt");
const seedData = async () => {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
        console.log("No users found, seeding database");

        // Users
        const users = [
            {
                name: {
                    first: "Regular",
                    middle: "",
                    last: "User"
                },
                phone: "050-0000000",
                email: "regular@gmail.com",
                password: "Aa123456!",
                image: {
                    url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
                    alt: "Regular User Profile Picture"
                },
                address: {
                    state: "",
                    country: "Israel",
                    city: "Tel Aviv",
                    street: "Rothschild",
                    houseNumber: 10,
                    zip: 12345
                },
                isBusiness: false,
                isAdmin: false
            },
            {
                name: {
                    first: "Business",
                    middle: "",
                    last: "User"
                },
                phone: "050-0000000",
                email: "business@gmail.com",
                password: "Aa123456!",
                image: {
                    url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
                    alt: "Business User Profile Picture"
                },
                address: {
                    state: "",
                    country: "Israel",
                    city: "Tel Aviv",
                    street: "Dizengoff",
                    houseNumber: 20,
                    zip: 12345
                },
                isBusiness: true,
                isAdmin: false
            },
            {
                name: {
                    first: "Admin",
                    middle: "",
                    last: "User"
                },
                phone: "050-0000000",
                email: "admin@gmail.com",
                password: "Aa123456!",
                image: {
                    url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
                    alt: "Admin User Profile Picture"
                },
                address: {
                    state: "",
                    country: "Israel",
                    city: "Tel Aviv",
                    street: "Allenby",
                    houseNumber: 30,
                    zip: 12345
                },
                isBusiness: true,
                isAdmin: true
            }
        ];

        // Hash passwords before inserting
        for (let user of users) {
            user.password = generatePassword(user.password);
        }

        // Insert users and get their IDs
        const userIDs = await User.insertMany(users).then(users => users.map(user => user._id));

        // Cards
        const cards = [
            {
                title: "First Card",
                subtitle: "This is the first business card",
                description: "This card is for demonstration purposes",
                phone: "050-0000000",
                email: "card1@gmail.com",
                web: "www.firstcard.com",
                image: {
                    url: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
                    alt: "Business Card Image"
                },
                address: {
                    state: "",
                    country: "Israel",
                    city: "Tel Aviv",
                    street: "Rothschild",
                    houseNumber: 10,
                    zip: 12345
                },
                bizNumber: await generateBizNum(),
                user_id: userIDs[1],
                likes: []
            },
            {
                title: "Second Card",
                subtitle: "This is the second business card",
                description: "Another card for demonstration",
                phone: "050-0000000",
                email: "card2@gmail.com",
                web: "www.secondcard.com",
                image: {
                    url: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
                    alt: "Business Card Image"
                },
                address: {
                    state: "",
                    country: "Israel",
                    city: "Tel Aviv",
                    street: "Dizengoff",
                    houseNumber: 20,
                    zip: 12345
                },
                bizNumber: await generateBizNum(),
                user_id: userIDs[1],
                likes: []
            },
            {
                title: "Admin Card",
                subtitle: "This is the admin's business card",
                description: "A card created by the admin",
                phone: "050-0000000",
                email: "card3@gmail.com",
                web: "www.admincard.com",
                image: {
                    url: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
                    alt: "Business Card Image"
                },
                address: {
                    state: "",
                    country: "Israel",
                    city: "Tel Aviv",
                    street: "Allenby",
                    houseNumber: 30,
                    zip: 12345
                },
                bizNumber: await generateBizNum(),
                user_id: userIDs[2],
                likes: []
            }
        ];

        await Card.insertMany(cards);
        console.log("Database seeded successfully");
    } else {
        console.log("Database already contains users, skipping seed");
    }
};

module.exports = seedData;