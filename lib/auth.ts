import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;
const LONG_TERM_EXPIRES_IN = process.env.LONG_TERM_EXPIRES_IN;

export const generateToken = async ({
  id,
  role,
  name
}: {
  id: string;
  role: string;
  name: string;
}) => {
  return await new SignJWT({
    id,
    role,
    name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(LONG_TERM_EXPIRES_IN!)
    .sign(new TextEncoder().encode(jwtSecret!));
};

export const verifyToken = async (
  token: string
): Promise<IUserToken | null> => {
  if (!token) return null;

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret!)
    );
    return verified.payload as unknown as IUserToken;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const generateEmailToken = async (email: string) => {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(jwtSecret!));
};

export const verifyEmailToken = async (
  token: string
): Promise<{ email: string } | null> => {
  if (!token) return null;

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret!)
    );
    return verified.payload as unknown as { email: string };
  } catch (err) {
    console.log(err)
    return null;
  }
};

// Parse the expiration string to milliseconds
export const parseExpirationToMs = (expiration: string) => {
  const value = parseInt(expiration);
  const unit = expiration.slice(-1).toLowerCase();

  switch (unit) {
    case "d":
      return value * 24 * 60 * 60 * 1000; // days
    case "h":
      return value * 60 * 60 * 1000; // hours
    case "m":
      return value * 60 * 1000; // minutes
    case "s":
      return value * 1000; // seconds
    default:
      return 3 * 24 * 60 * 60 * 1000; // default to 3 days
  }
};
