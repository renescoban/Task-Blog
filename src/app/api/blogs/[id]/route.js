import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "../../../../models/blog";
import connectMongoDB from "../../../libs/mongod"

export const GET = async (req, { params }) => {
    try {
        const { id } = params

        await connectMongoDB();
        const blog = await Blog.findById(id).exec();
        //console.log("FOUND RESULT", result);
        await mongoose.disconnect().then(console.log("discn"));

        return NextResponse.json({ blog })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}

export const PUT = async (req, { params }) => {
    try {
        const { id } = params
        const data = await req.json()
        const {title, content} = data.postData
        
        console.log('UPDATE R data:', data.postData);

        await connectMongoDB();

        const updated = await Blog.findByIdAndUpdate( id , { title: title, content: content, updatedAt: Date.now() });
        console.log('UPDATED data:', updated);

        await mongoose.disconnect().then(console.log("discn"));

        return NextResponse.json({ data: "UPDATE: Success" })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}