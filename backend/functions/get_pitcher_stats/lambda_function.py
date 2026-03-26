from shared.mlb.pitchers import get_clean_pitcher_stats
from shared.utils.responses import error_response, success_response


def lambda_handler(event, context):
    try:
        query_params = event.get("queryStringParameters") or {}
        player_id = query_params.get("playerId")

        if not player_id:
            return error_response(
                message="Missing required query parameter: playerId",
                status_code=400,
            )

        pitcher_stats = get_clean_pitcher_stats(int(player_id))
        return success_response(pitcher_stats)

    except Exception as exc:
        return error_response(
            message="Failed to get pitcher stats.",
            status_code=500,
            details=str(exc),
        )
