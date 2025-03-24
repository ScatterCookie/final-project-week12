import {auth, currentUser} from "@clerk/nextjs/server"
import { db } from "../utils/db";
import UserForm from "../components/UserForm";
import Image from "next/image";

export default async function Page() {

    const {userId, redirectToSignIn} = await auth()

    const user = await currentUser();

    const userInfo = await db.query(`SELECT * FROM user_info WHERE clerk_id = $1`, [userId])

    if(!userId) return redirectToSignIn()
        
        if(userInfo.rowCount ==0){
            console.log(user)
            return(
                <div>
                    <UserForm />
                </div>
            )
        }
        
  return (
    <>
        <div>
            <p>Hello {userInfo.rows[0].username}, Welcome to your profile!</p>
            <br/>
            <Image className="m-5 rounded-full shadow-black shadow-md" src={user.externalAccounts[0].imageUrl} height={200} width={200} alt="Your profile picture"/>
            <p>What you told us about yourself: </p>
            <br/>
            <p>{userInfo.rows[0].bio}</p>
        </div>
    </>
  );
}
