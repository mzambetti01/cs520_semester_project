import pandas as pd
from bet_table import *
from bet import *

dataframe = pd.read_excel("data.xlsx", engine='openpyxl')
strikeouts_table = BetTable()

for ind in dataframe.index:
    temp_event = dataframe["Event"][ind]
    # name, book, side1, side2, odds1, odds2
    temp_bet = Bet(temp_event, dataframe["Book"][ind], \
                    dataframe["Side 1"][ind], dataframe["Side 2"][ind], \
                    dataframe["Odds 1"][ind], dataframe["Odds 2"][ind])
    strikeouts_table.add_event_entry(temp_event, temp_bet)

print(strikeouts_table.to_string())