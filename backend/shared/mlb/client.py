import statsapi

def get_schedule(start_date, end_date):
    return statsapi.schedule(start_date=start_date, end_date=end_date)

def get_standings(league_id):
    return statsapi.standings_data(league_id)
    