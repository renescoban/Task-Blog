//export { auth as default } from "./auth";
//export { auth } from "./auth";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)","/api/blogs"],
};

