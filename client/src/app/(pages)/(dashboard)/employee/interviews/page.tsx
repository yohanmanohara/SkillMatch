import InterviewScheduler from "@/components/InterviewScheduler";  // Import the component

export default function InterviewPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Interview Scheduler</h1>
            <InterviewScheduler />  {/* Render the InterviewScheduler component */}
        </div>
    );
}
