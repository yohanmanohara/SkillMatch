import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || ''; // Ensure this exists in .env
const client = new MongoClient(uri);

export async function saveEmail(email: string) {
  try {
    await client.connect();
    const db = client.db('yourDatabaseName'); // Replace with actual DB name
    const collection = db.collection('subscribers');
    
    const result = await collection.insertOne({ email, createdAt: new Date() });
    return result;
  } catch (error) {
    throw new Error('Database error: ' + error);
  } finally {
    await client.close();
  }
}

export default client; // Ensure client is exported in case you need it elsewhere
