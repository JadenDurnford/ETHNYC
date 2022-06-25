import pandas as pd

df = pd.read_json('user.json')
pd.set_option('display.max_columns', None)
print(df.head())

# For the front-end, show this data table to users so they can also track whales.
whales_bought = {}
whales_sold = {}

# logic:
# create a dictionary where for each collection_id as key, the values is the list of whales holding (or recently buying?) it.
# Can make use of resevair API to see if whale is still holding it if only checking for holding.

for index, row in df.iterrows():
    if row['collection'] not in whales_bought:
        whales_bought[row['collection']] = []
    if whales_bought[row['toAddress']] not in whales_bought[row['collection']]
        whales_bought[row['collection']].append(whales_bought[row['toAddress']])

for index, row in df.iterrows():
    if row['collection'] not in whales_sold:
        whales_sold[row['collection']] = []
    if whales_sold[row['fromAddress']] not in whales_sold[row['collection']]:
        whales_sold[row['collection']].append(whales_sold[row['fromAddress']])

#get .len() of the whales_sold[collection id] to get how many nfts in this collection were sold by whales.







