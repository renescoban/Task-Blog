import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "../../../models/blog";
import connectMongoDB from "../../libs/mongod"

const MONGODB_URI = "mongodb://127.0.0.1:27017/blogtask"


export const POST = async (req, res) => {

  try {
    const conn = await mongoose.connect(MONGODB_URI)

    const data = await req.json()
    let _title = data.postData.title
    let _desc = data.postData.description

    //await connectToDB();

    //console.log('Received data:', data,);


    const blog = new Blog({
      title: _title,
      content: _desc
    });
    await blog.save();

    console.log("POSTED Blog: " + blog);
    await mongoose.disconnect();

    return NextResponse.json({ data: "POST: Success" })
  } catch (error) {
    // Handle errors appropriately
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

export const GET = async (req, res) => {
  try {
    const conn = await mongoose.connect(MONGODB_URI)
    const result = await Blog.find().exec();
    //console.log("FOUND RESULTs", result);
    await mongoose.disconnect();

    return NextResponse.json(result)
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}

//Not using
export const PUT = async (req, {params}) => {
  try {
    const data = await req.json()
    const user_id = data.postData.id
    const title= data.postData.title
    const content= data.postData.content

    console.log('UPDATE R data:', data.postData);
    delete data.postData.id;
    const updatedData = { ...data.postData, }
    console.log('WILL UPDATED data:', updatedData);

    await connectMongoDB();

    const updated =await Blog.findByIdAndUpdate(user_id, { title:title, content:content, updatedAt: Date.now() });
    console.log('UPDATED data:', updated);

    await mongoose.disconnect().then(console.log("discn"));

    return NextResponse.json({ data: "UPDATE: Success" })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export const DELETE = async (req, res) => {
  try {
    //const id = req.nextURL.searchParams.get("id");
    const data = await req.json()
    const user_id = data.id
    console.log("DELETE: ","id: ",user_id);

    await connectMongoDB();

    await Blog.findByIdAndDelete(user_id);

    await mongoose.disconnect().then(console.log("discn"));

    return NextResponse.json({ data: "DELETE: Success" })

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}