import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Blog, User } from "../../../models/blog";
import connectMongoDB from "../../../libs/mongod"
import { auth, currentUser } from "@clerk/nextjs/server";

export const GET = async () => {
    try {
        
        const _user = await currentUser();
        if (!_user) {
          console.log("Unauthorized");
          return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectMongoDB();

        const result = User.findOne({ userId: _user.userId })
            .then(user => {
                if (user) {
                    // Find posts by the user's _id
                    return Blog.find({ author: user._id })
                } else {
                    console.log('User not found');
                    return [];
                }
            })
            .then(userPosts => {
                console.log('Posts by the user:', userPosts);
            })
            .catch(error => {
                console.error('Error retrieving posts:', error);
            })
            .finally(() => {
                // Close the database connection
                mongoose.disconnect();
            });


        return NextResponse.json({ result })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}