"use client";
import React, { useState } from "react";
import Image from "next/image";
import Phone from "@/../public/phone.png";
import Address from "@/../public/address.png";
import Email from "@/../public/email.png";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactDetails = [
  { id: 1, icon: Phone, label: "PHONE:", value: "+2348141898014" },
  { id: 2, icon: Address, label: "ADDRESS:", value: "Challenge, Ibadan, Nigeria" },
  { id: 3, icon: Email, label: "EMAIL:", value: "iremiodeneye126@gmail.com" },
];

function GetInTouch() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/email_sending", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Email sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("Failed to send email.");
    }

    {status && <p className="text-sm mt-2 text-black">{status}</p>} 
  };

  return (
    <div className="flex flex-col lg:flex-row bg-green-200 rounded-md w-auto h-auto p-8 lg:p-24 m-10 gap-8 lg:gap-48 items-center justify-between" id="contact">
      <div className="flex flex-col lg:w-1/2 w-full">
        {contactDetails.map(({ id, icon, label, value }) => (
          <div key={id} className="flex flex-row gap-4 items-center mb-6">
            <Image src={icon} alt="" width={38} height={38} />
            <div className="h-12 border-l-2 border-gray-500"></div>
            <div className="flex flex-col text-gray-900">
              <div className="font-bold">{label}</div>
              <div className="text-sm">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <form className="flex flex-col gap-4 lg:w-1/2 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full lg:w-auto text-black" 
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full lg:w-auto text-black" 
          />
        </div>
        <Input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full text-black"
        />
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="resize-none w-full text-black" 
          required
        />
        <Button type="submit" className="w-full lg:w-auto">Submit</Button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}

export default GetInTouch;
