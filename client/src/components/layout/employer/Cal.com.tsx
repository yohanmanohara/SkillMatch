"user server "
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaMousePointer } from 'react-icons/fa';

import { toast } from '@/components/ui/use-toast';

interface CalSetupFormProps {
  userId: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  setShowCalSetup: (show: boolean) => void;
  setIsCalEmbedOpen: (open: boolean) => void;
}

const CalSetupForm = ({ userId, setCurrentUser, setShowCalSetup, setIsCalEmbedOpen }: CalSetupFormProps) => {
  const [calUsername, setCalUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!calUsername) {
      toast({
        title: 'Error',
        description: 'Please enter your Cal.com username',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
   
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updatecal?userId=${userId}`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calUsername })
      });

      const data = await response.json();
    

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update Cal.com settings');
      }

      setCurrentUser((prev: any) => prev ? { ...prev, calUsername } : null);
      toast({
        title: 'Success',
        description: 'Cal.com account connected successfully!',
        variant: 'default',
      });

      setShowCalSetup(false);

      const processingCandidate = false; // Replace with actual logic if needed
      if (processingCandidate) {
        setIsCalEmbedOpen(true);
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to connect Cal.com account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Connect Your Cal.com Account</h2>
        <p className="text-sm text-muted-foreground">
          To schedule interviews, please enter your Cal.com username
        </p>

        <p>Please log in to Cal.com and enter your username:</p>
      <a
        href="https://app.cal.com/auth/login"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-700"
      >
       
        Click here to log in to Cal.com
        <FaMousePointer style={{ marginRight: '8px' }} />
      </a>  
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            placeholder="your-cal-username"
            value={calUsername}
            onChange={(e) => setCalUsername(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
              file:border-0 file:bg-transparent file:text-sm file:font-medium 
              placeholder:text-muted-foreground focus-visible:outline-none 
              focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
              disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="text-sm text-muted-foreground">
          <p>This is your Cal.com username (e.g., &quot;john-doe&quot; in cal.com/john-doe)</p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setShowCalSetup(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Connecting...' : 'Connect'}
        </Button>
      </div>
    </div>
  );
};

export default CalSetupForm;
