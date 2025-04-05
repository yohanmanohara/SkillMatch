import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How secure is my personal information?",
      answer: "We use bank-level 256-bit encryption and comply with all data protection regulations to ensure your information remains completely secure."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and cryptocurrency payments for your convenience."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no hidden fees or penalties."
    },
    {
      question: "How quickly can I get support if I have issues?",
      answer: "Our support team is available 24/7 with an average response time of under 30 minutes for all premium users."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about our services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm"
          >
            <button
              className={`flex items-center justify-between w-full p-6 text-left ${activeIndex === index ? 'bg-gray-50' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="font-medium text-lg">{faq.question}</h3>
              {activeIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            <div 
              className={`px-6 pb-6 pt-0 transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
            >
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Faq;