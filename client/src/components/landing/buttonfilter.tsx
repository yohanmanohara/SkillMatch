import React from "react";
import { Button } from "@/components/ui/button";

function ButtonFilter() {
  return (
    <div className="flex flex-col items-center p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">People also searched</h2>

      <div className="flex flex-wrap justify-center gap-3 w-full">
        <Button className="bg-green-100 text-black hover:bg-green-500">
          Software Developer
        </Button>
        <Button className="bg-green-100 text-black hover:bg-green-500">
          HR Manager
        </Button>
        <Button className="bg-green-100 text-black hover:bg-green-500">
          FrontEnd Developer
        </Button>
        <Button className="bg-green-100 text-black hover:bg-green-500">
          UI/UX Developer
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 w-full mt-4">
        <Button className="bg-green-100 text-black hover:bg-green-500">
          Sales Representative
        </Button>
        <Button className="bg-green-100 text-black hover:bg-green-500">
          BackEnd Developer
        </Button>
        <Button className="bg-green-100 text-black hover:bg-green-500">
          Fullstack Developer
        </Button>
      </div>
    </div>
  );
}

export default ButtonFilter;
