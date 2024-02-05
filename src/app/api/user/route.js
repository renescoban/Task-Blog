import { NextResponse } from "next/server";
import { getAuth, auth } from "@clerk/nextjs/server";

export const GET = async (req, res) => {
    
   // const { userId } = auth();
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId);


    if (!userId) {
        console.log("Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }
   
    // Perform your Route Handler's logic
    console.log("Authorized");
    return NextResponse.json({ userId }, { status: 200 });
   
  
  }