from shared.mlb.client import get_player_stat_data
from shared.mlb.players import lookup_player_id


def build_batters_ref(player_name):
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


def get_batter_stats(player_id):
    return get_player_stat_data(player_id)


def _get_batter_stats(stats_list):
    for stat_entry in stats_list:
        if stat_entry.get("group") == "hitting":
            return stat_entry.get("stats", {})
    return {}


def clean_batter_stats(raw_stats):
    batting_stats = _get_batter_stats(raw_stats.get("stats", []))

    return {
        "playerId": raw_stats.get("id"),
        "firstName": raw_stats.get("first_name"),
        "lastName": raw_stats.get("last_name"),
        "fullName": f"{raw_stats.get('first_name', '')} {raw_stats.get('last_name', '')}".strip(),
        "nickname": raw_stats.get("nickname"),
        "active": raw_stats.get("active"),
        "currentTeam": raw_stats.get("current_team"),
        "position": raw_stats.get("position"),
        "lastPlayed": raw_stats.get("last_played"),
        "mlbDebut": raw_stats.get("mlb_debut"),
        "batSide": raw_stats.get("bat_side"),
        "pitchHand": raw_stats.get("pitch_hand"),
        "batting": {
            "age": batting_stats.get("age"),
            "gamesPlayed": batting_stats.get("gamesPlayed"),
            "groundOuts": batting_stats.get("groundOuts"),
            "airOuts": batting_stats.get("airOuts"),
            "atBats": batting_stats.get("atBats"),
            "plateAppearances": batting_stats.get("plateAppearances"),
            "runs": batting_stats.get("runs"),
            "hits": batting_stats.get("hits"),
            "doubles": batting_stats.get("doubles"),
            "triples": batting_stats.get("triples"),
            "homeRuns": batting_stats.get("homeRuns"),
            "rbi": batting_stats.get("rbi"),
            "stolenBases": batting_stats.get("stolenBases"),
            "caughtStealing": batting_stats.get("caughtStealing"),
            "stolenBasePercentage": batting_stats.get("stolenBasePercentage"),
            "caughtStealingPercentage": batting_stats.get("caughtStealingPercentage"),
            "baseOnBalls": batting_stats.get("baseOnBalls"),
            "intentionalWalks": batting_stats.get("intentionalWalks"),
            "strikeOuts": batting_stats.get("strikeOuts"),
            "hitByPitch": batting_stats.get("hitByPitch"),
            "avg": batting_stats.get("avg"),
            "obp": batting_stats.get("obp"),
            "slg": batting_stats.get("slg"),
            "ops": batting_stats.get("ops"),
            "babip": batting_stats.get("babip"),
            "totalBases": batting_stats.get("totalBases"),
            "leftOnBase": batting_stats.get("leftOnBase"),
            "sacBunts": batting_stats.get("sacBunts"),
            "sacFlies": batting_stats.get("sacFlies"),
            "groundIntoDoublePlay": batting_stats.get("groundIntoDoublePlay"),
            "groundOutsToAirouts": batting_stats.get("groundOutsToAirouts"),
            "numberOfPitches": batting_stats.get("numberOfPitches"),
            "catchersInterference": batting_stats.get("catchersInterference"),
            "atBatsPerHomeRun": batting_stats.get("atBatsPerHomeRun"),
        },
    }


def get_clean_batter_stats(player_id):
    raw_stats = get_batter_stats(player_id)
    return clean_batter_stats(raw_stats)
