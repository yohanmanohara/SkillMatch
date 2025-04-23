"use client"

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, CalendarIcon, ClockIcon, UserIcon, VideoIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface Booking {
  id: number
  uid: string
  title: string
  description: string
  start: string
  end: string
  createdAt: string
  updatedAt: string
  status: string
  duration: number
  eventType: { id: number; slug: string }
  eventTypeId: number
  invitee: { name: string; email: string }
  bookingFieldsResponses: {
    name: string
    email: string
    guests: Array<any>
    location: { value: string; optionValue?: string }
  }
  location: string
  meetingUrl: string
  hosts: Array<{ id: number; name: string; email: string; eventTypeId: number; userId: number; isFixed: boolean }>
  attendees: Array<{ email: string; name: string; timeZone: string; locale: string }>
  guests: Array<any>
  metadata: Record<string, any>
  rating: number | null
  absentHost: boolean
  icsUid: string
}

export default function InterviewLinks() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('poop') : null

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/calbookings/employee`,
        {
          method: 'POST',
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch bookings')
      }

      const data = await response.json()
      setBookings(data.data[0]?.bookings || [])
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const getUniqueKey = (booking: Booking) => {
    if (booking.id && booking.uid) return `${booking.id}-${booking.uid}`
    if (booking.id) return booking.id.toString()
    if (booking.uid) return booking.uid
    return `${booking.start}-${booking.invitee?.email || booking.bookingFieldsResponses?.email || Math.random().toString(36).substring(2, 9)}`
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interview Schedule</h1>
        <p className="text-muted-foreground">
          {bookings.filter(b => new Date(b.start) > new Date()).length > 0
            ? `You have ${bookings.filter(b => new Date(b.start) > new Date()).length} upcoming interview${bookings.length !== 1 ? 's' : ''}`
            : 'No upcoming interviews scheduled'}
        </p>
      </div>

      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Card key={`skeleton-${i}`} className="h-[200px]">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!loading && error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error loading interviews</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={fetchBookings}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && !error && bookings.filter(b => new Date(b.start) > new Date()).length === 0 && (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle>No upcoming interviews</CardTitle>
            <CardDescription>
              Your scheduled interviews will appear here once booked.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {!loading && !error && bookings.filter(b => new Date(b.start) > new Date()).length > 0 && (
        <div className="grid gap-6">
          {bookings
            .filter((booking) => new Date(booking.start) > new Date())
            .map((booking) => (
              <Card key={getUniqueKey(booking)} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{booking.title || 'Untitled Interview'}</CardTitle>
                      <CardDescription className="mt-1">
                        {format(parseISO(booking.start), 'MMMM d, yyyy')}
                        <span className="mx-2">•</span>
                        {format(parseISO(booking.start), 'p')} - {format(parseISO(booking.end), 'p')}
                      </CardDescription>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${booking.bookingFieldsResponses?.name || 'U'}`}
                      />
                      <AvatarFallback>
                        {booking.bookingFieldsResponses?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <UserIcon className="mr-2 h-4 w-4 opacity-70" />
                      <span className="font-medium">Candidate:</span>
                      <span className="ml-2">
                        {booking.bookingFieldsResponses?.name || 'N/A'} ({booking.bookingFieldsResponses?.email || 'N/A'})
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      <span className="font-medium">Status:</span>
                      <Badge variant="outline" className="ml-2 capitalize">
                        {booking.status || 'unknown'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <VideoIcon className="mr-2 h-4 w-4 opacity-70" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">
                        {booking.location || booking.bookingFieldsResponses?.location?.value || 'Online'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Interviewers:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {booking.hosts?.length > 0 ? (
                          booking.hosts.map((host) => (
                            <Badge key={`host-${host.id}`} variant="secondary">
                              {host.name}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">Not specified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {booking.meetingUrl ? (
                    <Button variant="outline" size="sm" onClick={() => window.open(booking.meetingUrl, '_blank')}>
                      Join Meeting
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      No Meeting Link
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
