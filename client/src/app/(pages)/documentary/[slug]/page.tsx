import { notFound } from 'next/navigation';
import React from 'react';

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
            <li> Click on the <strong>Sign Up</strong> button at the top-right corner of the homepage.</li>
            <li>Enter your <strong>name, email, and a strong password</strong>.</li>
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
            <li>Profile Picture: Upload a 872x872 px image.</li>
            <li>Personal Information: Add your location, skills, and professional summary.</li>
            <li>Resume Upload: Ensure your resume is in <strong>PDF format</strong> for better compatibility.</li>
          </ul>
          <p className="mt-2">
            A complete profile helps you stand out to employers and recruiters.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">3. Navigating the Dashboard</h3>
          <p className="mt-2">
            Once logged in, you will land on your <strong>Dashboard</strong>, where you can:
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
            <li>Apply directly by clicking the Apply Now button on a job listing.</li>
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
          <li><strong>Sign Up:</strong> Click the &quot;Sign Up&quot; button and provide your email address, a secure password, and basic details such as your name.</li>
          <li><strong>Verify Your Email:</strong> Check your inbox for a verification email and click the provided link to confirm your registration.</li>
          <li><strong>Complete Your Profile:</strong> Add information such as your skills, professional summary, and location to make your profile more attractive to potential employers.</li>
          <li><strong>Set Up Notifications:</strong> Choose which notifications you&rsquo;d like to receive, such as job updates or messages from employers and fellow users.</li>
        </ul>
        <p>
          Once your account is set up, you can start exploring the platform&rsquo;s features and take full advantage of the opportunities available to you.
        </p>
        <p>
          Need help with your account setup? Don&rsquo;t hesitate to check our FAQs or reach out to support if you encounter any issues.
        </p>
      </div>
    ),
  },
  'faq': {
    title: 'Frequently Asked Questions',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">1. Why can&apos;t I upload my photo?</h3>
          <p className="mt-2">
            The platform requires profile images to be 872x872 pixels in size. If your image does not meet these dimensions, it may not upload successfully. Please resize your image to 872x872 pixels before attempting to upload it again.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">2. Why can&apos;t I submit my application?</h3>
          <p className="mt-2">
            If you&apos;re unable to submit your application, please check the following:
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
            If you&apos;ve forgotten your password or need to reset it, follow these steps:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Go to the login page.</li>
            <li>Click on &quot;Forgot Password&quot;.</li>
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
            <li>If you still don&apos;t receive emails, contact support to check if your email is correctly registered.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">5. How can I update my job listing after posting?</h3>
          <p className="mt-2">
            You can update your job listing by following these steps:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Navigate to your employer dashboard.</li>
            <li>Click on the &quot;Manage Listings&quot; section.</li>
            <li>Select the job listing you wish to edit.</li>
            <li>Make the necessary changes and click &quot;Save&quot;.</li>
          </ul>
        </div>
      </div>
    ),
  },
  'security': {
    title: 'Security Settings',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">1. How do I change my password?</h3>
          <p className="mt-2">
            To change your password, follow these steps:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Log in to your account.</li>
            <li>Go to your account settings.</li>
            <li>Click on &quot;Change Password&quot;.</li>
            <li>Enter your current password and your new password.</li>
            <li>Click &quot;Save&quot; to confirm the change.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">2. How do I enable two-factor authentication?</h3>
          <p className="mt-2">
            Two-factor authentication (2FA) adds an extra layer of security to your account. Here&apos;s how to enable it:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Go to your account settings.</li>
            <li>Navigate to the &quot;Security&quot; section.</li>
            <li>Click on &quot;Enable 2FA&quot;.</li>
            <li>Follow the instructions to set up 2FA using an authentication app (like Google Authenticator).</li>
            <li>Once 2FA is enabled, you&apos;ll be required to enter a code from your authentication app each time you log in.</li>
          </ul>
        </div>
      </div>
    ),
  },
  'community': {
    title: 'Community Guidelines',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">1. Be Respectful</h3>
          <p className="mt-2">
            Treat all community members with respect. Harassment, hate speech, and any form of discrimination will not be tolerated.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">2. Share Knowledge</h3>
          <p className="mt-2">
            We encourage sharing ideas and insights. Please provide thoughtful contributions to discussions and avoid spamming or self-promotion.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">3. Protect Privacy</h3>
          <p className="mt-2">
            Do not share personal or confidential information of others without their consent. Respect everyone&apos;s privacy.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">4. Report Issues</h3>
          <p className="mt-2">
            If you encounter any inappropriate content or behavior, please report it to the moderators or support team.
          </p>
        </div>
      </div>
    ),
  },
  'billing': {
    title: 'Billing Information',
    content: (
      <div className="space-y-6">
        <p>
          Here is how you can manage your billing information and payments:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Update your billing address by going to your account settings.</li>
          <li>Review your payment history and invoices in the billing section.</li>
          <li>Ensure your payment method is up-to-date to avoid service interruptions.</li>
        </ul>
      </div>
    ),
  },
};

// Define the type for the params prop
interface PageProps {
  params: {
    slug: Slug;  // This will infer the type of `slug` for each possible route
  };
}

// Default export: A React component that renders the content based on the slug
export default function DocumentaryPage({ params }: PageProps) {
  const { slug } = params;

  // Ensure slug is one of the valid values
  if (!slug || !documentaryContent[slug]) {
    return notFound(); // Render the Next.js 404 page if slug is not valid
  }

  const pageContent = documentaryContent[slug];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{pageContent.title}</h1>
      <div className="mt-4 text-lg">
        {pageContent.content}
      </div>
    </div>
  );
}
