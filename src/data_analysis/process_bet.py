from bet import Bet
import json

def convert_json_to_bet(bet_json):
    # Not sure what to make event. Could make it value?
    bet_dict = json.loads(bet_json)
    bet = Bet(bet_dict["SportsBookName"], None, bet_dict["Value"],
              bet_dict["Over"], bet_dict["Under"])
    
    # Exporting our bet as a json object
    export_bet = json.dumps(bet.__dict__)
    return export_bet


if __name__ == "__main__":
    bet_dict = {"SportsBookID":1, "SportsBookName":"Barstool",
                "Value":3.5, "Over":-125, "Under":115, 
                "EventID":1, "PlayerID":1}
    bet_json = json.dumps(bet_dict)
    print(convert_json_to_bet(bet_json))