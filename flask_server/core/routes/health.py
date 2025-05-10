from flask import jsonify

class HealthRoutes:
    def __init__(self, mongo):
        self.mongo = mongo

    def health_check(self):
        return jsonify({
            "status": "running",
            "mongo_connected": self.mongo.client is not None
        })