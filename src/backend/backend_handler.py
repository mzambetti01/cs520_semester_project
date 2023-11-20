from flask import Flask, jsonify, request
import logging
import sys
import os
import json 
from datetime import datetime, timedelta
import threading 

import time
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.insert(0, project_root)

from src.backend.datastore.database_handler import DatabaseHandler
from src.backend.web_scraper.web_scraper import WebScraper

webscraper = WebScraper()
database_handler = DatabaseHandler()
app = Flask(__name__)

# Endpoint to get a list of players in a league
@app.route('/players/<string:sports_league>', methods=['GET'])
def get_players(sports_league):
    update_database()
    #database_handler.read_players()
    return {"Error" : "Not Implemented"}, 501

# Endpoint to get team info based on a player ID
@app.route('/team_info/<int:player_id>', methods=['GET'])
def get_team_info(player_id):
  logging.info("team info accessed")
  return {"Error" : "Not Implemented"}, 501

# Endpoint to get a list of markets for a league
@app.route('/markets/<string:sports_league>', methods=['GET'])
def get_markets(sports_league):

    with open('webscraper_metadata.json') as file:
        data = json.load(file)

    # Extract all keys into a list
    keys_list = list(data[0].keys())

    if sports_league not in keys_list:
        return {"error_msg" : f"no sports league {sports_league} :("}, 404
    
    markets = data[0][sports_league]

    return {"markets": markets}, 200

# Endpoint to get a list of sports leagues
@app.route('/sports_leagues', methods=['GET'])
def get_sports_leagues():
    
    with open('webscraper_metadata.json') as file:
        data = json.load(file)

    # Extract all keys into a list
    keys_list = list(data[0].keys())


    return {"leagues" : keys_list} , 200

# Endpoint to get sports betting data for a given player
@app.route('/player_betting_data/<int:player_id>', methods=['GET'])
def get_player_betting_data(player_id):
    #logging.info("5")
    return {"Error" : "Not Implemented"}, 501

def update_database():
    if database_ttl():
        database_handler.reset_database()
        logging.info("Updating Database with latest data")
        with open('webscraper_metadata.json') as file:
            data = json.load(file)

            for league, markets in data[0].items():
                threads = []
                for market in markets:
                    player_list = webscraper.get_player_list(league, market)

                    
                    for player in player_list:
                        thread = threading.Thread(target=process_player, args=(player,))
                        threads.append(thread)
                        thread.start()

                                # Wait for all threads to finish
                for thread in threads:
                    thread.join()


                        #player_object, team_object, sportsbook_objects, event_object = webscraper.get_player_odds(player)
                        #time.sleep(.1)
                        #database_handler.insert_scrapering_data(player_object, event_object, team_object, sportsbook_objects)
        update_last_update()

def process_player(player):
    player_object, team_object, sportsbook_objects, event_object = webscraper.get_player_odds(player)
    time.sleep(0.1)
    database_handler.insert_scrapering_data(player_object, event_object, team_object, sportsbook_objects)

def update_last_update():
    file_path = "webscraper_metadata.json"

    with open(file_path, 'r') as file:
        data = json.load(file)

    # Assuming "last update" is the key in the second element of the list
    data[1]["last_update"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)


def database_ttl():
    file_path = "webscraper_metadata.json"
    
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    # Assuming "last update" is the key in the second element of the list
    last_update = data[1]["last_update"]
    
    # Convert the last update string to a datetime object
    last_update_datetime = datetime.strptime(last_update, "%Y-%m-%d %H:%M:%S")

    # Calculate the time difference
    time_difference = datetime.now() - last_update_datetime
    
    # Check if the time difference is more than an hour
    if time_difference > timedelta(hours=1):
        return True
    else:
        return False

if __name__ == '__main__':
    # Set up logging
    #update_last_update()
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    app.run(debug=True)
