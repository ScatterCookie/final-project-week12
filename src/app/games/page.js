import Image from "next/image";
import NavBar from "../components/NavBar";
import NewReview from "../components/NewReview";
import { db } from "../utils/db";
import Link from "next/link";
import NewGameForm from "../components/NewGameForm";
import Style from "./games-page.module.css"

export default async function Page() {
  const games = await db.query("SELECT * FROM games");

  return (
    <div className={Style.container}>
      <nav className={Style.sidebar}>
        <NavBar />
      </nav>

      <main className={Style.mainContent}>
        <header className={Style.header}>
          <h1 className={Style.sectionTitle}>Featured Games</h1>
          <Link href="/games/edit" className={Style.addButton}>
            + Add New Game
          </Link>
        </header>

        <div className={Style.gamesGrid}>
          {games.rows.map((game, index) => (
            <article
              key={game.id}
              className={Style.gameCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
            </article>
          ))}
          {games.rows.map((game) => (
            <article 
              key={game.id}
              className={Style.gameCard}
            >
              {game.is_hot && <span className={style.hotBadge}>🔥 HOT</span>}
              
              <div className={Style.imageContainer}>
                <Image
                  src={game.game_img}
                  alt="game poster"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={Style.gameImage}
                />
              </div>

              <h2>{game.game_name}</h2>
              <p className={Style.gameInfo}>{game.game_info.substring(0, 100)}...</p>
              
              <Link 
                href={`/games/${game.id}`} 
                className={Style.readMore}
              >
                Explore Game
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}