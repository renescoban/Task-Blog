import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Blog, User } from "../../../models/blog";
import connectMongoDB from "../../../libs/mongod"
import { getAuth, auth, currentUser } from "@clerk/nextjs/server";

const MONGODB_URI = "mongodb://127.0.0.1:27017/blogtask"


export const POST = async (req, res) => {

  try {
    //const conn = await mongoose.connect(MONGODB_URI)
    await connectMongoDB();


    //User Data
    //const { userId } = auth();
    // const user1 = userId ? await clerkClient.users.getUser(userId) : null;
    const _user = await currentUser();
    if (!_user) {
      console.log("Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("Authorized User!");

    const sampleUser = {
      username: _user.username,
      userId: _user.id,
      firstName: _user.firstName,
      lastName: _user.lastName,
      email: _user.emailAddresses[0].emailAddress,
    };
    console.log("POSTED User: ", sampleUser, "USER!", _user.firstName);

    //Blog Data
    const data = await req.json()
    let _title = data.postData.title
    let _desc = data.postData.description
    //console.log('Received data:', data,);
    /*
        const blog = new Blog({
          title: _title,
          content: _desc
        });
        await blog.save();
    */
    // console.log("POSTED Blog: " + blog);




    User.findOne({ userId: sampleUser.userId })
      .then(existingUser => {
        if (!existingUser) {
          // If the user doesn't exist, create a new user
          return User.create(sampleUser);
        }
        return existingUser;
      })
      .then(user => {
        // Create a new post
        const blog = new Blog({
          title: _title,
          content: _desc,
          author: user._id,
        });
        return blog.save();
      })
      .then(savedPost => {
        console.log('Post saved successfully:', savedPost);
      })
      .catch(error => {
        console.error('Error saving post:', error);
      })
      .finally(() => {
        mongoose.disconnect();
        console.log("posting/user Success");
      });








    

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
export const PUT = async (req, { params }) => {
  try {
    const data = await req.json()
    const user_id = data.postData.id
    const title = data.postData.title
    const content = data.postData.content

    console.log('UPDATE R data:', data.postData);
    delete data.postData.id;
    const updatedData = { ...data.postData, }
    console.log('WILL UPDATED data:', updatedData);

    await connectMongoDB();

    const updated = await Blog.findByIdAndUpdate(user_id, { title: title, content: content, updatedAt: Date.now() });
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
    console.log("DELETE: ", "id: ", user_id);

    await connectMongoDB();

    await Blog.findByIdAndDelete(user_id);

    await mongoose.disconnect().then(console.log("discn"));

    return NextResponse.json({ data: "DELETE: Success" })

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}