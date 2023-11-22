import json
import sys
import os
import logging
import pytest

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
sys.path.insert(0, project_root)
from src.backend.datastore.database_handler import DatabaseHandler
from src.backend.data_analysis.bet import Bet
from src.backend.backend_handler import app
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Assuming you have a fixtures directory containing your test objects
TEST_OBJECTS_DIR = os.path.join(os.path.dirname(__file__), 'test_objects')

@pytest.fixture
def test_objects():
    with open(os.path.join(TEST_OBJECTS_DIR, 'sportsbook_object.json'), 'r') as json_file:
        sportsbook_list = json.load(json_file)

    with open(os.path.join(TEST_OBJECTS_DIR, 'player_object.json'), 'r') as json_file:
        player_object = json.load(json_file)

    with open(os.path.join(TEST_OBJECTS_DIR, 'event_object.json'), 'r') as json_file:
        event_object = json.load(json_file)

    with open(os.path.join(TEST_OBJECTS_DIR, 'team_object.json'), 'r') as json_file:
        team_object = json.load(json_file)

    db_handler = DatabaseHandler()
    
    assert(db_handler.insert_scrapering_data(player_object, event_object, team_object, sportsbook_list) == True)

    return True

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_players(client, test_objects):
    response = client.get('/players/nhl')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert 'response_object' in data
    print(data)
    print(response.get_data())

def test_get_team_info(client, test_objects):
    response = client.get('/team_info/20')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert 'response_object' in data

def test_get_markets(client, test_objects):
    response = client.get('/markets/nhl')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert 'markets' in data

def test_get_sports_leagues(client, test_objects):
    response = client.get('/sports_leagues')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert 'leagues' in data

def test_get_player_betting_data(client, test_objects):
    response = client.get('/player_betting_data/17181')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert 'response_object' in data

def test_update_player(client, test_objects):
    response = client.get('/update/Nikita%20Kucherov/20855/points/nhl')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert 'response_object' in data