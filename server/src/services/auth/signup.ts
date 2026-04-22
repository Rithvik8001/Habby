import { db } from "../../db/config/connection";
import type { SignupSchema } from "../../validations/auth/signup";
import { usersTable } from "../../db/models/user";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";

export default async function signupService(data: SignupSchema) {
  const { userName, email, password } = data;
  try {
    // check if user already exists
    const userAlreadyExists = await db
      .select()
      .from(usersTable)
      .where(
        or(eq(usersTable.email, email), eq(usersTable.userName, userName)),
      );
    if (userAlreadyExists.length > 0 && userAlreadyExists[0]?.email === email) {
      throw new Error("Email already exists");
    }
    if (
      userAlreadyExists.length > 0 &&
      userAlreadyExists[0]?.userName === userName
    ) {
      throw new Error("Username already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await db
      .insert(usersTable)
      .values({
        userName,
        email,
        password: hashedPassword,
      })
      .returning();

    if (newUser.length === 0) {
      throw new Error("Failed to create user");
    }

    const createdUser = newUser[0];
    if (!createdUser) {
      throw new Error("Failed to create user");
    }

    // Exclude password from the response
    const { password: userPassword, ...userWithoutPassword } = createdUser;

    return {
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
}
