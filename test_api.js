const axios = require('axios');

const API_BASE = 'http://localhost/WeddingHallsProject-New/WeddingHallsProject/weddingHallProjectBackend';
// Adjust if you run php -S localhost:8000
// const API_BASE = 'http://localhost:8000'; 

async function testBackend() {
    try {
        console.log("🚀 Starting Backend Tests...");

        // 1. Signup Client
        const clientEmail = `client_${Date.now()}@test.com`;
        console.log(`\n1. Testing Signup Client (${clientEmail})...`);
        const signupRes = await axios.post(`${API_BASE}/auth/signup_client.php`, {
            fullName: "Test Client",
            email: clientEmail,
            password: "password123",
            phone: "0123456789",
            city: "Algiers"
        });
        console.log("✅ Signup Client:", signupRes.data);

        // 2. Login Client
        console.log("\n2. Testing Login Client...");
        const loginRes = await axios.post(`${API_BASE}/redaWork/login.php`, {
            email: clientEmail,
            password: "password123"
        });
        console.log("✅ Login Client:", loginRes.data);
        const clientCookie = loginRes.headers['set-cookie'];

        // 3. Signup Owner
        const ownerEmail = `owner_${Date.now()}@test.com`;
        console.log(`\n3. Testing Signup Owner (${ownerEmail})...`);
        await axios.post(`${API_BASE}/auth/signup_owner.php`, {
            fullName: "Test Owner",
            email: ownerEmail,
            password: "password123",
            phone: "0987654321",
            wilaya: "Oran"
        });
        console.log("✅ Signup Owner: Success");

        // 4. Login Owner
        console.log("\n4. Testing Login Owner...");
        const ownerLoginRes = await axios.post(`${API_BASE}/redaWork/login.php`, {
            email: ownerEmail,
            password: "password123"
        });
        console.log("✅ Login Owner:", ownerLoginRes.data);
        const ownerId = ownerLoginRes.data.user.id;

        // 5. Add Hall
        console.log("\n5. Testing Add Hall...");
        const hallRes = await axios.post(`${API_BASE}/aishaWork/ownerAddHall.php`, {
            owner_id: ownerId,
            name: "Grand Test Hall",
            location: "Oran Center",
            price: 50000,
            description: "A magnificent hall for testing.",
            images: ["img1.jpg", "img2.jpg"],
            lat: 35.69,
            lng: -0.63
        });
        console.log("✅ Add Hall:", hallRes.data);

        // 6. Get All Halls
        console.log("\n6. Testing Get Halls...");
        const getHallsRes = await axios.get(`${API_BASE}/akramWork/getAllHalls.php`);
        console.log(`✅ Get Halls: Found ${getHallsRes.data.length} halls`);
        const newHall = getHallsRes.data.find(h => h.name === "Grand Test Hall");

        if (newHall) {
            // 7. Book Hall (as Client)
            console.log("\n7. Testing Book Hall...");
            const bookingRes = await axios.post(`${API_BASE}/ayaWork/createHallBooking.php`, {
                client_id: loginRes.data.user.id,
                hall_id: newHall.id,
                start_date: "2025-12-01",
                end_date: "2025-12-02",
                total_price: 50000
            });
            console.log("✅ Book Hall:", bookingRes.data);
        } else {
            console.error("❌ Could not find the new hall to book.");
        }

        console.log("\n🎉 All Tests Passed!");

    } catch (error) {
        console.error("❌ Test Failed:", error.response ? error.response.data : error.message);
    }
}

testBackend();
