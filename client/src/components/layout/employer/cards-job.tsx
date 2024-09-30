import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CardWithForm() {
  const [cards, setCards] = useState([
    {
      name: "Sample Project 1",
      framework: "Next.js",
    },
    {
      name: "Sample Project 2",
      framework: "Nuxt.js",
    },
  ]); // Initial example data

  const handleDeploy = () => {
    // Example data to be added on button click
    const exampleData = {
      name: "New Project",
      framework: "SvelteKit",
    };

    setCards([...cards, exampleData]);
  };

  return (
    <div className="w-full">
   

      {/* Render Deployed Cards */}
      <div className="mt-4">
        {cards.map((card, index) => (
          <Card key={index} className="w-full shadow-lg mt-4">
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
