export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email } = req.body;
  
      if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
      }
  
      // Simulating a successful subscription
      return res.status(200).json({ message: 'Subscribed successfully!' });
    }
  
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
  