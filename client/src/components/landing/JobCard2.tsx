import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  logo: string;
}

export default function JobCard({ title, company, location, logo }: JobCardProps) {
  return (
    <Card className="p-4 flex items-center justify-between border  rounded-md font-sans shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Company Logo */}
        <Image src={logo} alt={`${company} logo`} width={50} height={50} className="rounded-md" />

        {/* Job Details */}
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-gray-600 font-medium">{company}</p>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>

      {/* Small Apply Button */}
      <Button variant={'secondary'} size="sm" className="h-8 px-4 ">
        Apply
      </Button>
    </Card>
  );
}
