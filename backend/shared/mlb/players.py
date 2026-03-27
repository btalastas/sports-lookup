from shared.mlb.client import lookup_player

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