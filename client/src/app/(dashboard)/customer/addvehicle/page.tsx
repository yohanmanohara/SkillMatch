"use client";
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
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TabsDemo() {
  const userId = sessionStorage.getItem("poop"); // More meaningful key
  const router = useRouter();
  const [lod, setLod] = useState(false);

  const handleVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   setLod(true);
    try {
      const updateVehicle = {
        name: e.currentTarget.model.value,
        numberPlate: e.currentTarget.numberPlate.value,
        driverName: e.currentTarget.driverName.value,
        iotid: e.currentTarget.iot?.value || '', // Default to an empty string if not provided
        contactnumber: e.currentTarget.contactnumber.value,
        status: 'Active',
      };
  
      console.log(updateVehicle);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicle/addvehicle/?id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateVehicle),
      });
  
      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error("Failed to add vehicle:", errorData);
          toast({
            title: "Failed to Add Vehicle",
            description: errorData.message || "Failed to add vehicle. Please try again.",
          });
        } catch {
          throw new Error("Invalid response format");
        }
        return;
      }
  
      toast({
        title: "Vehicle added successfully",
        description: "Vehicle details have been successfully added.",
      });
  
      router.push("/customer/vehicles");
    } catch (error) {
      console.error("An error occurred while adding the vehicle:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    
    } finally {
      setLod(false);
    }
  };
 
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <Tabs defaultValue="account" className="w-[400px] md:w-[800px]">
        <TabsList className="grid grid-cols-1 text-4xl w-full h-max border-spacing-1">
          <TabsTrigger value="account" className="text-xl">
            Add Vehicle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Add Your Vehicle Details</CardTitle>
              <CardDescription>
                Enter your vehicle details. Click 'Add Vehicle' when done.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleVehicle}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Vehicle Name</Label>
                  <Input id="model" name="model" placeholder="Vehicle model" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="numberPlate">Number Plate</Label>
                  <Input id="numberPlate" name="numberPlate" placeholder="Ks-3948" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input id="driverName" name="driverName" placeholder="Driver full Name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="driverName">IOT Id</Label>
                  <Input id="iot" name="iot" placeholder="iot device id" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contactnumber">Contact Number</Label>
                  <Input id="contactnumber" name="contactnumber" placeholder="0772243631" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={lod}>
                  {lod ? "Processing" : "Add Vehicle"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
