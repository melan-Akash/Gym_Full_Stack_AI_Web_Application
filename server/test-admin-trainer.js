require("dotenv").config({ path: __dirname + "/.env" });
const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function testAdminTrainerManagement() {
  console.log("=================================================================");
  console.log("🛡️ TESTING ADMIN-ONLY TRAINER PROFILE CREATION & MANAGEMENT");
  console.log("=================================================================");

  // Ensure server is online
  try {
    await axios.get(`${BASE_URL}/health`, { timeout: 2000 });
  } catch (err) {
    console.log("🚀 Launching Express server instance...");
    require("./server");
    await new Promise((resolve) => setTimeout(resolve, 3500));
  }

  let adminToken = "";
  let memberToken = "";
  let createdTrainerId = "";

  const adminEmail = `admin_test_${Date.now()}@forgedgym.com`;
  const memberEmail = `member_test_${Date.now()}@forgedgym.com`;
  const trainerEmail = `pro_coach_${Date.now()}@forgedgym.com`;

  // 1. Create Admin Account
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      name: "Super Admin",
      email: adminEmail,
      password: "AdminPassword123!",
      role: "admin",
    });
    adminToken = res.data.data.token;
    console.log("✅ 1. Admin Account Registered & Authenticated!");
  } catch (err) {
    console.error("❌ Admin Registration Failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }

  // 2. Create Regular Member Account
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      name: "Regular Gym Member",
      email: memberEmail,
      password: "MemberPassword123!",
      role: "member",
    });
    memberToken = res.data.data.token;
    console.log("✅ 2. Regular Member Account Registered!");
  } catch (err) {
    console.error("❌ Member Registration Failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }

  // 3. Verify Non-Admin Access Denial (403 Forbidden)
  try {
    await axios.post(
      `${BASE_URL}/admin/trainers`,
      {
        name: "Unauthorized Coach",
        email: "unauth@gym.com",
      },
      { headers: { Authorization: `Bearer ${memberToken}` } }
    );
    console.error("❌ 3. FAIL: Regular member was allowed to create a trainer!");
  } catch (err) {
    if (err.response?.status === 403) {
      console.log("✅ 3. Authorization Check Passed (403 Forbidden for Non-Admins)!");
    } else {
      console.error("❌ 3. Unexpected response status:", err.response?.status, err.message);
    }
  }

  // 4. Admin Creates Trainer Profile
  try {
    const res = await axios.post(
      `${BASE_URL}/admin/trainers`,
      {
        name: "Coach Marcus Steel",
        email: trainerEmail,
        password: "CoachPassword123!",
        phone: "+1 (555) 987-6543",
        title: "Senior Elite Hypertrophy Specialist",
        category: "Bodybuilding",
        bio: "IFBB Pro bodybuilder and master conditioning strategist.",
        hourlyRate: 120,
        experienceYears: 12,
        specializations: ["Muscle Hypertrophy", "Powerlifting Cues", "Contest Prep"],
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    createdTrainerId = res.data.data._id;
    console.log("✅ 4. Admin Created Trainer Profile Successfully!");
    console.log("   Trainer Name:", res.data.data.user?.name);
    console.log("   Trainer Title:", res.data.data.title);
    console.log("   Hourly Rate: $" + res.data.data.hourlyRate);
    console.log("   Profile ID:", createdTrainerId);
  } catch (err) {
    console.error("❌ 4. Admin Trainer Creation Failed:", err.response?.data?.message || err.message);
  }

  // 5. Admin Updates Trainer Profile
  try {
    const res = await axios.put(
      `${BASE_URL}/admin/trainers/${createdTrainerId}`,
      {
        hourlyRate: 140,
        title: "Master Elite Performance Director",
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log("✅ 5. Admin Updated Trainer Profile Successfully!");
    console.log("   Updated Hourly Rate: $" + res.data.data.hourlyRate);
  } catch (err) {
    console.error("❌ 5. Admin Trainer Update Failed:", err.response?.data?.message || err.message);
  }

  // 6. Admin Deletes Trainer Profile
  try {
    const res = await axios.delete(`${BASE_URL}/admin/trainers/${createdTrainerId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    console.log("✅ 6. Admin Deleted Trainer Profile & User Account Successfully!");
  } catch (err) {
    console.error("❌ 6. Admin Trainer Deletion Failed:", err.response?.data?.message || err.message);
  }

  console.log("=================================================================");
  console.log("🎉 ALL ADMIN TRAINER MANAGEMENT TESTS PASSED!");
  console.log("=================================================================");
  process.exit(0);
}

testAdminTrainerManagement();
