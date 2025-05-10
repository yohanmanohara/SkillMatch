from flask import Flask
from .extensions import MongoDB
from .routes.health import HealthRoutes

class FlaskMongoApp:
    def __init__(self, config=None):
        self.app = Flask(__name__)
        self.config = config or {}
        self.app.config.from_object(config)
        
        # Initialize extensions
        self.mongo = MongoDB()
        
        # Initialize routes
        self.health_routes = HealthRoutes(self.mongo)
        
        self._initialize_extensions()
        self._register_routes()

    def _initialize_extensions(self):
        """Initialize all extensions with the Flask app"""
        self.mongo.init_app(self.app)

    def _register_routes(self):
        """Register all application routes"""
        self.app.add_url_rule(
            '/', 
            view_func=self.health_routes.health_check
        )

    def run(self):
        """Run the Flask application"""
        self.app.run(
            host='0.0.0.0',
            port=self.app.config['PORT']
        )