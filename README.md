# NAVI-NIFTY-DATA-SET Repository

This repository contains two main projects:

## 1. NAVI NIFTY Prediction Project

A machine learning project for predicting NAVI NIFTY stock prices using historical data from Yahoo Finance.

### Setup Instructions

1. **Import necessary libraries** as shown in the image below:

![raw data 2](https://github.com/user-attachments/assets/f47214bd-56ac-4590-88a6-5b63b3ee28f1)

2. **Data Import**: The dataset is taken from Yahoo Finance using `import yfinance as yf`:

![navi raw data](https://github.com/user-attachments/assets/ec12fe7e-7e5e-4ef1-aff0-db71752b7583)

3. **Close Data Extraction**: To find the close data in the dataset, refer to the example below:

![raw 3](https://github.com/user-attachments/assets/e781ede1-ce5d-4215-9ced-a39ce1cfebe7)

4. **Prediction Column Creation**: Create a new column for predictions and set the data to predict to None in the tabular column:

![raw4](https://github.com/user-attachments/assets/af536ce6-acdd-49a2-a847-d72534ffe9cc)

5. **Prediction Data Array**: Create prediction data array:

![raw4](https://github.com/user-attachments/assets/86dda6-38c2-4f68-9caa-2e364548b2f3)

6. **Machine Learning Implementation**: Use sklearn library to find out the predictions of stock:

![6](https://github.com/user-attachments/assets/c7d8dc41-38f0-4c40-93bd-42aea15cd786)

### Files
- `NAVI NIFTY PREDICTION.py` - Main prediction script

---

## 2. Todo List Application

A modern, responsive todo list application built with HTML, CSS, and JavaScript for task management.

### Features
- ✅ Add, complete, and delete tasks
- ✅ Filter tasks (All, Active, Completed)
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Task counter

### How to Use
1. Open `index.html` in your web browser
2. Start adding your tasks
3. Use the filters to organize your view
4. Your tasks are automatically saved locally

### Files
- `index.html` - Main application file
- `styles.css` - Styling and animations
- `script.js` - JavaScript functionality
- `TODO_README.md` - Detailed documentation

---

## Getting Started

1. Clone this repository
2. For NAVI NIFTY prediction: Run the Python script
3. For Todo List: Open `index.html` in your browser

## Technologies Used

- **Python** - Machine learning and data analysis
- **HTML/CSS/JavaScript** - Todo list application
- **yfinance** - Stock data retrieval
- **scikit-learn** - Machine learning predictions
