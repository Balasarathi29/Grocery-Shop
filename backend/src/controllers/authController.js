import { User } from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createAuthToken } from "../utils/token.js";

const googleClient = new OAuth2Client();

const getGoogleClientId = () => process.env.GOOGLE_CLIENT_ID || "";

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

export async function loginWithGoogle(request, response, next) {
  try {
    const { credential } = request.body;
    const googleClientId = getGoogleClientId();

    if (!googleClientId) {
      response.status(500);
      throw new Error(
        "Google login is not configured. Set GOOGLE_CLIENT_ID in backend environment.",
      );
    }

    if (!credential || typeof credential !== "string") {
      response.status(400);
      throw new Error("Google credential token is required.");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      response.status(401);
      throw new Error("Google account email is not verified.");
    }

    const normalizedEmail = payload.email.trim().toLowerCase();
    const googleSubject = String(payload.sub || "");

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.create({
        fullName: String(payload.name || normalizedEmail.split("@")[0]).trim(),
        email: normalizedEmail,
        phone: "",
        passwordHash: hashPassword(
          `google-oauth-${googleSubject}-${normalizedEmail}`,
        ),
        googleSubject,
        role: "customer",
      });
    } else if (!user.googleSubject && googleSubject) {
      user.googleSubject = googleSubject;
      await user.save();
    }

    response.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}
