import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const meetings = [
    { id: 1, date: "2025-03-20", time: "10:00 AM", status: "Upcoming" },
    { id: 2, date: "2025-03-15", time: "2:00 PM", status: "Completed" },
];

export default function MeetingDashboard() {
    return (
        <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Interview Meetings</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meetings.map((meeting) => (
                        <TableRow key={meeting.id}>
                            <TableCell>{meeting.date}</TableCell>
                            <TableCell>{meeting.time}</TableCell>
                            <TableCell>{meeting.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
