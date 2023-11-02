# Going to be a dictionary where each entry has a lower and higher bet line stored
class BetTable:

    class LineStruct:
        def __init__(self):
            self.lines = []

        def check_new_bet(self, bet):
            pass

    def __init__(self):
        self.dict = {}

    def get_event_lower_line(self, event):
        pass

    def get_event_upper_line(self, event):
        pass

    def add_event_entry(self, event, bet):
        # For now we just want to keep an array of all the lines for this particular bet
        if (not event in self.dict):
            self.dict[event] = self.LineStruct()
            self.dict[event].lines.append(bet)
        else:
            self.dict[event].lines.append(bet)

    def to_string(self):
        return_string = ''
        for key in self.dict:
            print("EVENT:", key)
            for bet in self.dict[key].lines:
                print(bet.to_string())
            
