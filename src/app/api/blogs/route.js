import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/blog";

const MONGODB_URI = "mongodb://127.0.0.1:27017/blogtask"


export const POST = async (req, res) => {

  try {
    const conn = await mongoose.connect(MONGODB_URI)

    const data = await req.json()
    let _title = data.postData.title
    let _desc = data.postData.description

    //await connectToDB();

    console.log('Received data:', data,);

    
    const blog = new Blog({
       title: _title,
       content: _desc
     });
    await blog.save();

    console.log("ARTICLE: " + blog);

  } catch (error) {
    // Handle errors appropriately
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the database connection if opened
    mongoose.connection.close();
    return NextResponse.json({ data: "POST: Success" })
  }

}

export const GET = async (req, res) => {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
      const result = await Blog.find().exec();
      console.log( "FIND RESULT",result);
      await mongoose.disconnect();

      return NextResponse.json(result)
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

  }

  export const PUT = async (req, res) => {
    const data = await req.json()
    let id = data.postData.id

    console.log('UPDATE R data:', data.postData);
    delete data.postData.id;
    const updatedData= {...data.postData, updatedAt: Date.now() }
    console.log('UPDATED data:', updatedData);

    return NextResponse.json({ data: "POST: Success" })
    /*
    try { 
        const conn = await mongoose.connect(MONGODB_URI)
        var user_id = '5eb985d440bd2155e4d788e2'; 
        Blog.findByIdAndUpdate(user_id,  {$set:{ updatedData }}, 
                                    function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Updated User : ", docs); 
            } 
        }); 
      await mongoose.disconnect();

      return NextResponse.json(result)
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
*/
  }