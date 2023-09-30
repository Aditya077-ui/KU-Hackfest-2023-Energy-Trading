import flask 
import pickle
import joblib
import random
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
# from flask_cors import CORS, cross_origin
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
plt.switch_backend('agg')

app = flask.Flask(__name__)

def predict_next_five_days():
    df = pd.read_csv('PJME_hourly.csv')
    random_no = random.randint(0, 145354)
    tf_model = joblib.load('model.pkl')
    scaler_model = pickle.load(open('minmax_scaler.pkl', 'rb'))
    data_for_prediction = [df["PJME_MW"][random_no], df["PJME_MW"][random_no + 1], df["PJME_MW"][random_no + 2], df["PJME_MW"][random_no + 3], df["PJME_MW"][random_no + 4]]
    data_for_prediction = scaler_model.transform(np.array(data_for_prediction).reshape(-1, 1))
    data_for_prediction = [[[data_for_prediction[0][0]], [data_for_prediction[1][0]], [data_for_prediction[2][0]], [data_for_prediction[3][0]], [data_for_prediction[4][0]]],]
    preds = []
    for i in range(1, 6):
        preds.append(tf_model.predict(data_for_prediction))
        data_for_prediction = [df["PJME_MW"][random_no+i], df["PJME_MW"][random_no + 1 + i], df["PJME_MW"][random_no + 2 + i], df["PJME_MW"][random_no + 3 + i], df["PJME_MW"][random_no + 4 + i]]
        data_for_prediction = scaler_model.transform(np.array(data_for_prediction).reshape(-1, 1))
        data_for_prediction = [[[data_for_prediction[0][0]], [data_for_prediction[1][0]], [data_for_prediction[2][0]], [data_for_prediction[3][0]], [data_for_prediction[4][0]]],]
    scaled_back_preds = []
    for pred in preds:
        scaled_back_preds.append(scaler_model.inverse_transform(np.array([pred]).reshape(-1, 1)))
    return scaled_back_preds        

@app.route("/", methods=["GET"])
def say_hi():
    return "<h1>Hi...</h1>"

    
@app.route("/predict/5days", methods=["GET"])
def next_5_days():
    preds = predict_next_five_days()
    preds_by_two = [pred[0][0] / 2 for pred in preds]
    res = {
        "preds": preds_by_two
    }
    return flask.Response(flask.json.dumps(res),
                        status=200,
                       )
    
@app.route("/graph/energy/usage/last10days", methods=["GET"])
def generate_graph_for_last_month():
    df = pd.read_csv('PJME_hourly.csv')
    df = df.iloc[144384: 144623]
    # df["Datetime"] = df["Datetime"].apply(lambda x: (x.split())[0])
    # df["Datetime"] = df["Datetime"].apply(lambda x: (x.split("-"))[2])
    ax = sns.lineplot(data=df, x="Datetime", y="PJME_MW")
    ax.set_xticklabels([], rotation=30,
                           ha='right', fontsize=7)
    plt.title("Energy usage in the last 15 days")
    plt.xlabel("Date")
    plt.ylabel("Power in Watts")
    plt.tight_layout()
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    b64string = base64.b64encode(bytes_image.read())
    res = {
        "graph": b64string.decode('utf8')
    }
    response = flask.Response(flask.json.dumps(res),
                        status=200,
                        mimetype='application/json'
                        )
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response
    
@app.route("/graph/energy/usage/lastyear", methods=["GET"])
def generate_graph_for_last_year():
    df = pd.read_csv('PJME_hourly.csv')
    df["Datetime"] = df["Datetime"].apply(lambda x: x.split()[0])
    df["Year"] = df["Datetime"].apply(lambda x: x.split("-")[0])
    df["Month"] = df["Datetime"].apply(lambda x: x.split("-")[1])
    df["Day"] = df["Datetime"].apply(lambda x: x.split("-")[2])
    df = df[df["Year"] == "2011" ]
    monthy_total_power = [sum(df[df["Month"] == "01" ]["PJME_MW"]) / 100, 
            sum(df[df["Month"] == "02" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "03" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "04" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "05" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "06" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "07" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "08" ]["PJME_MW"])/ 100, 
            sum(df[df["Month"] == "09" ]["PJME_MW"])/ 100,
            sum(df[df["Month"] == "10" ]["PJME_MW"])/ 100,
            sum(df[df["Month"] == "11" ]["PJME_MW"])/ 100,
            sum(df[df["Month"] == "12" ]["PJME_MW"])/ 100]
    
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        
    ax = sns.barplot(x=months, y=monthy_total_power)
    plt.title("Energy usage each month last year")
    plt.xlabel("Month")
    plt.ylabel("Power in kW")
    plt.tight_layout()
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    b64string = base64.b64encode(bytes_image.read())
    res = {
        "graph": b64string.decode('utf8')
    }
    return flask.Response(flask.json.dumps(res),
                        status=200,
                        mimetype='application/json'
                        )

if __name__ == "__main__":
    app.run(debug=True)
