import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

function page() {
  return (
    <div className=''>
    <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>What credit score do I need to apply for a credit card?</AccordionTrigger>
      <AccordionContent>
      The required credit score may vary depending on the specific credit card. Generally, a good to excellent credit score (typically 670 or above) increases your chances of approval for premium credit cards.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger> How can I apply for a credit card online?</AccordionTrigger>
      <AccordionContent>
      To apply for a credit card online:

        1. Go to the bank's website or app.
        2. Choose a credit card.
        3. Fill out the application with your details.
        4. Submit and wait for approval.

        It’s quick and convenient!
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Are there any annual fees associated with the credit card?</AccordionTrigger>
      <AccordionContent>
      Yes, some credit cards have annual fees, but many offer no-fee options. It depends on the card you choose.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4">
      <AccordionTrigger>How long does it take to receive the credit card once approved?</AccordionTrigger>
      <AccordionContent>
      Once approved, it typically takes 7-10 business days to receive your credit card.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-5">
      <AccordionTrigger> How can I check my credit card balance and transactions?</AccordionTrigger>
      <AccordionContent>
      You can check your credit card balance and transactions through your bank's mobile app, online banking portal, or by contacting customer service.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-6">
      <AccordionTrigger>  What should I do if my credit card is lost or stolen?</AccordionTrigger>
      <AccordionContent>
      If your credit card is lost or stolen, immediately contact your card issuer to report it. They will block the card and issue a replacement.      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-7">
      <AccordionTrigger>  Is my credit card information secure?</AccordionTrigger>
      <AccordionContent>
      Yes, credit card information is generally secure with encryption and fraud protection measures in place. However, always be cautious when sharing details online or in public.</AccordionContent>
    </AccordionItem>
  </Accordion>
  </div>
  )
}

export default page