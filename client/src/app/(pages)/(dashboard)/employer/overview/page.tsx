"use client"
import React, { useState } from "react"
import Chart from "@/components/charts/sample_chart"
import { FileText } from "lucide-react"

// Define the type for applications
interface Application {
  id: number
  name: string
  position: string
  date: string
  email: string
  phone: string
}

const applications: Application[] = [
  { id: 1, name: "John Doe", position: "Software Engineer", date: "Feb 29, 2024", email: "john.doe@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", position: "UI/UX Designer", date: "Feb 28, 2024", email: "jane.smith@example.com", phone: "987-654-3210" },
  { id: 3, name: "Michael Brown", position: "Data Analyst", date: "Feb 27, 2024", email: "michael.brown@example.com", phone: "555-555-5555" },
]

function Page() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleApplicationClick = (app: Application) => {
    if (selectedApplication?.id === app.id) {
      setSelectedApplication(null) 
      setIsModalOpen(false) 
    } else {
      setSelectedApplication(app) 
      setIsModalOpen(true) 
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedApplication(null)
  }

  return (
    <div className="p-6 space-y-6">
      <Chart />

      
      <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Incoming Applications</h2>
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex justify-between items-center p-2 border-b last:border-b-0 cursor-pointer"
              onClick={() => handleApplicationClick(app)}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/Guy 4.png"
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-gray-300"
                />
                <div>
                  <p className="font-medium">{app.name}</p>
                  <p className="text-xs">{app.position}</p>
                </div>
              </div>
              <p className="text-xs">{app.date}</p>
            </div>
          ))}
        </div>
      </div>

     
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-slate-100 text-black p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-3">Application Details</h2>
            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedApplication.name}</p>
              <p><strong>Position:</strong> {selectedApplication.position}</p>
              <p><strong>Date Applied:</strong> {selectedApplication.date}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Phone:</strong> {selectedApplication.phone}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
