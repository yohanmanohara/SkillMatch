'use client'
import React from 'react'
import Calander from '@/components/layouts/other/Calander'
import { GridColDef } from '@mui/x-data-grid';
import DataGrid from '@/components/DataGrids/datagrid'
import LineChart from '@/components/charts/linechart'


const page = () => {
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
  
  
  return (
    <div className='flex items-start justify-center'>
      <div className='flex flex-col items-center justify-center flex-1 '>
        <p>Applied Jobs</p>
        <DataGrid rows={rows} columns={columns} gridwidth='80%' pageSize={5}/>
        <LineChart></LineChart>
      </div>
      <div className='flex flex-col items-center justify-start flex-2 '>
        <p>Scheduled Meetings</p>
        <Calander></Calander>
      </div>
    </div>
  )
}

export default page
