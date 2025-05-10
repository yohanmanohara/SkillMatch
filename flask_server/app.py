
from core.application import FlaskMongoApp
from config import Config

def create_app():
    # Create and configure the app
    config = Config()
    app = FlaskMongoApp(config=config)
    return app.app
if __name__ == '__main__':
    app = create_app()
    app.run()