"use client"

import { useEffect, useState, useMemo } from 'react'
import { format, isAfter, parseISO } from 'date-fns'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { CalendarIcon, ClockIcon, UserIcon, VideoIcon } from 'lucide-react'
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
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showApiKeyForm, setShowApiKeyForm] = useState(false)
  const [inputApiKey, setInputApiKey] = useState('')

  const apiKey = 'cal_live_c6049ba840b72c00fee423ca1b331b3b'
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('poop') : null

  // Filter out past interviews and sort by date
  const upcomingBookings = useMemo(() => {
    const now = new Date()
    return bookings
      .filter(booking => isAfter(parseISO(booking.start), now))
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  }, [bookings])

  useEffect(() => {
    if (!apiKey || !userId) return

    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/calbookings`,
          {
            method: 'POST',
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, userId })
          }
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to fetch bookings')
        }

        const data = await response.json()
        setBookings(data.data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [apiKey, userId])

  const handleApiKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!sessionId) throw new Error('Session not initialized')

      const response = await fetch('/api/store-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, apiKey: inputApiKey })
      })

      if (!response.ok) throw new Error('Failed to store API key')

      setShowApiKeyForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit API key')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interview Schedule</h1>
        <p className="text-muted-foreground">
          {upcomingBookings.length > 0
            ? `You have ${upcomingBookings.length} upcoming interview${upcomingBookings.length !== 1 ? 's' : ''}`
            : 'No upcoming interviews scheduled'}
        </p>
      </div>

      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[200px]">
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
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && !error && upcomingBookings.length === 0 && (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle>No upcoming interviews</CardTitle>
            <CardDescription>
              Your scheduled interviews will appear here once booked.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setShowApiKeyForm(true)}>
              Connect Calendar
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && !error && upcomingBookings.length > 0 && (
        <div className="grid gap-6">
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{booking.title}</CardTitle>
                    <CardDescription className="mt-1">
                   
                      {format(parseISO(booking.start), 'MMMM d, yyyy')}
                    </CardDescription>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${booking.bookingFieldsResponses.name}`}
                    />
                    <AvatarFallback>
                      {booking.bookingFieldsResponses.name.charAt(0)}
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
                      {booking.bookingFieldsResponses.name} ({booking.bookingFieldsResponses.email})
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">
                      {format(parseISO(booking.start), 'PPP')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClockIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="font-medium">Time:</span>
                    <span className="ml-2">
                      {format(parseISO(booking.start), 'p')} -{' '}
                      {format(parseISO(booking.end), 'p')}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                 
                  <div className="text-sm">
                    <p className="font-medium">Interviewers:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {booking.hosts.map((host) => (
                        <Badge key={host.id} variant="secondary">
                          {host.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => window.open(booking.meetingUrl, '_blank')}>
                  Join to the meeting 
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showApiKeyForm} onOpenChange={setShowApiKeyForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Cal.com Account</DialogTitle>
            <DialogDescription>
              Enter your API key to sync your scheduled interviews.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                value={inputApiKey}
                onChange={(e) => setInputApiKey(e.target.value)}
                placeholder="cal_xxxxxxxxxxxxxxxx"
                className="font-mono"
                required
              />
              <p className="text-sm text-muted-foreground">
                Find your API key in Cal.com under{' '}
                <strong>Settings → Developer → API Keys</strong>
              </p>
            </div>
            <Button type="submit" className="w-full">
              Connect Account
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}