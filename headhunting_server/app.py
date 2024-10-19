from flask import Flask, request, jsonify
from model.model import Model

app = Flask(__name__)
model = Model()

@app.route('/suggest', methods=['POST'])
def suggest():
    job_description = request.json['job_description']
    suggestions = model.get_suggestions(job_description)
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
