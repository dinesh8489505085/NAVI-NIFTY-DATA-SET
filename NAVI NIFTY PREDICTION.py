import pandas_datareader as web
import pandas as pd
import numpy as np
import yfinance as yf
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
df = yf.download('NAVINIFTY.NS' , start='2024-09-01', end='2024-10-31')
df
df= df[['Close']]
forecast =10
df['Prediction'] = df[['Close']].shift(-forecast)
x = df.drop(['Prediction'], axis=1)[:-forecast]  
x = np.array(x)
y= np.array(df['Prediction'])
y= y[:-forecast]
x_train, x_test, y_train, y_test=train_test_split(x, y, test_size= 0.2)
svr_rbf= SVR(kernel='rbf', C=1e3, gamma=0.1)
svr_rbf.fit(x_train, y_train)
svm_confidence= svr_rbf.score(x_test, y_test)
lr= LinearRegression()
lr.fit(x_train, y_train)
lr_confidence= lr.score(x_test, y_test)
x_forecast= np.array(df.drop(['Prediction'], axis=1))[-forecast:]
svm_prediction= svr_rbf.predict(x_forecast)
lr_prediction= lr.predict(x_forecast)
lr_prediction