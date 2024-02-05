//export { auth as default } from "./auth";
//export { auth } from "./auth";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/api/blogs',"'/api/","/api/blogs/(.*)" ],
  //publicRoutes: ["((?!^/blog/).*)", "((?!^/blog/add/).*)" ],
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

