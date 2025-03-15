"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <div className="w-full px-4 py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">Why can&apos;t I upload my photo?</AccordionTrigger>
            <AccordionContent className="text-left w-full break-words">
              The image should be <strong>872x872</strong> pixels.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">Why can&apos;t I submit my application?</AccordionTrigger>
            <AccordionContent className="text-left w-full break-words">
              Ensure all required fields are filled out and your resume is uploaded in <strong>PDF format</strong>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">How do I reset my password?</AccordionTrigger>
            <AccordionContent className="text-left w-full break-words">
              Click on <strong>&quot;Forgot Password&quot;</strong> on the login page and follow the instructions to reset your password.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">Why am I not receiving email notifications?</AccordionTrigger>
            <AccordionContent className="text-left w-full break-words">
              Check your <strong>spam/junk folder</strong> and ensure you have enabled email notifications in your account settings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">How can I update my job listing after posting?</AccordionTrigger>
            <AccordionContent className="text-left w-full break-words">
              You can edit your job card from the <strong>dashboard</strong> by selecting the job post and making the necessary changes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">Why can&apos;t I submit my job description?</AccordionTrigger>
            <AccordionContent className="text-left w-full break-words">
              The job description must be exactly <strong>200 words</strong>. If it&apos;s below or above the limit, it won&apos;t be accepted.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;