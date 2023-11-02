# Library to allow another program to process bets and gain insight from them
from bet import Bet

def calculate_payout(amount, odds):
    if (odds > 0):
        return (amount * (odds / 100))
    else:
        return (amount / (odds / -100))


def calculate_ev(bet, amount):

    print("For side 1:",bet.side1,'@',bet.odds1)
    winnings1 = round(calculate_payout(amount, bet.odds1),2)
    print("With a wager of $100, payout is:", winnings1)
    ev1 = (bet.adj_prob1 * winnings1) - (bet.adj_prob2 * amount)
    print("Expected Value for a $100 bet:", ev1)
    print()

    print("For side 2:",bet.side2,'@',bet.odds2)
    winnings2 = round(calculate_payout(amount, bet.odds2),2)
    print("With a wager of $100, payout is:",winnings2)
    ev2 = (bet.adj_prob2 * winnings2) - (bet.adj_prob1 * amount)
    print("Expected Value for a $100 bet:", ev2)
    print()    

if __name__ == '__main__':
    bet1 = Bet("Joe Strike Outs", "o8.5", "u8.5", 107, -122)
    print(bet1.to_string())
    print("Calculating EV with a bet of $100 for each side...")
    amount = 100
    calculate_ev(bet1, amount)

    bet2 = Bet("Joe Strike Outs", "o6.5", "u7.5", 106, -135)
    print(bet1.to_string())
    print("Calculating EV with a bet of $100 for each side...")
    amount = 100
    calculate_ev(bet1, amount)

      

