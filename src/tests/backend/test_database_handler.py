
import json
import sys
import os
import logging
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
sys.path.insert(0, project_root)
from src.backend.datastore.database_handler import DatabaseHandler

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
    
# Setup
current_file_path = os.path.dirname(os.path.relpath(__file__))
with open(os.path.join(current_file_path, 'test_objects/sportsbook_object.json'), 'r') as json_file:
    sportsbook_list = json.load(json_file)


with open(os.path.join(current_file_path,'test_objects/player_object.json'), 'r') as json_file:
    player_object = json.load(json_file)


with open(os.path.join(current_file_path,'test_objects/event_object.json'), 'r') as json_file:
    event_object = json.load(json_file)

with open(os.path.join(current_file_path,"test_objects/team_object.json"), 'r') as json_file:
    team_object = json.load(json_file)


#with open(os.path.join(current_file_path, 'test_objects\team_object.json'), 'r') as json_file:
#    team_object = json.load(json_file)

def test_valid_insertion():
    eventid = event_object["eventid"]
    team_id = team_object["TeamID"]
    db_handler = DatabaseHandler()
    print(db_handler.nuke_database())
    assert(db_handler.insert_scrapering_data(player_object, event_object, team_object, sportsbook_list))

    val_1 = db_handler.read_events()
    val_2 = db_handler.read_players()
    val_3 = db_handler.read_team(team_id)
    val_4 = db_handler.read_sportsbooks(eventid)
    assert(all(val_1, val_2, val_3, val_4))

    