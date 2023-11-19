import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
# Define the URL
url = "https://www.scoresandodds.com/nba/props/points"
# https://rga51lus77.execute-api.us-east-1.amazonaws.com/prod/market-comparison?event=nba%2F19640&market=points&filter=Damian%20Lillard&t=1698595309.853

# Send an HTTP GET request to the URL
# I need a EVENT:
# I need a MARKET:
# I need and EVENT NUMBER
# I Need a FIRST_NAME
# I NEED A LAST_NAME

#https://rga51lus77.execute-api.us-east-1.amazonaws.com/prod/market-comparison?event={EVENT}%2F{EVENT_NUMBER}&market={MARKET}&filter={FIRST_NAME}%20{LAST_NAME}

EVENT = 'nba'
MARKETS = {
    'points': 'points',
    'rebounds': 'rebounds',
    'assists': 'assists',
    'blocks':'blocks',
    'steals': 'steals',
    '3-pointers': '',
    'points&rebounds': '',
    'points&assists': '',
    'points&rebounds&assists': ''
}

json_responses = []
response = requests.get(url)

if response.status_code == 200:
    # Parse the HTML content of the page
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
     
        print(f"EVENT: {EVENT}, Market: {MARKETS['points']}, Event_NUMBER: {eventID}, player_name:{player_name}")

        new_url = f"https://rga51lus77.execute-api.us-east-1.amazonaws.com/prod/market-comparison?event={EVENT}%2F{eventID}&market={MARKETS['points']}&filter={player_name}"
        player_response = requests.get(new_url)

        if player_response.status_code == 200:
            player_json = player_response.json()

            player_data = {
            'event': player_json['event'],
            'markets': player_json['markets']
                }
            json_responses.append(player_data)

            

    with open('player_responses.json', 'w') as json_file:
        json.dump(json_responses, json_file)

    #results = results.find_all("li", class_="border")

    #for element in results:
    #    print(element.prettify())
    # Find the table with the data (you may need to inspect the website's HTML structure)
    #print(results.prettify())


  

else:
    print(f"Failed to retrieve data from {url}. Status code: {response.status_code}")