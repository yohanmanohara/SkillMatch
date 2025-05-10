from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

class MongoDB:
    def __init__(self, app=None):
        self.client = None
        self.db = None
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        try:
            self.client = MongoClient(
                app.config['MONGO_URI'],
                connectTimeoutMS=5000
            )
            self.db = self.client.get_default_database()
            # Test the connection
            self.client.admin.command('ping')
            print("✅ Connected to MongoDB successfully")
        except ConnectionFailure as e:
            print(f"❌ MongoDB connection failed: {str(e)}")
            raise