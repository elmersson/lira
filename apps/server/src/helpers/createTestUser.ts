import prisma from "../db";

async function createTestUser() {
  try {
    // Check if any users exist
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      // Create a test user
      const testUser = await prisma.user.create({
        data: {
          cognitoId: "test-user-1",
          username: "testuser",
          emoji: "👤",
          profilePictureUrl: null,
          teamId: null,
        },
      });

      console.log("Created test user:", testUser);
      return testUser;
    }
    // Get the first user
    const firstUser = await prisma.user.findFirst();
    console.log("Using existing user:", firstUser);
    return firstUser;
  } catch (error) {
    console.error("Error creating/finding test user:", error);
    throw error;
  }
}

// Export the function and call it
export { createTestUser };

// Self-executing function to create user when this file is imported
createTestUser().catch(console.error);
