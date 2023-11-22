#from database_handler import DatabaseHandler
import logging
import os
import sys

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
sys.path.insert(0, project_root)

from src.backend.datastore.database_handler import DatabaseHandler
from src.backend.web_scraper.web_scraper import WebScraper

database_handler = DatabaseHandler()
#database_handler.delete_database()
#print(database.read_players())



logging.basicConfig(level=logging.INFO)

scraper = WebScraper()
player_list = scraper.get_player_list("nhl", "points")
player_object, team_object, sportsbook_objects, event_object = scraper.get_player_odds(player_list[0])


print(f"Player Object: {player_object}\n")
print(f"Team Object: {team_object} \n")
print(f"Sportsbook Objects: {sportsbook_objects} \n")
print(f"Event Object {event_object} \n")

database_handler.reset_database()
database_handler.insert_scrapering_data(player_object, event_object, team_object, sportsbook_objects)

#database_handler.read_players()

