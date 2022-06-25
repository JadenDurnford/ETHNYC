import pandas as pd

df = pd.read_json('app/predictuser.json')
pd.set_option('display.max_columns', None)
print(df.head())