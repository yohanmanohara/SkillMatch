"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Importing icons from React Icons
import { FaPhoneAlt, FaMapPin, FaEnvelope, FaSpinner, FaPaperPlane } from "react-icons/fa";

const contactDetails = [
  { 
    id: 1, 
    icon: FaPhoneAlt, 
    label: "PHONE", 
    value: "+2348141898014",
    href: "tel:+2348141898014" 
  },
  { 
    id: 2, 
    icon: FaMapPin, 
    label: "ADDRESS", 
    value: "Challenge, Ibadan, Nigeria",
    href: "https://maps.google.com?q=Challenge,Ibadan,Nigeria" 
  },
  { 
    id: 3, 
    icon: FaEnvelope, 
    label: "EMAIL", 
    value: "iremiodeneye126@gmail.com",
    href: "mailto:iremiodeneye126@gmail.com" 
  },
];

export function Contactus() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
  });
  const [status, setStatus] = useState<{message: string, type: 'success' | 'error' | ''}>({message: '', type: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({message: "Sending...", type: ''});

    try {
      const res = await fetch("/api/email_sending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({message: "Message sent successfully!", type: 'success'});
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus({message: "Failed to send message. Please try again.", type: 'error'});
    }
  };

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted/30" id="contact">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge 
                variant="secondary" 
                className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
              >
                Contact Us
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Let's Build Something Together
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Have a project in mind or want to discuss opportunities? Reach out through any of these channels.
              </p>
            </div>

            <div className="grid gap-4">
              {contactDetails.map(({ id, icon: Icon, label, value, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="hover:shadow-md transition-all hover:border-primary/20 group">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm text-muted-foreground">{label}</h3>
                        <p className="text-base font-medium group-hover:text-primary transition-colors">
                          {value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                    disabled={status.message === "Sending..."}
                  >
                    {status.message === "Sending..." ? (
                      <span className="flex items-center gap-2">
                        <FaSpinner className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <FaPaperPlane className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                  {status.message && (
                    <div className={`rounded-lg p-3 text-center ${
                      status.type === 'success' ? 'bg-green-50 text-green-800' : 
                      status.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-muted text-muted-foreground'
                    }`}>
                      {status.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
