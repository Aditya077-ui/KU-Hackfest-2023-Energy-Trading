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
    
@app.route("/graph/energy/usage/last15days", methods=["GET"])
def generate_graph_for_last_month():
    df = pd.read_csv('PJME_hourly.csv')
    df = df.iloc[144264: 144622]
    ax = sns.lineplot(data=df, x="Datetime", y="PJME_MW")
    plt.title("Energy usage in the last 15 days")
    plt.xlabel("Date")
    plt.ylabel("Power in Watts")
    plt.tight_layout()
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    b64string = base64.b64encode(bytes_image.read())
    res = {
        "preds": b64string.decode('utf8')
    }
    return flask.Response(flask.json.dumps(res),
                        status=200,
                        mimetype='application/json'
                        )

if __name__ == "__main__":
    app.run(debug=True)
