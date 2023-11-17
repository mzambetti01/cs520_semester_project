from bet import Bet

# Normal bet is one defined as one positive and one negative side
def testNormalBet():
    bet = Bet("Barstool", "Matt Zambetti Saves", 3.5, -125, 115)

    # Want to verify: implied probs, vig, adjusted prob/odds, ev

    # Checking implied probs
    # Side 1: 55.56%, Side 2: 46.51%
    implied_probs = ((round(bet.imp_prob1, 4)==.5556) and (round(bet.imp_prob2, 4)==.4651))
    print("Implied odds are correct:", implied_probs)

    # Checking Overage/Vigorish
    # Overage (most places call this vig): 2.07%
    overage = (round(bet.overage, 4)==0.0207)
    print("Overage is correct:", overage)
    # Vigorish: 2.03%
    vigorish = (round(bet.vigorish, 4) == 0.0203)
    print("Vigorish is correct:", vigorish)

    # Checking Adjusted Probs
    # Side 1: 54.43, Side 2: 45.57
    adjusted_probs = ((round(bet.adj_prob1, 4)==.5443) and (round(bet.adj_prob2, 4)==.4557))
    print("Adjusted Probability is correct:", adjusted_probs)

    # Checking Adjusted Odds
    # Side 1: -120, Side 2: 120
    adjusted_odds = ((round(bet.adj_odds1, 1)==-119.4) and (round(bet.adj_odds2, 1)==119.4))
    print("Adjusted Odds are correct:", adjusted_odds)

if __name__ == "__main__":
    testNormalBet()