from shared.mlb.batters import get_clean_batter_stats
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

        try:
            player_id = int(player_id)
        except (TypeError, ValueError):
            return error_response(
                message="Invalid query parameter: playerId must be an integer",
                status_code=400,
            )

        batter_stats = get_clean_batter_stats(player_id)
        return success_response(batter_stats)

    except Exception as exc:
        return error_response(
            message="Failed to get batter stats.",
            status_code=500,
            details=str(exc),
        )
