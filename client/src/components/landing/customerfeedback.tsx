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
    <div className="w-full px-4 py-10 md:py-16" id="faq">
      {/* What do we offer section */}
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-2xl md:text-3xl text-center">
          What do we offer?
        </div>

        {/* Flex container updated to center align items */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 my-9 ">
          <div className="flex flex-row font-bold gap-4 items-center">
            <Image src={Security} alt="Security" width={40} height={40} />
            <div>Security Guarantee</div>
          </div>

          <div className="flex flex-row font-bold gap-4 items-center">
            <Image src={Invest} alt="Investing" width={40} height={40} />
            <div>Investing</div>
          </div>

          <div className="flex flex-row font-bold gap-4 items-center">
            <Image src={Multiple} alt="Multiple Method" width={40} height={40} />
            <div>Multiple Method</div>
          </div>
        </div>
      </div>

      {/* Client Feedback Section */}
      <div className="flex flex-wrap gap-6 justify-center">
        {feedbacks.map(({ id, feedback, name, title, humanIcon, commaIcon }) => (
          <div
            key={id}
            className="flex flex-col items-start justify-center gap-6 text-black border-0 rounded-xl w-full sm:w-[300px] md:w-[350px] bg-[#BEF4CE] px-6 py-4"
          >
            <Image src={commaIcon} alt="Comma" />
            <div className="text-sm md:text-base">{feedback}</div>
            <div className="flex items-center gap-3">
              <Image src={humanIcon} alt="User Icon" width={40} height={40} />
              <div className="flex flex-col">
                <div className="font-bold">{name}</div>
                <div className="text-sm">{title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <Faq />
    </div>
  );
};

export default Client_Feedback;
