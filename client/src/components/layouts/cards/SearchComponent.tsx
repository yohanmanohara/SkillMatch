'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ComboBox from "@/components/layouts/other/ComboBox";
import DropDown from "@/components/layouts/cards/DropDown";
import Button from '@/components/Buttons/Buttons';

interface Data {
  jobTitles: { label: string; value: string }[];
  locations: { label: string; value: string }[];
  jobTypes: { label: string; value: string }[];
  modalities: { label: string; value: string }[];
  countries: { label: string; value: string }[];
  salaries: { label: string; value: string }[];
}

interface SearchParams {
  jobTitle: string;
  location: string;
  jobType: string;
  modality: string;
  country: string;
  salary: string;
}

interface SearchComponentProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  handleSearch: (params: SearchParams) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchParams, setSearchParams, handleSearch }) => {
  const [data, setData] = useState<Data>({
    jobTitles: [],
    locations: [],
    jobTypes: [],
    modalities: [],
    countries: [],
    salaries: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/jobSearch');
        const formattedData = {
          jobTitles: response.data.jobTitles.map((item: string) => ({ label: item, value: item })),
          locations: response.data.locations.map((item: string) => ({ label: item, value: item })),
          jobTypes: response.data.jobTypes.map((item: string) => ({ label: item, value: item })),
          modalities: response.data.modalities.map((item: string) => ({ label: item, value: item })),
          countries: response.data.countries.map((item: string) => ({ label: item, value: item })),
          salaries: response.data.salaries.map((item: string) => ({ label: item, value: item })),
        };
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleComboBoxChange = (key: keyof SearchParams, value: string) => {
    setSearchParams(prevParams => ({
      ...prevParams,
      [key]: value
    }));
  };

  const handleDropdownChange = (key: keyof SearchParams, value: string) => {
    setSearchParams(prevParams => ({
      ...prevParams,
      [key]: value
    }));
  };

  const handleSearchClick = () => {
    handleSearch(searchParams);
  };

  return (
    <div className='flex flex-col gap-2 border-2 shadow-lg rounded-md p-4 border-primary-800'>
      <div className='flex items-center justify-center gap-4'>
        <ComboBox 
          data={data.jobTitles} 
          placeholder='select keywords'
          onChange={(value: string) => handleComboBoxChange('jobTitle', value)}
        />
        <ComboBox 
          data={data.locations} 
          placeholder='location'
          onChange={(value: string) => handleComboBoxChange('location', value)}
        />
        <Button variant="primary" size="medium" onClick={handleSearchClick}>Search</Button>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-2'>
          <DropDown 
            title="Job Type" 
            items={data.jobTypes} 
            onChange={(value: string) => handleDropdownChange('jobType', value)}
          />
          <DropDown 
            title="Modality" 
            items={data.modalities} 
            onChange={(value: string) => handleDropdownChange('modality', value)}
          />
          <DropDown 
            title="Country" 
            items={data.countries} 
            onChange={(value: string) => handleDropdownChange('country', value)}
          />
          <DropDown 
            title="Salary" 
            items={data.salaries} 
            onChange={(value: string) => handleDropdownChange('salary', value)}
          />
        </div>
        <Button variant={'primary'} size={'medium'}>Clear Filter</Button>
      </div>
    </div>
  );
};

export default SearchComponent;
