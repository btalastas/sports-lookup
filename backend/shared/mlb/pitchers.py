from shared.mlb.client import get_player_stat_data, lookup_player


def lookup_player_id(player_name):
    players = lookup_player(player_name)

    if not players:
        raise ValueError(f"No player found for '{player_name}'")

    exact_match = next(
        (player for player in players if player.get("fullName") == player_name),
        None,
    )

    selected_player = exact_match or players[0]
    return selected_player["id"]


def build_pitcher_ref(player_name):
    if not player_name:
        return None

    try:
        player_id = lookup_player_id(player_name)
    except ValueError:
        player_id = None

    return {
        "name": player_name,
        "playerId": player_id,
    }


def get_pitcher_stats(player_id):
    return get_player_stat_data(player_id)


def _get_pitching_stats(stats_list):
    for stat_entry in stats_list:
        if stat_entry.get("group") == "pitching":
            return stat_entry.get("stats", {})
    return {}


def clean_pitcher_stats(raw_stats):
    pitching_stats = _get_pitching_stats(raw_stats.get("stats", []))

    return {
        "playerId": raw_stats.get("id"),
        "firstName": raw_stats.get("first_name"),
        "lastName": raw_stats.get("last_name"),
        "fullName": f"{raw_stats.get('first_name', '')} {raw_stats.get('last_name', '')}".strip(),
        "active": raw_stats.get("active"),
        "currentTeam": raw_stats.get("current_team"),
        "position": raw_stats.get("position"),
        "mlbDebut": raw_stats.get("mlb_debut"),
        "batSide": raw_stats.get("bat_side"),
        "pitchHand": raw_stats.get("pitch_hand"),
        "pitching": {
            "gamesPlayed": pitching_stats.get("gamesPlayed"),
            "gamesStarted": pitching_stats.get("gamesStarted"),
            "wins": pitching_stats.get("wins"),
            "losses": pitching_stats.get("losses"),
            "era": pitching_stats.get("era"),
            "inningsPitched": pitching_stats.get("inningsPitched"),
            "strikeOuts": pitching_stats.get("strikeOuts"),
            "baseOnBalls": pitching_stats.get("baseOnBalls"),
            "hits": pitching_stats.get("hits"),
            "runs": pitching_stats.get("runs"),
            "earnedRuns": pitching_stats.get("earnedRuns"),
            "homeRuns": pitching_stats.get("homeRuns"),
            "whip": pitching_stats.get("whip"),
            "strikePercentage": pitching_stats.get("strikePercentage"),
            "numberOfPitches": pitching_stats.get("numberOfPitches"),
            "battersFaced": pitching_stats.get("battersFaced"),
            "strikeoutsPer9Inn": pitching_stats.get("strikeoutsPer9Inn"),
            "walksPer9Inn": pitching_stats.get("walksPer9Inn"),
            "hitsPer9Inn": pitching_stats.get("hitsPer9Inn"),
        },
    }


def get_clean_pitcher_stats(player_id):
    raw_stats = get_pitcher_stats(player_id)
    return clean_pitcher_stats(raw_stats)
