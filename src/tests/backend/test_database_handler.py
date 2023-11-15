
import json
import sys
import os

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
sys.path.insert(0, project_root)

from src.backend.datastore.database_handler import DatabaseHandler
#from backend.datastore import DatabaseHandler
# from database_handler import DatabaseHandler as DB

current_file_path = os.path.dirname(os.path.relpath(__file__))
with open(os.path.join(current_file_path, 'test_objects\sportsbook_object.json'), 'r') as json_file:
    sportsbook_list = json.load(json_file)


with open(os.path.join(current_file_path,'test_objects\player_object.json'), 'r') as json_file:
    player_object = json.load(json_file)


with open(os.path.join(current_file_path,'test_objects\event_object.json'), 'r') as json_file:
    event_object = json.load(json_file)

with open(os.path.join(current_file_path,"test_objects\\team_object.json"), 'r') as json_file:
    team_object = json.load(json_file)


#with open(os.path.join(current_file_path, 'test_objects\team_object.json'), 'r') as json_file:
#    team_object = json.load(json_file)


eventid = event_object["eventid"]
team_id = team_object["TeamID"]
db_handler = DatabaseHandler()
print(db_handler.nuke_database())
db_handler.insert_event(event_object)
db_handler.insert_player(player_object)
db_handler.insert_team(team_object)

for sportsbook in sportsbook_list:
    db_handler.insert_sportsbook(sportsbook)


print(db_handler.read_events())
print(db_handler.read_players())
print(db_handler.read_team(team_id))
print(db_handler.read_sportsbooks(eventid))