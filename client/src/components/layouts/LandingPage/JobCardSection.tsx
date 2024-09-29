'use client'
import React, { useEffect, useState } from 'react'
import SearchComponent from '@/components/layouts/cards/SearchComponent'
import PrimaryJobCard from '@/components/layouts/cards/JobCardPrimary'
import Pagination from '@/components/layouts/other/pagination'

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const JobCardSection = () => {
  const [shuffledCards, setShuffledCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const cards = new Array(8).fill(null).map((_, index) => <PrimaryJobCard key={index} />);
    setShuffledCards(shuffleArray(cards));
  }, []);

  return (
    <div className='flex items-center justify-center flex-col gap-8'>
      <div>
        <div>Search for Jobs</div>
      </div>
      {/* <SearchComponent /> */}
      <div className='grid grid-cols-3 gap-4'>
        {shuffledCards}
      </div>
      <Pagination />
    </div>
  )
}

export default JobCardSection
