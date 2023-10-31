import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import logging 
class WebScraper():

    def __init__(self):
        self.base_url = "https://www.scoresandodds.com"
        self.api_base_url = "https://rga51lus77.execute-api.us-east-1.amazonaws.com/prod/market-comparison"



    def get_player_list(self, EVENT: str, market:str):
        """_summary_

        Args:
            EVENT (str): Sports league. nba, nhl, etc.
            market (str): statistic of interest. Points, steals etc.

        Returns:
            player_list JSON: player_object
        """
        player_list = []

        # prep market string:
        market = market.replace(' ','%20')

        # prep event string
        EVENT = EVENT.lower()

        url = f"{self.base_url}/{EVENT}/props/{market}"

        logging.info(f"request url: {url}")

        response = requests.get(url)
        logging.info(f"Status Code: {response.status_code}")

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            player_data_list = soup.find("ul", class_ = "table-list") 
            player_blocks = player_data_list.find_all("li", class_ = "border")

            for block in player_blocks:
                eventID = None
                event_tag = block.find('div', class_ = "table-list-col")
                eventID = event_tag['data-auth'][8:]

                name_tag = block.find("div", class_ = "props-name")
                player_name_tag = name_tag.find("a")
                player_name = player_name_tag.text
                #print(player_name.split())
                player_name = player_name.replace(' ', '%20')

                player_object = {
                    "EVENT" : EVENT,
                    "market" : market,
                    "eventID": eventID,
                    "player_name": player_name
                }
                player_list.append(player_object)

            logging.info(f"Succefully scraped {len(player_list)} events")
            return player_list
        
        else:
            return None
    
    def get_player_odds(self, player_object):
        EVENT = player_object["EVENT"]
        market = player_object["market"]
        eventID = player_object["eventID"]
        player_name = player_object["player_name"]
        
        # et-comparison?event={EVENT}%2F{eventID}&market={MARKETS['points']}&filter={player_name}"

        api_url = f"{self.api_base_url}?event={EVENT}%2F{eventID}&market={market}&filter={player_name}"
        
        logging.info(f"Requesting : {api_url}")

        response = requests.get(api_url)

        logging.info(f"Status Code: {response.status_code}")

        if response.status_code == 200:

            response_json = response.json()

            # get teams table data

            raw_team = response_json['event']['home']

            team_object = {
                "TeamID" : raw_team["id"],
                "City" : raw_team["city"],
                "TeamName" : raw_team['mascot'],
                "Conference" : raw_team['conference'],
                "Division" : raw_team['division'],
                "PointsPerGame" : raw_team['scoring']['ppg'],
                "OpponentPointsPerGame" : raw_team['scoring']['oppg'],
                "Wins" : raw_team['records']['moneyline']['wins'],
                "Losses" : raw_team['records']['moneyline']['losses'],
                "Ties" : raw_team['records']['moneyline']['ties'],
                "MoneylineWins" : raw_team['records']['moneyline']['wins'],
                "MoneylineLosses" : raw_team['records']['moneyline']['losses'],
                "MoneylineTies" : raw_team['records']['moneyline']['ties'],
                "SpreadWins" : raw_team['records']['spread']['wins'],
                "SpreadLosses" : raw_team['records']['spread']['losses'],
                "SpreadTies" : raw_team['records']['spread']['ties'],
                "TotalWins" : raw_team['records']['total']['wins'],
                "TotalLosses" : raw_team['records']['total']['losses'],
                "TotalTies" : raw_team['records']['total']['ties'],
            }    
            val = response_json['markets'][0]['comparison']
            print(val)

        return response_json
        team_object = {}
        sportbook_objects = []

logging.basicConfig(level=logging.INFO)

scraper = WebScraper()
player_list = scraper.get_player_list("nhl", "points")
output = scraper.get_player_odds(player_list[0])

with open('player_responses.json', 'w') as json_file:
    json_file.truncate()
    json.dump(output, json_file)

