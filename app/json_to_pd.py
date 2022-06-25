import pandas as pd

df = pd.read_json('user.json')
pd.set_option('display.max_columns', None)
# print(df.head())


def calculate_whale_buy_sentiment():
    # For the front-end, show this data table to users so they can also track whales?.
    whales_bought = {}

    for index, row in df.iterrows():
        if row['collection'] not in whales_bought:
            whales_bought[row['collection']] = []
        if row['toAddress'] not in whales_bought[row['collection']]:
            whales_bought[row['collection']].append(row['toAddress'])

    return whales_bought # the length of the list for your specific nft collection is the sentiment

def calculate_whale_sell_sentiment():
    whales_sold = {}

    for index, row in df.iterrows():
        if row['collection'] not in whales_sold:
            whales_sold[row['collection']] = []
        if row['fromAddress'] not in whales_sold[row['collection']]:
            whales_sold[row['collection']].append(row['fromAddress'])

    return whales_sold #get .len() of the whales_sold[collection id] to get how many nfts in this collection were sold by whales (sentiment)









