'use client'
import {useDebounce} from "@uidotdev/usehooks"
import { Suspense, useEffect, useState } from "react"
import GameResults from "./GameResults"

export default function SearchBar() {
    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('')
    const debounced = useDebounce(query, 300)

    async function handleSearch(e){
        setQuery(e.target.value)
        console.log(e.target.value)
    }

    useEffect(() =>{
        if(debounced){
            async function fetchGames(){
                console.log('Loading search results...')
                const res = await fetch(`/api?query=${query}`)
                // const data = await res.json()
                console.log(res)
                console.log(data.game_name)
                setSearchResults(data.games)
            }
            fetchGames()
        }
    }, [debounced])
    return(
        <>
        <input onChange={handleSearch}/>
        <Suspense fallback={<p>...loading</p>}>
            {query === '' ? <p></p> : <GameResults games={searchResults} />}
        </Suspense>
            </>
    )
}