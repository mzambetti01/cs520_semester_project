import requests
from bs4 import BeautifulSoup
import pandas as pd

# Define the URL
url = "https://www.scoresandodds.com/nba/props/points"
# https://rga51lus77.execute-api.us-east-1.amazonaws.com/prod/market-comparison?event=nba%2F19640&market=points&filter=Damian%20Lillard&t=1698595309.853

# Send an HTTP GET request to the URL
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

        moneyline = []
        odds_tag = block.find_all("span", class_="data-moneyline")

        for odds in odds_tag:
            moneyline.append(odds.text)

        odds_tag = block.find_all("small", class_="data-odds")

        odds_list = []
        for odds in odds_tag:
            odds_list.append(odds.text)
        print(f"Player: {player_name}, Moneyline = {moneyline}, Odds = {odds_list}, Event: {eventID}")

    #results = results.find_all("li", class_="border")

    #for element in results:
    #    print(element.prettify())
    # Find the table with the data (you may need to inspect the website's HTML structure)
    #print(results.prettify())


  

else:
    print(f"Failed to retrieve data from {url}. Status code: {response.status_code}")