import Link from "next/link";

export default function GameResults({games}) {
    
    return(
        <div>
            <ul>
                {games.map(game => (
                    <li key={game.id}><Link href={`/games/${game.id}`}>{game.game_name}</Link></li>
                ))}
            </ul>
        </div>
        )
}