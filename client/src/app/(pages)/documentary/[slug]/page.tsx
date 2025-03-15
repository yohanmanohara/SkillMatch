import { notFound } from "next/navigation";

// Define a union type of possible slugs
type Slug = 'getting-started' | 'account' | 'faq' | 'security' | 'community' | 'billing';

// Adjust the type definition for content to accept both string and JSX elements
const documentaryContent: Record<Slug, { title: string; content: string | JSX.Element }> = {
  'getting-started': {
    title: 'Getting Started',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">1. Creating an Account</h3>
          <p className="mt-2">
            To access the full features of our platform, you need to create an account. Follow these steps:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li> Click on the **Sign Up** button at the top-right corner of the homepage.</li>
            <li>Enter your **name, email, and a strong password**.</li>
            <li>Verify your email by clicking the link sent to your inbox.</li>
            <li>Once verified, log in and complete your profile.</li>
          </ul>
          <p className="mt-2">
            A well-filled profile increases your chances of networking and job opportunities.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">2. Setting Up Your Profile</h3>
          <p className="mt-2">
            After signing up, update your profile to make the most of the platform.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Profile Picture:mUpload a 872x872 px image.</li>
            <li>Personal Information:mAdd your location, skills, and professional summary**.</li>
            <li>Resume Upload: Ensure your resume is in **PDF format for better compatibility.</li>
          </ul>
          <p className="mt-2">
            A complete profile helps you stand out to employers and recruiters.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">3. Navigating the Dashboard</h3>
          <p className="mt-2">
            Once logged in, you will land on your **Dashboard, where you can:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Browse job listings relevant to your skills.</li>
            <li>Apply for jobs with a single click.</li>
            <li>Manage applications and track your submissions.</li>
            <li>Update your job postings (if you are an employer).</li>
          </ul>
          <p className="mt-2">
            Explore the menu to access features like account settings, notifications, and saved jobs.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">4. Searching & Applying for Jobs</h3>
          <p className="mt-2">
            Finding the right job is easy with the search feature:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Use keywords, job titles, or company names to filter results.</li>
            <li>Apply directly by clicking the "Apply Now" button on a job listing.</li>
            <li>Upload your resume and submit your application in seconds.</li>
          </ul>
          <p className="mt-2">
            Keeping your resume and profile updated increases your chances of being noticed by recruiters.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">5. Connecting with the Community</h3>
          <p className="mt-2">
            Engage with other professionals by:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Joining discussions in community forums.</li>
            <li>Engaging with employers and recruiters via messaging.</li>
            <li>Attending webinars and workshops to improve your skills.</li>
          </ul>
          <p className="mt-2">
            Building a strong professional network can open up more opportunities.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">6. Need Help?</h3>
          <p className="mt-2">
            If you encounter any issues:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Check the FAQs for quick solutions.</li>
            <li>Contact support for personalized assistance.</li>
            <li>Visit the Help Center for detailed guides.</li>
          </ul>
        </div>
      </div>
    ),
  },
  'account': {
  title: 'Account Setup',
  content: (
    <div className="space-y-6">
      <p>
        Setting up your account is the first step to getting the most out of our platform. A complete and accurate account ensures that you can fully engage with all the features, such as applying for jobs, posting listings, and connecting with the community.
      </p>
      <p>
        Follow these steps to set up your account:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li><strong>Sign Up:</strong> Click the "Sign Up" button and provide your email address, a secure password, and basic details such as your name.</li>
        <li><strong>Verify Your Email:</strong> Check your inbox for a verification email and click the provided link to confirm your registration.</li>
        <li><strong>Complete Your Profile:</strong> Add information such as your skills, professional summary, and location to make your profile more attractive to potential employers.</li>
        <li><strong>Set Up Notifications:</strong> Choose which notifications you’d like to receive, such as job updates or messages from employers and fellow users.</li>
      </ul>
      <p>
        Once your account is set up, you can start exploring the platform’s features and take full advantage of the opportunities available to you.
      </p>
      <p>
        Need help with your account setup? Don’t hesitate to check our FAQs or reach out to support if you encounter any issues.
      </p>
    </div>
  ),
},

  'faq': {
    title: 'Frequently Asked Questions',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">1. Why can't I upload my photo?</h3>
          <p className="mt-2">
            The platform requires profile images to be 872x872 pixels in size. If your image does not meet these dimensions, it may not upload successfully. Please resize your image to 872x872 pixels before attempting to upload it again.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">2. Why can't I submit my application?</h3>
          <p className="mt-2">
            If you're unable to submit your application, please check the following:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Ensure all required fields (such as name, contact details, and experience) are completed.</li>
            <li>Your resume must be uploaded in PDF format. Other file formats like .docx or .jpg will not be accepted.</li>
            <li>If the issue persists, try clearing your browser cache or using a different browser.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">3. How do I reset my password?</h3>
          <p className="mt-2">
            If you’ve forgotten your password or need to reset it, follow these steps:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Go to the login page.</li>
            <li>Click on "Forgot Password".</li>
            <li>Enter your registered email address.</li>
            <li>Follow the password reset instructions sent to your email.</li>
            <li>Set a new password and log in again.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">4. Why am I not receiving email notifications?</h3>
          <p className="mt-2">
            If you are not receiving email notifications, check the following:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Look in your spam/junk folder to ensure the emails are not being filtered.</li>
            <li>Verify that email notifications are enabled in your account settings.</li>
            <li>If you still don’t receive emails, contact support to check if your email is correctly registered.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">5. How can I update my job listing after posting?</h3>
          <p className="mt-2">
            You can edit your job listing by following these steps:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Navigate to your dashboard.</li>
            <li>Find the job post you want to update.</li>
            <li>Click on the edit option.</li>
            <li>Make the necessary changes to the job details.</li>
            <li>Click Save to update your listing.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">6. Why can't I submit my job description?</h3>
          <p className="mt-2">
            The job description must be exactly 200 words. If your description is below or above this limit, the system will not accept it. Ensure your content is precisely 200 words before submitting. You can use online word counters to check your word count before submitting.
          </p>
        </div>
      </div>
    ),
  },
  'security': {
  title: 'Security Information',
  content: (
    <div className="space-y-6">
      <p>
        Your account security is our top priority. We have implemented industry-standard measures to protect your personal and professional information, but it's also important that you follow best practices to keep your account secure.
      </p>
      <p>
        Here are some key tips to ensure your account remains secure:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li><strong>Use a Strong Password:</strong> Create a unique password containing a mix of uppercase and lowercase letters, numbers, and symbols.</li>
        <li><strong>Enable Two-Factor Authentication (2FA):</strong> Add an extra layer of security by enabling 2FA for your account. This will require a second verification step during login.</li>
        <li><strong>Beware of Phishing Scams:</strong> Do not click on suspicious links or provide your login information to anyone requesting it via email or message.</li>
        <li><strong>Regularly Update Your Password:</strong> Change your password periodically and avoid using the same password for multiple sites.</li>
      </ul>
      <p>
        If you suspect any suspicious activity or believe your account may have been compromised, please reach out to support immediately. We are here to assist you in resolving any security concerns.
      </p>
      <p>
        By taking these precautions and staying vigilant, you can help protect your account and the sensitive information it contains.
      </p>
    </div>
  ),
},

  'community': {
  title: 'Community Guidelines',
  content: (
    <div className="space-y-6">
      <p>
        Our community is designed to foster collaboration, knowledge sharing, and professional growth. By joining, you are becoming part of a network of like-minded individuals who are passionate about technology, innovation, and career development.
      </p>
      <p>
        In the community, you can:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Engage in <strong>discussions</strong> on various topics related to your field.</li>
        <li>Connect with professionals, mentors, and employers.</li>
        <li>Share knowledge through <strong>webinars, workshops</strong>, and events.</li>
        <li>Contribute to <strong>collaborative projects</strong> and <strong>networking opportunities</strong>.</li>
      </ul>
      <p>
        To maintain a positive and productive environment, we ask all members to follow these basic guidelines:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li><strong>Respectful Communication:</strong> Treat others with kindness and respect.</li>
        <li><strong>Relevant Contributions:</strong> Share content that is helpful, informative, and relevant to your professional interests.</li>
        <li><strong>Constructive Feedback:</strong> Offer feedback that is positive and supportive, helping others grow and improve.</li>
      </ul>
      <p>
        By following these guidelines, we can ensure a welcoming and valuable experience for everyone. Join us, and let’s build a vibrant and supportive community together!
      </p>
    </div>
  ),
},

  'billing': {
    title: 'Billing Information',
    content: 'Find information about your billing, payment methods, and invoices.',
  },
};

export default function DocumentaryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const pageContent = documentaryContent[slug as Slug];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{pageContent.title}</h1>
      <div className="mt-4 text-lg">{pageContent.content}</div>
    </div>
  );
}
