# Datastore

Cockroach DB 
https://cockroachlabs.cloud/cluster/ec4982d5-3b31-40b1-a046-c7de92d45171/overview?cluster-type=serverless

# TYG9SLwtWVGyFeg5oy7E1A
this folder contains source code for the datastore portion of the project

## Database User Stories

I want to be able to get a list of sports book comparisons for a particular player in a specific sport, market, and date.

I want a list of all the markets for a given sport 

I want to know all the sports 

Given a sport, market, and date, tell me all the players I can bet on. 


## Database Schema Draft
-- Table to store information about events (e.g., NBA games)
TABLE Events (
    EventID INT PRIMARY KEY, # assigned by the webscraper
    EventName VARCHAR(255) #NBA/NHL/NFL
    Market VARCHAR(255)
);

-- Table to store player information
TABLE Players (
    PlayerID INT PRIMARY KEY,
    PlayerName VARCHAR(255),
    TeamID, Foreign key references to Teams Table
);


-- Table to store sportsbook comparison
TABLE SportsbookComparison (
    SportsBookID INT,
    SportsBookName VARCHAR(255),
    Value FLOAT,
    Over FLOAT,
    Under FLOAT,
    EventID INT, -- Foreign key reference to Events table
    PlayerID INT, -- Foreign key reference to Players table
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
);


-- Table to store team information
TABLE Teams (
    TeamID INT PRIMARY KEY,
    City VARCHAR(255),
    TeamName VARCHAR(255),
    Conference VARCHAR(255),
    Division VARCHAR(255),
    PointsPerGame FLOAT,
    OpponentPointsPerGame FLOAT,
    Wins INT,
    Losses INT,
    Ties INT,
    MoneylineWins INT,
    MoneylineLosses INT,
    MoneylineTies INT,
    SpreadWins INT,
    SpreadLosses INT,
    SpreadTies INT,
    TotalWins INT,
    TotalLosses INT,
    TotalTies INT
);

TABLE 
    EXBET1 FLOAT
    EXBET2 FLOAT
    EXBET3 VARCHAR(255)
    SportsbooksID -- Foreign key reference to SportsBookComparision table
    PlayerID -- Foreign key reference to Player table
    EventID INT, -- Foreign key reference to Events table
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (EventID) REFERENCES Events(EventID),