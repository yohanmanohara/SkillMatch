import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CompanyDetails = () => {
  const companyData = {
    companuPicUrl: "/JobIcon.png",
    comapnyName: "Tech Innovators Ltd.",
    companyType: "Software Development",
    companyEmail: "contact@techinnovators.com",
    ContactNumber: "+1 234 567 890",
    websiteUrl: "https://techinnovators.com",
    streetAddress: "123 Innovation Street",
    city: "San Francisco",
    state: "California",
    postalCode: "94103",
    country: "USA",
    companyDescription:
      "Tech Innovators Ltd. is a leading software development company specializing in AI, cloud solutions, and cybersecurity. Our mission is to deliver cutting-edge technology solutions to businesses worldwide.",
    socialLinks: [
      { platform: "LinkedIn", icon: "/LinkedIn.png", url: "https://linkedin.com" },
      { platform: "Facebook", icon: "/FB.png", url: "https://facebook.com" },
      { platform: "Twitter", icon: "/twitter.png", url: "https://twitter.com" },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 bg-green-100 shadow-lg rounded-lg">
      {/* Company Logo */}
      <div className="mb-6">
        <Image
          src={companyData.companuPicUrl}
          alt="Company Logo"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>

      {/* Company Name & Type */}
      <div className="text-3xl font-bold text-gray-800">{companyData.comapnyName}</div>
      <div className="text-lg text-gray-600 mb-4">{companyData.companyType}</div>

      {/* Contact Information */}
      <div className="flex flex-col items-center space-y-2 text-gray-700">
        <div>Email: <span className="font-medium">{companyData.companyEmail}</span></div>
        <div>Contact: <span className="font-medium">{companyData.ContactNumber}</span></div>
        {companyData.websiteUrl && (
          <Button variant="outline" className="mt-2">
            <a href={companyData.websiteUrl} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Button>
        )}
      </div>

      {/* Address Section */}
      <div className="mt-6 p-4 bg-green-400 rounded-lg w-full text-center">
        <div className="text-lg font-semibold text-gray-800">Address</div>
        <div className="">{companyData.streetAddress}, {companyData.city}, {companyData.state}</div>
        <div>{companyData.postalCode}, {companyData.country}</div>
      </div>

      {/* Company Description */}
      <div className="mt-6 text-gray-700 text-center">
        <div className="text-lg font-semibold text-gray-800 mb-2">About Us</div>
        <div>{companyData.companyDescription}</div>
      </div>

      {/* Social Links */}
      <div className="mt-6 flex space-x-4">
        {companyData.socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            <Image src={link.icon} alt={link.platform} width={24} height={24} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CompanyDetails;