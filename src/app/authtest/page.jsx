import { auth, currentUser } from "@clerk/nextjs";

export default async function page() {

    const userData = getUser();
    const userDataonAPI = getUser();
    const [user , userOnApi]= await Promise.all([userData,userDataonAPI])
    console.log("USER:  ",user);//currentUsr
    console.log("USER ON API:  ",userOnApi.firstName);//fetch user

    
  return (
    <div>page
        <p></p>
        <p>test api user: </p>
    </div>
  )
}


const getUser = async () =>{
    try {
 // Get the userId from auth() -- if null, the user is not logged in
 const { userId } =  auth();
 
 if (userId) {
   // Query DB for user specific information or display assets only to logged in users 
 }

 // Get the Backend API User object when you need access to the user's information
    const user = await currentUser()
 // Use `user` to render user details or create UI elements


    
    return user
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('getUser:Error:', error);
  }
}

const fetchUser = async () =>{
    try {
        // Make a POST request using Axios
        const res = await fetch('http://localhost:3000/api/user', { cache: 'no-store' })
        if (res.ok) {
            console.log("fet user suc.!")
        } else {
            console.log("fet user Something is wrong.")
        }
        // Handle the response data
        console.log('Response:', res.json());

    } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
    }
}




// "use client"
// import { useAuth,useUser  } from "@clerk/nextjs";

// export default function Page() {
//     const { isLoaded, userId, sessionId, getToken } = useAuth();
//     const { isSignedIn, user } = useUser();
 
 
// // In case the user signs out while on the page.
//   if (!isLoaded || !userId|| !isSignedIn) {
//     return null;
//   }

 
 
//   return (
//     <div>
//       <div>Hello, {userId} your current active session is {sessionId}</div>
//       <div>Hello, {user.firstName} welcome to Clerk</div>;
//     </div>
//   );
// }




// import { auth, signIn, signOut } from "../../auth";

// function SignIn() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn("github");
//       }}
//     >
//       <p>You are not logged in</p>
//       <button type="submit" className="p-2 border bg-slate-500" >Sign in with GitHub</button>
//     </form>
//   );
// }

// function SignOut({ children }) {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signOut();
//       }}
//     >
//       <p>{children}</p>
//       <button type="submit">Sign out</button>
//     </form>
//   );
// }

// export default async function Page() {
//   let session = await auth();
//   let user = session?.user?.email;

//   return (
//     <section>
//       <h1>Home</h1>
//       <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
//     </section>
//   );
// }