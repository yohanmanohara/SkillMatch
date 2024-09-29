'use client'
import React from 'react';
import DataGrid from '@/components/DataGrids/datagrid';
import { GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import meet from "../../../../../../public/meet.png";
import zoom from '../../../../../../public/zoom.png'
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Button from '@/components/Buttons/Buttons';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Title',
    headerName: 'Meeting Title',
    width: 150,
    editable: true,
  },
  {
    field: 'JobDescription',
    headerName: 'Meeting Description',
    width: 150,
    editable: true,
  },
  {
    field: 'Date',
    headerName: 'Date',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'attendies',
    headerName: 'attendies',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.Title || ''} ${row.JobDescription || ''}`,
  },
];

const rows = [
  { id: 1, JobDescription: 'Snow', Title: 'Jon', DueDate: 14 },
  { id: 2, JobDescription: 'Lannister', Title: 'Cersei', DueDate: 31 },
  { id: 3, JobDescription: 'Lannister', Title: 'Jaime', DueDate: 31 },
  { id: 4, JobDescription: 'Stark', Title: 'Arya', DueDate: 11 },
  { id: 5, JobDescription: 'Targaryen', Title: 'Daenerys', DueDate: 23  },
  { id: 6, JobDescription: 'Melisandre', Title: "Ranith", DueDate: 150 },
  { id: 7, JobDescription: 'Clifford', Title: 'Ferrara', DueDate: 44 },
  { id: 8, JobDescription: 'Frances', Title: 'Rossini', DueDate: 36 },
  { id: 9, JobDescription: 'Roxie', Title: 'Harvey', DueDate: 23 },
];

const Hiring = () => {
  return (
    <div className='flex items-start justify-around p-10 gap-4'>
      <div className='flex items-center justify-between flex-col gap-10'>
        <div className='flex items-center flex-col justify-center border-0 shadow-xl rounded-xl p-6'>
          <div className='font-semibold text-xl flex items-center justify-start w-full'>
            Schedule a meeting here
          </div>
          <form className='flex flex-col items-center justify-center gap-4'> 
            <div className=' flex items-center justify-center p-4 gap-4 '>
              <div className='flex flex-col gap-2'>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
              </div>
              <div className='flex flex-col gap-2'>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
              </div>
            </div>
            <Button variant={'primary'} size={'medium'}>Submit</Button>
          </form>
        </div>
        <div className='flex flex-col items-center justify-center gap-8 border-0'>
          <div>Create an instant Meeting.</div>
          <div className='flex items-center justify-center gap-6'>
            <a href=''><Image src={meet} alt='meet icon' className='w-[200px] h-[100px] border-2 rounded-xl shadow-2xl object-cover'></Image></a>
            <a href=''><Image src={zoom} alt='zoom icon' className='w-[200px] h-[100px] border-2 rounded-xl shadow-2xl object-cover'></Image></a>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8 items-center justify-center'>
            <DataGrid rows={rows} columns={columns} gridwidth='100%' pageSize={10}/>
      </div>
    </div>
  );
}

export default Hiring;