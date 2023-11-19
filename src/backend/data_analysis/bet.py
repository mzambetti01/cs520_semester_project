# Datastructure to store the information on a bet
class Bet:
    # Initializing information about the bet
    def __init__(self, sportsbook_object):

        # Basic information about the bed
        self.SportsBookName = sportsbook_object["SportsBookName"]
        self.SportsBookID = sportsbook_object["SportsBookID"]
        self.Event = sportsbook_object["EventID"]
        self.Value = sportsbook_object["Value"]
        self.OverOdds = sportsbook_object["Over"]
        self.UnderOdds = sportsbook_object["Under"]
        self.PlayerID = sportsbook_object["PlayerID"]

        # TODO: Calculate Expected Probability
        self.ExpectedValue = 0

        # Calculating Implied Probabbility
        self.OverImpliedProb = Bet.calculate_implied_probability(self.OverOdds)
        self.UnderImpliedProb = Bet.calculate_implied_probability(self.UnderOdds)
        self.TotalImpliedProb = Bet.calculate_total_probability(self.OverImpliedProb, self.UnderImpliedProb)

        # Calculating Overage and Vig
        self.Overage = Bet.calculate_overage(self.TotalImpliedProb)
        self.Vigorish = Bet.calculate_vigorish(self.Overage, self.TotalImpliedProb)

        # Calculating True Probabilty
        self.OverAdjustedProb = Bet.calculate_adjusted_probability(self.OverImpliedProb, self.UnderImpliedProb)
        self.UnderAdjustedProb = Bet.calculate_adjusted_probability(self.UnderImpliedProb, self.OverImpliedProb)
        self.OverAdjustedOdds = Bet.calculate_adjusted_odds(self.OverOdds, self.OverAdjustedProb)
        self.UnderAdjustedOdds = Bet.calculate_adjusted_odds(self.UnderOdds, self.UnderAdjustedProb)
        # Making sure our adjusted odds are in valid ranges
        self.check_adj_odds()

        #self.ev1 = self.calculate_ev(self.odds1, self.adj_odds1, self.UnderAdjustedProb)
        #self.ev2 = self.calculate_ev(self.odds2, self.adj_odds2, self.adj_prob2)
        

    def get_bet_object(self):
        """Create a return object for the database
        
        Returns:
            dict: object to insert into database
        """
        bet_object = {
            "SportsBookID": self.SportsBookID,
            "SportsBookName": self.SportsBookName,
            "EventID": self.Event,
            "PlayerID": self.PlayerID,
            "ExpectedValue": self.ExpectedValue,
            "OverImpliedProb": self.OverImpliedProb,
            "UnderImpliedProb": self.UnderImpliedProb,
            "TotalImpliedProb": self.TotalImpliedProb,
            "Overage": self.Overage,
            "Vigorish": self.Vigorish,
            "OverAdjustedProb": self.OverAdjustedProb,
            "UnderAdjustedProb": self.UnderAdjustedProb,
            "OverAdjustedOdds": self.OverAdjustedOdds,
            "UnderAdjustedOdds": self.UnderAdjustedOdds
        }
        
        return bet_object
    # Function to adjust odds if the numbers are in certain ranges
    def check_adj_odds(self):
        # Odds cant be between -100 and 100

        if (self.OverAdjustedOdds > -100 and self.OverAdjustedOdds < 100):
            remainder = -100 + self.OverAdjustedOdds
            self.OverAdjustedOdds = 100 - remainder

        if (self.UnderAdjustedOdds > -100 and self.UnderAdjustedOdds < 100):
            remainder = -100 + self.UnderAdjustedOdds
            self.UnderAdjustedOdds = 100 - remainder

        if (self.OverAdjustedOdds > 0 and self.UnderAdjustedOdds > 0):
            if (self.OverAdjustedProb > self.UnderAdjustedProb):
                self.OverAdjustedOdds *= -1
            else:
                self.UnderAdjustedOdds *= -1


    # Function to find implied probability from the odds
    def calculate_implied_probability(american_odds):
        # If odds are positive
        # implied probability = 100 / (odds + 100)
        if (american_odds > 0):
            return (100 / (american_odds + 100))
        # If odds are negative
        # implied probability = odds / (odds + 100)
        else:
            american_odds *= -1
            return (american_odds / (american_odds + 100))
    
    # Function to calcuate total probability
    def calculate_total_probability(odds1, odds2):
        return (odds1+odds2)
    
    # Function to calculate overage
    def calculate_overage(total_prob):
        return (total_prob-1)

    # Function to calculate vigorish
    def calculate_vigorish(overage, total_prob):
        return (overage/total_prob)
    
    # Function to calculate adjusted probability
    def calculate_adjusted_probability(prob1, prob2):
        return (prob1 / (prob1 + prob2))
    
    # Function to calculate adjusted odds
    def calculate_adjusted_odds(american_odds, prob):
        if (american_odds > 0):
            return ((100*(1-prob))/prob)
        else:
            return (-1*(prob*100)/(prob-1))
        
    # Function to calculate expected value using vig and 0-vig odds
    def calculate_ev(vig_odds, zero_vig_odds, win_percent):
        return ((vig_odds-zero_vig_odds)*win_percent)
  
    # To string Function
    def to_string(self):
        return_string = '\n'
        return_string += self.name+ ' @ ' +self.book +'\n\n'
        return_string += "Sides:\t\t"+self.side1+'\t\t'+self.side2+'\n'

        if (self.odds1 > 0):
            odds_str1 = '+' + str(self.odds1)
        else:
            odds_str1 = str(self.odds1)

        if (self.odds2 > 0):
            odds_str2 = '+' + str(self.odds2)
        else:
            odds_str2 = str(self.odds2)

        return_string += "Odds:\t\t"+ odds_str1 +'\t\t'+ odds_str2 +'\n'

        return_string += "Imp. Prob.:\t"+ str(round(self.imp_prob1*100, 2)) +'%\t\t'+ str(round(self.imp_prob2*100,2)) +'%\n'

        self.adj_odds1 = round(self.adj_odds1, 0)
        if (self.adj_odds1 > 0):
            odds_str1 = '+' + str(self.adj_odds1)
        else:
            odds_str1 = str(self.adj_odds1)

        self.adj_odds2 = round(self.adj_odds2, 0)
        if (self.adj_odds2 > 0):
            odds_str2 = '+' + str(self.adj_odds2)
        else:
            odds_str2 = str(self.adj_odds2)

        return_string += "Adj. Odds:\t"+ odds_str1 +'\t\t'+ odds_str2 +'\n'

        return_string += "Adj. Pro.:\t"+ str(round(self.adj_prob1*100, 2)) +'%\t\t'+ str(round(self.adj_prob2*100,2)) +'%\n'

        #return_string += "EVs:\t\t"+str(round(self.ev1, 2))+'%\t\t'+str(round(self.ev2, 2))+'%\n'
        return return_string