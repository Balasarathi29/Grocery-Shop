import { User } from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createAuthToken } from "../utils/token.js";

const userToResponse = (user) => ({
  id: String(user._id),
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role,
});

const buildAuthResponse = (user) => ({
  token: createAuthToken({
    sub: String(user._id),
    role: user.role,
  }),
  user: userToResponse(user),
});

export async function registerUser(request, response, next) {
  try {
    const { fullName, email, phone, password } = request.body;

    if (!fullName || !email || !phone || !password) {
      response.status(400);
      throw new Error("fullName, email, phone and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await User.exists({ email: normalizedEmail });

    if (exists) {
      response.status(409);
      throw new Error("An account with this email already exists.");
    }

    const createdUser = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      passwordHash: hashPassword(password),
      role: "customer",
    });

    response.status(201).json(buildAuthResponse(createdUser));
  } catch (error) {
    next(error);
  }
}

export async function loginUser(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400);
      throw new Error("email and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      response.status(401);
      throw new Error("Invalid email or password.");
    }

    response.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(request, response, next) {
  try {
    response.json({ user: userToResponse(request.user) });
  } catch (error) {
    next(error);
  }
}
