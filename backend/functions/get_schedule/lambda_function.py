from shared.mlb.client import get_schedule
from shared.mlb.schedule import clean_schedule
from shared.utils.dates import todays_date
from shared.utils.responses import error_response, success_response


def lambda_handler(event, context):
    try:
        today = todays_date()
        raw_schedule = get_schedule(start_date=today, end_date=today)
        cleaned_schedule = clean_schedule(raw_schedule)

        return success_response(cleaned_schedule)

    except Exception as exc:
        return error_response(
            message="Failed to get MLB Schedule",
            status_code=500,
            details=str(exc)
        )
