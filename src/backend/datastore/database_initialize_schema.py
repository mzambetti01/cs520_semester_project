import os
import psycopg2

os.environ["DATABASE_URL"] =  "postgresql://anthony:TYG9SLwtWVGyFeg5oy7E1A@scary-grizzly-6061.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
conn = psycopg2.connect(os.environ["DATABASE_URL"])

with conn.cursor() as cur:
    cur.execute("CREATE SCHEMA IF NOT EXISTS NLOQ")
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS NLOQ.Events ( 
            EventID INT PRIMARY KEY,
            EventName VARCHAR(255),
            Market VARCHAR(255)
        )
        """)
    cur.execute(
    """
        CREATE TABLE IF NOT EXISTS NLOQ.Players (
            PlayerID INT PRIMARY KEY,
            PlayerName VARCHAR(255),
            TeamID INT
        )
    """
    )
    cur.execute(
    """
        CREATE TABLE NLOQ.SportsbookComparison (
            SportsBookID INT,
            SportsBookName VARCHAR(255),
            Value FLOAT,
            Over FLOAT,
            Under FLOAT,
            EventID INT, 
            PlayerID INT, 
            Market VARCHAR(255),
            CONSTRAINT a FOREIGN KEY (EventID) REFERENCES NLOQ.Events(EventID),
            CONSTRAINT b FOREIGN KEY (PlayerID) REFERENCES NLOQ.Players(PlayerID),
            CONSTRAINT c primary key(SportsBookID, EventID, PlayerID, Market)
            )
    """
    )
    cur.execute(
    """
        CREATE TABLE IF NOT EXISTS NLOQ.Teams (
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
        )
    """
    )
    cur.execute(
    """
        CREATE TABLE IF NOT EXISTS NLOQ.BetAnalysis(
        SportsBookID INT,
        SportsBookName VARCHAR(255),
        EventID INT,
        PlayerID INT,
        Market VARCHAR(255),
        ExpectedValue FLOAT,
        OverImpliedProb FLOAT,
        UnderImpliedProb FLOAT,
        TotalImpliedProb FLOAT,
        Overage FLOAT,
        Vigorish FLOAT,
        OverAdjustedProb FLOAT,
        UnderAdjustedProb FLOAT,
        OverAdjustedOdds FLOAT,
        UnderAdjustedOdds FLOAT,
        CONSTRAINT a FOREIGN KEY (EventID) REFERENCES NLOQ.Events(EventID),
        CONSTRAINT c FOREIGN KEY (PlayerID) REFERENCES NLOQ.Players(PlayerID),
        CONSTRAINT d PRIMARY key(SportsBookID, EventID, PlayerID, Market)
        )
    """
    )
    #res = cur.fetchall()
    conn.commit()
    #print(res)