from flask import Flask, jsonify, request
import logging
import sys
import os
import json 
from datetime import datetime, timedelta
import threading 
from flask_cors import CORS

import time
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.insert(0, project_root)

from src.backend.datastore.database_handler import DatabaseHandler
from src.backend.web_scraper.web_scraper import WebScraper

webscraper = WebScraper()
database_handler = DatabaseHandler()
app = Flask(__name__)
CORS(app)

# Endpoint to get a list of players in a league
@app.route('/players/<string:sports_league>', methods=['GET'])
def get_players(sports_league):
    """

    Args:
        sports_league (_type_): _description_

    Returns:
        dict{{str, list[dict]}, error_message:int}: 
    """
    update_database()

    try:
        response = database_handler.read_players(sports_league)
        return {"response_object": response}, 200
    except Exception as e:
        return {"Error Message": "{e}"}, 501
    #database_handler.read_players()
    #return {"Error" : "Not Implemented"}, 501

# Endpoint to get team info based on a player ID
@app.route('/team_info/<int:player_id>', methods=['GET'])
def get_team_info(player_id):
    """ Get the team info of a certain player

    Args:
        player_id (int): Player Primary Key

    Returns:
        dict: response object and status code
    """
    logging.info("team info accessed")
    update_database()

    try:
        response = database_handler.read_team(player_id)
        return {"response_object": response}, 200
    except Exception as e:
        return {"Error Message": "{e}"}, 501

@app.route('/markets/<string:sports_league>', methods=['GET'])
def get_markets(sports_league):
    """
    Endpoint to get a list of markets for a league

    Args:
        sports_league (string): nhl, nba, or nfl

    Returns:
        dict: response object
    """
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webscraper_metadata.json")
    with open(file_path) as file:
        data = json.load(file)

    # Extract all keys into a list
    keys_list = list(data[0].keys())

    if sports_league not in keys_list:
        return {"error_msg" : f"no sports league {sports_league} :("}, 404
    
    markets = data[0][sports_league]

    return {"markets": markets}, 200

# 
@app.route('/sports_leagues', methods=['GET'])
def get_sports_leagues():
    """Endpoint to get a list of sports leagues

    Returns:
        dict: response object with list of currently available sport leagues
    """
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webscraper_metadata.json")
    with open(file_path) as file:
        data = json.load(file)

    # Extract all keys into a list
    keys_list = list(data[0].keys())


    return {"leagues" : keys_list} , 200


@app.route('/player_betting_data/<int:player_id>', methods=['GET'])
def get_player_betting_data(player_id):
    """Endpoint to get sports betting data for a given player

    Args:
        player_id (int): Player Primary Key

    Returns:
        dict: response object containing a list of sports betting data
          for all markets from all sports betting websites 
    """
    logging.info("team info accessed")
    update_database()

    try:
        response = database_handler.read_sportbook_analysis(player_id)
        return {"response_object": response}, 200
    except Exception as e:
        return {"Error Message": "{e}"}, 501
   

@app.route('/update/<player_name>/<int:eventID>/<string:market>/<string:event>', methods=['GET'])
def update_player(player_name, eventID, market, event):
    """ Endpoint to get sports betting data for a given player

    Args:
        player_name (string): Player Name ex: Nikita%20Kucherov or Nikita Kucherov
        eventID (int): Primary Event ID Key, ex: 20855
        market (string): betting market, ex: points
        event (string): Sports league, ex: nhl

    Returns:
        dict: status code 200 for success, 501 otherwise
    """
    try:
        player_object = {
            'player_name' : player_name.replace(' ', '%20'),
            'eventID' : eventID,
            'EVENT' : event,
            "market" : market
        }
        print(player_object)
        process_player(player_object) 
        return {"response_object": "done"}, 200
    except Exception as e:
        return {"Error Message": f"{e}"}, 501
    


def update_database():
    """
    Clear the stale database and get new info inserted
    """
    if database_ttl():
        database_handler.reset_database()
        logging.info("Updating Database with latest data")
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webscraper_metadata.json")
        with open(file_path) as file:
            data = json.load(file)

            for league, markets in data[0].items():
                threads = []
                for market in markets:
                    player_list = webscraper.get_player_list(league, market)

                    if player_list is not None:
                        for player in player_list:
                            thread = threading.Thread(target=process_player, args=(player,))
                            threads.append(thread)
                            thread.start()  

                                # Wait for all threads to finish
                
                for i, thread in enumerate(threads):
                    logging.info(f"Waiting for {i}/{len(threads)} to finish inserting")
                    thread.join()


        logging.info("Updating table")
        update_last_update()
    


def process_player(player):
    """ Helper function for update database

    Args:
        player (dict):
        
        structure:
           player_object = {
            'player_name':string : player_name.replace(' ', '%20'),
            'eventID':int : eventID,
            'EVENT':string : event,
            "market":string : market
        }
    """
    player_object, team_object, sportsbook_objects, event_object = webscraper.get_player_odds(player)
    time.sleep(0.1)
    database_handler.insert_scrapering_data(player_object, event_object, team_object, sportsbook_objects)

def update_last_update():
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webscraper_metadata.json")

    with open(file_path, 'r') as file:
        data = json.load(file)

    # Assuming "last update" is the key in the second element of the list
    data[1]["last_update"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

    logging.info("updated log")

def database_ttl():
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webscraper_metadata.json")
    
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    # Assuming "last update" is the key in the second element of the list
    last_update = data[1]["last_update"]
    
    # Convert the last update string to a datetime object
    last_update_datetime = datetime.strptime(last_update, "%Y-%m-%d %H:%M:%S")

    # Calculate the time difference
    time_difference = datetime.now() - last_update_datetime
    
    # Check if the time difference is more than an hour
    if time_difference > timedelta(hours=6):
        return True
    else:
        return False

if __name__ == '__main__':
    # Set up logging
    #update_last_update()
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    app.run(debug=True)
