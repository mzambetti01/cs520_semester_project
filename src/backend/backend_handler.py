from flask import Flask, jsonify, request
import logging
import sys
import os

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.insert(0, project_root)

from src.backend.datastore.database_handler import DatabaseHandler
from src.backend.web_scraper.web_scraper import WebScraper

app = Flask(__name__)

# Endpoint to get a list of players in a league
@app.route('/players/<string:sports_league>', methods=['GET'])
def get_players(sports_league):
    logging.info("1")
    pass

# Endpoint to get team info based on a player ID
@app.route('/team_info/<int:player_id>', methods=['GET'])
def get_team_info(player_id):
  logging.info("2")
  pass

# Endpoint to get a list of markets for a league
@app.route('/markets/<string:sport_league>', methods=['GET'])
def get_markets(sports_league):
    logging.info("3")
    pass

# Endpoint to get a list of sports leagues
@app.route('/sports_leagues', methods=['GET'])
def get_sports_leagues():
    logging.info("4")
    pass

# Endpoint to get sports betting data for a given player
@app.route('/player_betting_data/<int:player_id>', methods=['GET'])
def get_player_betting_data(player_id):
    logging.info("5")
    pass


if __name__ == '__main__':
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    app.run(debug=True)
