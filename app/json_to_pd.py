import pandas as pd

df = pd.read_json('user.json')
pd.set_option('display.max_columns', None)
# print(df.head())
# df.dropna(inplace=True)

def calculate_whale_buy_sentiment():
    # For the front-end, show this data table to users so they can also track whales?.
    whales_bought = {}
    for index, row in df.iterrows():
        if row['collection'] not in whales_bought:
            if isinstance(row['collection'], str):
                whales_bought[row['collection']] = []
            else:
                continue
        if row['toAddress'] not in whales_bought[row['collection']]:
            if isinstance(row['toAddress'], str):
                whales_bought[row['collection']].append(row['toAddress'])
            else:
                continue
    
    print(whales_bought)
    for i in range(len(whales_bought)):
        whales_bought[list(whales_bought)[i]] = len(whales_bought[list(whales_bought)[i]])

    return whales_bought # the length of the list for your specific nft collection is the sentiment

def calculate_whale_sell_sentiment():
    whales_sold = {}
    for index, row in df.iterrows():
        if row['collection'] not in whales_sold:
            if isinstance(row['collection'], str):
                whales_sold[row['collection']] = []
            else:
                continue
        if row['fromAddress'] not in whales_sold[row['collection']]:
            if isinstance(row['collection'], str):
                whales_sold[row['collection']].append(row['fromAddress'])
            else:
                continue
    print(whales_sold)
    for i in range(len(whales_sold)):
        whales_sold[list(whales_sold)[i]] = len(whales_sold[list(whales_sold)[i]])
    
    return whales_sold #get .len() of the whales_sold[collection id] to get how many nfts in this collection were sold by whales (sentiment)

calculate_whale_buy_sentiment()
calculate_whale_sell_sentiment()