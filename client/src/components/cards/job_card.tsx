import React from 'react'
import Image from 'next/image'
import Check from '@/public/calendar-check.svg'
import Users from '@/public/users.svg'
import Calendar from '@/public/calendae-x.svg'
import { Button } from "@/components/ui/button"

function job_card() {
  return (
    <div>
      <div 
        className="rounded-lg shadow-lg p-6 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6 text-white border-2 border-green-500"
        style={{ width: '100%', height: 'auto' }}
      >
        <div className="flex flex-col gap-6 flex-grow">
          <div className="font-bold text-xl text-green-500">
            Senior Software Engineer
            <div className="text-lg font-normal">
              IFS
            </div>
            <div className="text-sm font-light text-white">
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </div>
          </div>

          <div className="flex items-center justify-between">
          <div className="flex flex-row gap-5">
            <div className="flex flex-row items-center gap-2">
              <Image src="/users.svg" alt="" width={24} height={24} />
              <div className="text-sm">
                30 applicants
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Image src="/calendar-check.svg" alt="" width={24} height={24} />
              <div className="text-sm">
                07/04/2024
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Image src="/calendar-x.svg" alt="" width={24} height={24} />
              <div className="text-sm">
                07/05/2024
              </div>
            </div>
          </div>
        
          <Button className="bg-green-500 text-white">Proceed</Button>
        
          </div>
        </div>
      </div>
    </div>
  )
}

export default job_card;
