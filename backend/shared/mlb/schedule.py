from shared.mlb.pitchers import build_pitcher_ref


def clean_schedule(games):
    cleaned_games = []

    for game in games:
        cleaned_games.append({
            "gameId": game.get("game_id"),
            "gameDate": game.get("game_date"),
            "gameDateTime": game.get("game_datetime"),
            "status": game.get("status"),
            "awayTeam": game.get("away_name"),
            "homeTeam": game.get("home_name"),
            "awayPitcher": build_pitcher_ref(game.get("away_probable_pitcher")),
            "homePitcher": build_pitcher_ref(game.get("home_probable_pitcher")),
            "awayScore": int(game.get("away_score", 0) or 0),
            "homeScore": int(game.get("home_score", 0) or 0),
            "inning": game.get("current_inning") or None,
            "inningState": game.get("inning_state") or None,
            "summary": game.get("summary"),
        })

    return cleaned_games
