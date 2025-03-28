CREATE TABLE IF NOT EXISTS user_info(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT,
  created_at DATE,
  bio TEXT,
  clerk_id TEXT UNIQUE
)

CREATE TABLE IF NOT EXISTS games(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game_name TEXT,
  game_info TEXT,
  game_img TEXT
)

CREATE TABLE IF NOT EXISTS game_stories(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game_id INT REFERENCES games(id),
  story_title TEXT,
  story_cont TEXT,
  clerk_id TEXT REFERENCES user_info(clerk_id),
  time_created TIMESTAMPTZ
)

CREATE TABLE IF NOT EXISTS game_review(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  review_cont TEXT,
  game_id INT REFERENCES games(id),
  clerk_id TEXT REFERENCES user_info(clerk_id),
  time_posted TIMESTAMPTZ
)