import { Box } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'; // Import the HomeRoundedIcon component
import Breadcrumbs from '@mui/joy/Breadcrumbs';
const page = () => {
  return (
    <div>
      <Box sx={{ px: { xs: 2, md: 6 }, float: 'fixed' }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}
            >
              Users
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              My profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
          </Typography>
        </Box>
        
     
    </div>
  )
}

export default page
