from shared.mlb.client import get_standings
from shared.mlb.standings import clean_standings
from shared.utils.responses import success_response, error_response


def lambda_handler(event, context):
    try:
        standings_by_league = {
            103: get_standings(103),
            104: get_standings(104),
        }

        cleaned = clean_standings(standings_by_league)
        return success_response(cleaned)

    except Exception as exc:
        return error_response(
            message="Failed to get standings.",
            status_code=500,
            details=str(exc),
        )
