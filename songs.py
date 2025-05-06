import pandas as pd

df = pd.read_csv('songs-label/278k_labelled_uri.csv')
print(df['labels'].unique())
