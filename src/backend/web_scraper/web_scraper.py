import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

class WebScraper():

    def __init__(self):
        self.base_url = "https://www.scoresandodds.com/props"
        self.api_base_url = "https://rga51lus77.execute-api.us-east-1.amazonaws.com/prod/market-comparison"

    def get_player_list(self, EVENT: str, market:str):
        """_summary_

        Args:
            EVENT (str): Sports league. nba, nhl, etc.
            market (str): statistic of interest. Points, steals etc.

        Returns:
            player_list JSON: player_object
        """
        player_list = {}

        # prep market string:
        market = market.replace(' ','%20')

        # prep event string
        EVENT = EVENT.lower()

        url = f"{self.base_url}/{EVENT}/{market}"

        response = requests.get(url)

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

            return player_list
        
        else:
            return None
    
    def get_player_odds(self, player_object):
        EVENT = player_object["EVENT"]
        market = player_object["market"]
        eventID = player_object["eventID"]
        player_name = player_object["player_name"]
        
        # et-comparison?event={EVENT}%2F{eventID}&market={MARKETS['points']}&filter={player_name}"

        api_url = f"{self.api_base_url}"

        team_object = {}
        sportbook_objects = []


