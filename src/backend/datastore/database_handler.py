import psycopg2
import logging
import os 


class DatabaseHandler():
    
    def __init__(self):
        self.DATABASE_URL =  "postgresql://anthony:TYG9SLwtWVGyFeg5oy7E1A@scary-grizzly-6061.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

    def nuke_database(self):
        with psycopg2.connect(self.DATABASE_URL) as conn:
                with conn.cursor() as cur:
                    cur.execute("DELETE FROM NLOQ.SportsbookComparison")
                    cur.execute("DELETE FROM NLOQ.Players")
                    cur.execute("DELETE FROM NLOQ.Events")
                    cur.execute("DELETE FROM NLOQ.Teams")
        conn.commit()

    def insert_event(self, event_object):
        event_id = event_object["eventid"]
        
        with psycopg2.connect(self.DATABASE_URL) as conn:
                with conn.cursor() as cur:
                    # Check if the event ID already exists
                    cur.execute("SELECT EventID FROM NLOQ.Events WHERE EventID = %s", (event_id,))
                    existing_event = cur.fetchone()

                    if not existing_event:
                        # Event ID does not exist, proceed with the insertion
                        cur.execute(
                            "INSERT INTO NLOQ.Events (EventID, EventName, Market) VALUES (%s, %s, %s)",
                            (event_object["eventid"],
                            event_object["eventname"],
                            event_object["market"])
                        )
                        conn.commit()
                    else:
                        print(f"Event with ID {event_id} already exists in the table. Skipping insertion.")
        conn.commit()
        

    def insert_player(self, player_object):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO NLOQ.Players (PlayerID, PlayerName, TeamID) VALUES (%s, %s, %s)",
                    (player_object["PlayerID"],
                     player_object["PlayerName"],
                    player_object["TeamID"])
                )
        conn.commit()

    def insert_sportsbook(self, sportsbook_object):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO NLOQ.SportsbookComparison 
                    (SportsBookID, SportsBookName, Value, Over, Under, EventID, PlayerID) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                        (
                        sportsbook_object["SportsBookID"],
                        sportsbook_object["SportsBookName"],
                        sportsbook_object["Value"],
                        sportsbook_object["Over"],
                        sportsbook_object["Under"],
                        sportsbook_object["EventID"],
                        sportsbook_object["PlayerID"]
                    )

                )
        conn.commit()

    def insert_team(self, team_object):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO NLOQ.Teams 
                    (TeamID, City, TeamName, Conference, Division, PointsPerGame,
                    OpponentPointsPerGame, Wins, Losses, Ties, MoneylineWins,
                    MoneylineLosses, MoneylineTies, SpreadWins, SpreadLosses, 
                    SpreadTies, TotalWins, TotalLosses, TotalTies)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        team_object["TeamID"],
                        team_object["City"],
                        team_object["TeamName"],
                        team_object["Conference"],
                        team_object["Division"],
                        team_object["PointsPerGame"],
                        team_object["OpponentPointsPerGame"],
                        team_object["Wins"],
                        team_object["Losses"],
                        team_object["Ties"],
                        team_object["MoneylineWins"],
                        team_object["MoneylineLosses"],
                        team_object["MoneylineTies"],
                        team_object["SpreadWins"],
                        team_object["SpreadLosses"],
                        team_object["SpreadTies"],
                        team_object["TotalWins"],
                        team_object["TotalLosses"],
                        team_object["TotalTies"]
                    )
                )
        conn.commit()

    def read_team(self, teamid):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM NLOQ.Teams where teamid = %s", (teamid,))
                team = cur.fetchone()
        return team
    
    def read_events(self):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM NLOQ.Events")
                events = cur.fetchall()
        return events

    def read_players(self):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM NLOQ.Players")
                players = cur.fetchall()
        return players

    def read_sportsbooks(self,eventid):
        with psycopg2.connect(self.DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM NLOQ.SportsbookComparison WHERE eventid = %s", (eventid,))
                sportsbooks = cur.fetchall()
        return sportsbooks


    