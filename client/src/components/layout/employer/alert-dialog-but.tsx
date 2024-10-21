"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"
import { useState } from "react";

export default function SignUpDialog() {
  const [values, setValues] = useState([15000, 100000]);

  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    employmentTypes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
     
    
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log("Sign-up form submitted", formData);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-40">Add Job</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Jobs Here</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill out the form to add your job details.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 p-4">
            <label htmlFor="title" className="text-sm">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />

            <label htmlFor="employmentTypes" className="text-sm">
              Type of Employment
            </label>
            <div className="flex flex-col gap-2">
              {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    name="employmentTypes"
                    value={type}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </div>
            <div>



      <label htmlFor="salary" className="text-sm">
        Salary
      </label>

      <div style={{ width: '300px', margin: '20px auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <input
            type="text"
            value={`Rs. ${values[0].toLocaleString()}`}
            readOnly
            style={{ border: 'none', width: '80px', textAlign: 'center', background: 'transparent' }}
          />
          <span>to</span>
          <input
            type="text"
            value={`Rs. ${values[1].toLocaleString()}`}
            readOnly
            style={{ border: 'none', width: '80px', textAlign: 'center', background: 'transparent' }}
          />
        </div>
        <Slider
          value={values}
          onValueChange={(newValue: number[]) => setValues(newValue)}
          min={15000}
          max={700000}
          
          
          style={{ color: '#5F3FF3' }} 
        />
      </div>
    </div>

<div>

</div>
           
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Next</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
