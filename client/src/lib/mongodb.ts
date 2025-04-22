import { MongoClient, Db } from 'mongodb';

// Type for cached connection
interface MongoConnection {
  client: MongoClient;
  db: Db;
}

// Cache the connection
let cachedConnection: MongoConnection | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_NAME || 'yourDatabaseName');
    
    cachedConnection = { client, db };
    return cachedConnection;
  } catch (error) {
    await client.close();
    throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function saveEmail(email: string) {
  let connection: MongoConnection | null = null;
  
  try {
    // Validate email first
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address');
    }

    connection = await connectToDatabase();
    const result = await connection.db.collection('subscribers').insertOne({ 
      email, 
      createdAt: new Date(),
      verified: false
    });

    return {
      success: true,
      insertedId: result.insertedId
    };
  } catch (error) {
    console.error('Database operation failed:', error);
    throw new Error(`Failed to save email: ${error instanceof Error ? error.message : String(error)}`);
  }
  // Note: We don't close the connection here to allow connection reuse
}

// Optional: Utility function to close the connection when needed
export async function closeConnection() {
  if (cachedConnection) {
    await cachedConnection.client.close();
    cachedConnection = null;
  }
}