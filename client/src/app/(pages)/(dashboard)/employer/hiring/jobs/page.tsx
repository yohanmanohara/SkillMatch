"use client"
import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Box } from '@mui/material';


const JobPostingForm: React.FC = () => {
 
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    jobDescription: '',
    contractType: '',
    location: '',
    workingLanguage: '',
    jobCategory: '',
    jobLink: '',
    email: '',
    companySize: '',
    industry: '',
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  const contractType = [
    {
      value: 'Full-Time',
      label: 'Full-Time',
    },
    {
      value: 'Part-Time',
      label: 'Part-Time',
    },
    {
      value: 'Contract',
      label: 'Contract',
    },
    {
      value: 'Internship',
      label: 'Internship',
    },
  ];

  return (
    <div className='pl-52' >
     <Box >

    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="company"
            name="company"
            label="Company *"
            value={formData.company}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="jobTitle"
            name="jobTitle"
            label="Job Title *"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="jobDescription"
            name="jobDescription"
            label="Job Description *"
            value={formData.jobDescription}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7} >
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {contractType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>

        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="location"
            name="location"
            label="Location *"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="workingLanguage"
            name="workingLanguage"
            label="Working Language *"
            value={formData.workingLanguage}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="jobCategory"
            name="jobCategory"
            label="Category of Job *"
            value={formData.jobCategory}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="jobLink"
            name="jobLink"
            label="Link to the Job *"
            value={formData.jobLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email *"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="companySize"
            name="companySize"
            label="Company Size"
            value={formData.companySize}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            fullWidth
            id="industry"
            name="industry"
            label="Industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={7}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
    </Box>
    </div>
  );
};

export default JobPostingForm;
