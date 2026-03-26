# Project Process Outline

This document outlines the intended process for building the sports lookup web app with:

- a frontend app for the user interface
- Python APIs for sports data collection and transformation
- AWS services for hosting and backend delivery

## Project Goal

Build a web app that displays sports data in a clean frontend while using Python-based backend logic to fetch, shape, cache, and return data through AWS-hosted APIs.

## High-Level Architecture

```text
Frontend App
    |
    v
API Gateway
    |
    v
AWS Lambda Functions
    |
    +--> Shared Python Layer
    |
    +--> External sports data APIs
    |
    +--> Optional cache/storage (DynamoDB or S3)
```

## Recommended Repository Roles

### `frontend/`

Contains the web app code.

Responsibilities:
- render schedule, standings, and player statistics
- call backend API endpoints
- handle loading, error, and empty states

### `backend/functions/`

Contains one Lambda function per API responsibility.

Examples:
- `get_schedule`
- `get_standings`
- `get_pitcher_stats`

Responsibilities:
- receive request parameters from API Gateway
- call shared Python modules or sports APIs
- validate and normalize data
- return JSON responses to the frontend

### `backend/layer/`

Contains shared Python dependencies and optionally shared internal modules.

Responsibilities:
- reduce duplicate package installs across Lambda functions
- keep individual Lambda zip files smaller
- centralize common dependencies such as `MLB-StatsAPI`, `pandas`, or `requests`

Note:
- commit layer source definitions and your own shared modules
- do not commit generated dependency installs or deployment zip artifacts long-term

## Suggested Repo Layout

```text
project/
  frontend/
    sports-lookup/
  backend/
    functions/
      get_schedule/
        lambda_function.py
      get_standings/
        lambda_function.py
      get_pitcher_stats/
        lambda_function.py
    shared/
      mlb/
        clients.py
        transforms.py
      utils/
        dates.py
        responses.py
    layer/
      requirements.txt
    notebooks/
      mlb-lookup.ipynb
    PROJECT_PROCESS.md
    requirements.txt
  .gitignore
```

### What belongs in git

- frontend source code
- Lambda handler source code
- shared backend modules
- notebook files used for exploration
- backend `requirements.txt`
- infrastructure definitions if added later

### What should stay out of git

- `node_modules`
- frontend build output
- Lambda deployment zip files
- installed layer dependencies from `pip install -t`
- virtual environments
- local editor files and secrets

### `backend/notebooks/`

Contains Jupyter notebooks for exploration and testing.

Responsibilities:
- prototype sports API calls
- inspect raw responses
- test data transformations before moving code into Lambda functions

Note:
- notebooks are for development and validation
- production logic should be moved into `backend/functions/` or shared modules

## Backend Process Flow

### 1. Explore and validate in notebooks

Use the notebook to:
- test sports API endpoints
- inspect returned JSON
- identify the exact fields the frontend needs
- work out parsing and transformation logic

### 2. Move stable logic into Python modules

Once notebook logic is reliable:
- move reusable code into backend modules
- keep handlers thin
- avoid leaving production logic only inside notebooks

Examples of reusable code:
- date helpers
- schedule formatting
- standings transformation
- pitcher stat extraction

Recommended location:
- reusable backend code goes in `backend/shared/`
- endpoint entrypoints stay in `backend/functions/`

### 3. Build Lambda functions by endpoint

Create a dedicated Lambda function for each user-facing backend task.

Examples:
- `GET /schedule`
- `GET /standings`
- `GET /pitcher-stats?name=...`

Each function should:
- accept inputs from API Gateway
- call shared logic
- return a consistent JSON shape
- handle errors cleanly

### 4. Use a shared Lambda Layer

Place shared dependencies in a layer when multiple Lambda functions use the same packages.

Good layer candidates:
- `MLB-StatsAPI`
- `requests`
- `pandas`
- common internal helper modules

Keep the Lambda handler files outside the layer.

Recommended split:
- layer = shared packages and shared modules
- function zip = handler and function-specific code

Practical packaging rule:
- keep `backend/layer/requirements.txt` or another source manifest in git
- generate `backend/layer/python/` only during build/deploy

### 5. Expose functions through API Gateway

Frontend requests should go through AWS API Gateway rather than calling Python APIs directly.

Typical flow:
- frontend requests `/schedule`
- API Gateway routes to Lambda
- Lambda fetches or reads sports data
- Lambda returns JSON
- frontend renders result

### 6. Add caching and scheduled refresh

Sports data changes frequently, so the app should avoid calling external APIs on every single page load.

Recommended options:
- use EventBridge Scheduler to refresh data every few minutes
- store normalized results in DynamoDB or S3
- let frontend-facing Lambdas read from cache first

Benefits:
- faster responses
- reduced API pressure
- more reliable frontend behavior

### 7. Monitor and improve

Use AWS operational services to monitor the backend.

Recommended:
- CloudWatch logs for Lambda debugging
- CloudWatch alarms for failures or latency spikes
- environment variables for API settings and feature toggles
- Secrets Manager or Parameter Store for secrets if needed

## Suggested Build Sequence

1. Finalize notebook experiments for the first endpoint.
2. Move reusable logic into backend Python modules.
3. Create one Lambda function for that endpoint.
4. Package shared dependencies into a Lambda layer.
5. Connect the function to API Gateway.
6. Update the frontend to call the new endpoint.
7. Add caching or scheduled refresh once the endpoint works.
8. Repeat for additional endpoints.

## Suggested Initial Endpoints

- `GET /schedule`
- `GET /standings`
- `GET /pitcher-stats`

Possible later endpoints:
- recent games
- team matchup summaries
- batter statistics
- trend or rolling-window summaries

## Deployment Concept

### Frontend

Host the frontend separately from the Python backend.

Common AWS options:
- S3 + CloudFront
- Amplify

### Backend

Host Python APIs with:
- API Gateway
- Lambda
- shared Lambda layer

Typical deployment outputs:
- one zip per Lambda function
- one zip for the shared layer

### Optional storage

Use when you want caching, history, or precomputed responses:
- DynamoDB for fast lookups
- S3 for stored JSON snapshots

## Practical Rules For This Project

- keep notebooks for exploration, not final production logic
- keep Lambda handlers small and focused
- use layers for shared packages, not for Lambda handlers
- keep one deployment zip per Lambda function
- keep generated zip files and installed dependencies out of git
- commit source code, requirements files, and infrastructure definitions

## Current Working Mental Model

```text
Notebook -> validate API logic
Shared Python modules -> hold reusable backend logic
Lambda functions -> expose endpoint-specific handlers
Lambda layer -> share packages across functions
API Gateway -> expose HTTP endpoints
Frontend -> display the returned sports data
```

## Next Recommended Project Steps

1. Create the first Lambda handler in `backend/functions/`.
2. Decide which packages belong in the shared layer.
3. Separate shared Python helpers from notebook-only code.
4. Define the JSON response format the frontend should consume.
5. Add one API Gateway route for the first working endpoint.
