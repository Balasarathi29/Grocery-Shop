import { User } from "../models/User.js";
import { verifyAuthToken } from "../utils/token.js";

const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    return "";
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return "";
  }

  return token;
};

export async function requireAuth(request, response, next) {
  try {
    const token = getBearerToken(request.headers.authorization);

    if (!token) {
      response.status(401);
      throw new Error("Authentication required.");
    }

    const payload = verifyAuthToken(token);

    if (!payload?.sub) {
      response.status(401);
      throw new Error("Invalid authentication token.");
    }

    const user = await User.findById(payload.sub).lean();

    if (!user) {
      response.status(401);
      throw new Error("User session is no longer valid.");
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireAdmin(request, response, next) {
  if (request.user?.role !== "admin") {
    response.status(403);
    next(new Error("Admin access required."));
    return;
  }

  next();
}
