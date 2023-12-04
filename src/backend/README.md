Certainly! Below is the entire API documentation in raw markdown format:

```markdown
# API Documentation

## Introduction

This API provides access to sports-related information, including player data, team information, markets, sports leagues, and sports betting data. The API is built using Flask and supports various endpoints for retrieving specific types of data.

## Base URL

The base URL for all endpoints is `http://<your-domain>/`.

## Endpoints

### 1. Get Players in a League

#### Endpoint

```
GET /players/<string:sports_league>
```

#### Parameters

- `sports_league` (string): The sports league for which to retrieve the list of players (e.g., "nhl", "nba", "nfl").

#### Response

```json
{
  "response_object": [ 
    {
      "player_id": int,
      "player_name": string,
      "team": string
    },
    // Additional player objects...
  ],
  "error_message": int
}
```

### 2. Get Team Info Based on Player ID

#### Endpoint

```
GET /team_info/<int:player_id>
```

#### Parameters

- `player_id` (int): The unique identifier for a player.

#### Response

```json
{
  "response_object": {
    "team_name": string,
    "team_city": string,
    // Additional team information...
  },
  "error_message": int
}
```

### 3. Get Markets for a League

#### Endpoint

```
GET /markets/<string:sports_league>
```

#### Parameters

- `sports_league` (string): The sports league for which to retrieve the list of markets (e.g., "nhl", "nba", "nfl").

#### Response

```json
{
  "markets": [ 
    "market_1",
    "market_2",
    // Additional market names...
  ]
}
```

### 4. Get Sports Leagues

#### Endpoint

```
GET /sports_leagues
```

#### Response

```json
{
  "leagues": [ 
    "nhl",
    "nba",
    "nfl",
    // Additional league names...
  ]
}
```

### 5. Get Player Betting Data

#### Endpoint

```
GET /player_betting_data/<int:player_id>
```

#### Parameters

- `player_id` (int): The unique identifier for a player.

#### Response

```json
{
  "response_object": [
    {
      // Additional betting data...
    },
    // Additional response objects...
  ],
  "error_message": int
}
```

### 6. Update Player

#### Endpoint

```
GET /update/<player_name>/<int:eventID>/<string:market>/<string:event>
```

#### Parameters

- `player_name` (string): Player Name, e.g., "Nikita%20Kucherov" or "Nikita Kucherov".
- `eventID` (int): Primary Event ID Key, e.g., 20855.
- `market` (string): Betting market, e.g., "points".
- `event` (string): Sports league, e.g., "nhl".

#### Response

```json
{
  "response_object": "done",
  "error_message": int
}
```

### Helper Functions

#### Update Database

```
GET /update_database
```

#### Response

```json
{
  "response_object": "done",
  "error_message": int
}
```

## Notes

- `int`: Integer data type.
- `string`: String data type.
```

