import Image from "next/image";
import React from "react";
import human_icon from "@/../public/Ellipse.png";
import comma_icon from "@/../public/Frame.png";
import Security from "@/../public/security.png";
import Invest from "@/../public/investing.png";
import Multiple from "@/../public/multiple.png";
import Faq from "@/components/landing/faq";

const feedbacks = [
  {
    id: 1,
    feedback:
      "Great session! She shared some practical advice on how we can go about refining our service offerings.",
    name: "Eaden Noava",
    title: "Software Developer",
    humanIcon: human_icon,
    commaIcon: comma_icon,
  },
  {
    id: 2,
    feedback:
      "The advice I received was invaluable. Cool session. It helped me shape my project better.",
    name: "Zeke Stone",
    title: "UI/UX Designer",
    humanIcon: human_icon,
    commaIcon: comma_icon,
  },
  {
    id: 3,
    feedback:
      "Insightful session! Definitely going to apply the ideas shared during the meeting. Thank you for hosting such an event.",
    name: "John Doe",
    title: "Product Manager",
    humanIcon: human_icon,
    commaIcon: comma_icon,
  },
];

const Client_Feedback = () => {
  return (
    <div className="w-full px-4 py-16 md:py-24" id="faq">
      {/* What do we offer section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-green-600 bg-clip-text mb-4">
            What do we offer?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium features designed to enhance your experience
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 w-full">
            {[
              { icon: Security, title: "Security Guarantee", description: "Bank-level encryption and protection" },
              { icon: Invest, title: "Smart Investing", description: "AI-powered investment strategies" },
              { icon: Multiple, title: "Multiple Methods", description: "Diverse options for every need" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title} 
                      width={32} 
                      height={32}
                      className="text-green-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Feedback Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What our clients say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by professionals across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map(({ id, feedback, name, title, humanIcon, commaIcon }) => (
              <div
                key={id}
                className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group transform hover:scale-105"
              >
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Image 
                    src={commaIcon} 
                    alt="Quote" 
                    width={40} 
                    height={40}
                  />
                </div>
                <p className="text-gray-700 mb-6 relative z-10">{feedback}</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <Image 
                      src={humanIcon} 
                      alt={name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{name}</h4>
                    <p className="text-sm text-gray-500">{title}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Faq />
      </div>
    </div>
  );
};

export default Client_Feedback;
