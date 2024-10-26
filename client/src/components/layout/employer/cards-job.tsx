import * as React from "react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardWithForm() {
  const [cards, setCards] = useState([
    {
      name: "Sample Project 1",
      framework: "Next.js",
    },
    {
      name: "Sample Project 1",
      framework: "Next.js",
    },
   
   
  ]); // Initial example data

  const handleDeploy = () => {
    
    const exampleData = {
      name: "New Project",
      framework: "SvelteKit",
    };

    setCards([...cards, exampleData]);
  };

  return (
    <div className="w-full pl-3 pr-3 lg:pl-32 lg:pr-32">
  
      <div className="mt-4">
        {cards.map((card, index) => (
          <Card key={index} className="w-full shadow-lg mt-4 bg-[#DCFCE0] text-black">
            <CardHeader>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>Framework: {card.framework}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Project created successfully!</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
