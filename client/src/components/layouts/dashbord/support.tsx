
"use client"
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';  
import { useSession } from 'next-auth/react';
import Company from '@/components/layouts/profile/company';
import { styled } from '@mui/material/styles';
import Buttons from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
 
function UserProfile() {



    // const {data:session} = useSession();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [firstname, setFirstname] = React.useState('');
    const [lastname,setLastname]=React.useState('');
    const [mobile,setMobile]=React.useState('');
    const [bio,setbio]=React.useState('');

    
    
    const hadlesubmit = async (e:any) => {
      e.preventDefault();
      console.log('submitted');
  
     
    }

     const cancelfile = () => {
        
        setSelectedFile(null);
      }

    const handleFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
      };




  return (
    <>
        <Box sx={{ flex: 1, width: '100%' ,display: 'flex'}}>
      
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >  <Card>

        <form onSubmit={hadlesubmit}>
      
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Contact Customer Support</Typography>
          <Typography level="body-sm">
          Describe the problem you’re experiencing so we can assist you effectively.
          </Typography>
        </Box>
        <Divider />

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
        >
          <Stack direction="column" spacing={1}>
           

       
          </Stack>

          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
               
              
                {/* <Input size="sm" value={firstname} placeholder={session?.user?.firstname}   onChange={(e) => setFirstname(e.target.value)} />
                <Input size="sm" value={lastname} placeholder={session?.user?.lastname} onChange={(e) => setLastname(e.target.value)} sx={{ flexGrow: 1 }} /> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>

            <FormControl sx={{ flexGrow: 1 }}>
                 <FormLabel> Email</FormLabel>
                 <Input
                   name='email'
                   size="sm"
                   startDecorator={<EmailRoundedIcon />}
                  //  value={session?.user?.email}
                   sx={{ flexGrow: 1 }}
                   disabled
                 />
              </FormControl>
               
               <FormControl sx={{ flexGrow: 1 }}>
                 <FormLabel> Mobile</FormLabel>
                 <Input
                   name='mobile'
                   size="sm"
                   value={mobile}
                   sx={{ flexGrow: 1 }}
                     onChange={(e) => setMobile(e.target.value)}
                 />
              </FormControl>
              
              
            </Stack>
            
          </Stack>
        </Stack>

        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Issue Details</Typography>
          <Typography level="body-sm">
          Please provide a detailed description of the issue you are experiencing.
          </Typography>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>
          <Textarea
            size="sm"
            value={bio}
            minRows={4}
            sx={{ mt: 1.5 }}
            // placeholder={session?.user?.bio}
            onChange={(e) => setbio(e.target.value)}
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
            275 characters left
          </FormHelperText>

          <form action="">
      
        <Box sx={{ mb: 1 }}>
            
            <Typography level="body-sm">
              Add Attachment
            </Typography>
          </Box>
         

          <Box>
          <Buttons
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      onChange={handleFileChange}
      startIcon={<CloudUploadIcon />}
      >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Buttons>
          </Box>
      

    
   {selectedFile && (
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Typography>
                {(selectedFile as File)?.name}
            </Typography>
            <Button size="sm" variant="outlined" color="neutral" onClick={cancelfile}>
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>
          
   )}
      
      </form>
         
        </Stack>        
      
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-center', pt: 2 }}>
           
            <Button size="sm" variant="solid" type='submit'>
              Send
            </Button>
          </CardActions>
        </CardOverflow>

    </form>    
        
      </Card>

      </Stack>
 </Box>
      
    </>
    
  )
}

export default UserProfile
