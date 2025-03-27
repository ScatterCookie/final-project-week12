import { db } from "../utils/db"

export async function GET(request){
    try{
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get(`query`)

        const results = await db.query(`SELECT * FROM gameS WHERE game_name LIKE $1`,[`%${query}%`])
        console.log(results)
    } catch(e){
        return Response.json({error: e})
    }
}