# Datastructure to store the information on a bet
class Bet:
    # Initializing information about the bet
    def __init__(self, name, book, side1, side2, odds1, odds2):
        self.name = name
        self.book = book
        self.side1 = side1
        self.side2 = side2
        self.odds1 = odds1
        self.odds2 = odds2
        self.imp_prob1 = self.calculate_implied_probability(odds1)
        self.imp_prob2 = self.calculate_implied_probability(odds2)
        self.total_prob = self.calculate_total_probability(odds1, odds2)
        self.overage = self.calculate_overage(self.total_prob)
        self.vigorish = self.calculate_vigorish(self.overage, self.total_prob)
        self.adj_prob1 = self.calculate_adjusted_probability(self.imp_prob1, self.imp_prob2)
        self.adj_prob2 = self.calculate_adjusted_probability(self.imp_prob2, self.imp_prob1)
        self.adj_odds1 = self.calculate_adjusted_odds(self.odds1, self.adj_prob1)
        if (self.adj_odds1 > -100 and self.adj_odds1 < 100):
            remainder = -100 + self.adj_odds1
            self.adj_odds1 = 100 - remainder
        self.adj_odds2 = self.calculate_adjusted_odds(self.odds2, self.adj_prob2)
        if (self.adj_odds2 > -100 and self.adj_odds2 < 100):
            remainder = -100 + self.adj_odds2
            self.adj_odds2 = 100 - remainder
        if (self.adj_odds1 > 0 and self.adj_odds2 > 0):
            if (self.adj_prob1 > self.adj_prob2):
                self.adj_odds1 *= -1
            else:
                self.adj_odds2 *= -1

        #self.ev1 = self.calculate_ev(self.odds1, self.adj_odds1, self.adj_prob1)
        #self.ev2 = self.calculate_ev(self.odds2, self.adj_odds2, self.adj_prob2)

    # Function to find implied probability from the odds
    def calculate_implied_probability(self, american_odds):
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
    def calculate_total_probability(self, odds1, odds2):
        return (odds1+odds2)
    
    # Function to calculate overage
    def calculate_overage(self, total_prob):
        return (total_prob-1)

    # Function to calculate vigorish
    def calculate_vigorish(self, overage, total_prob):
        return (overage/total_prob)
    
    # Function to calculate adjusted probability
    def calculate_adjusted_probability(self, prob1, prob2):
        return (prob1 / (prob1 + prob2))
    
    # Function to calculate adjusted odds
    def calculate_adjusted_odds(self, american_odds, prob):
        if (american_odds > 0):
            return ((100*(1-prob))/prob)
        else:
            return (-1*(prob*100)/(prob-1))
        
    # Function to calculate expected value using vig and 0-vig odds
    def calculate_ev(self, vig_odds, zero_vig_odds, win_percent):
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