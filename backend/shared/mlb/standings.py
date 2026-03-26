def clean_standings(league_standings):
    cleaned_divisions = []

    league_names = {
        103: "American League",
        104: "National League",
    }

    for league_id, divisions in league_standings.items():
        for division_id, division_data in divisions.items():
            cleaned_teams = []

            for team in division_data.get("teams", []):
                cleaned_teams.append({
                    "teamId": team.get("team_id"),
                    "teamName": team.get("name"),
                    "divisionRank": int(team["div_rank"]) if team.get("div_rank", "").isdigit() else None,
                    "wins": team.get("w"),
                    "losses": team.get("l"),
                    "gamesBack": team.get("gb"),
                    "wildCardRank": team.get("wc_rank"),
                    "wildCardGamesBack": team.get("wc_gb"),
                    "leagueRank": team.get("league_rank"),
                    "sportRank": team.get("sport_rank"),
                })

            cleaned_divisions.append({
                "leagueId": league_id,
                "leagueName": league_names.get(league_id),
                "divisionId": division_id,
                "divisionName": division_data.get("div_name"),
                "teams": cleaned_teams,
            })

    return cleaned_divisions
