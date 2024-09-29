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
import Image from 'next/image';






function Company() {
    const {data:session} = useSession();
    const [firstname, setFirstname] = React.useState('');
    const [lastname,setLastname]=React.useState('');
    const [role,setrole]=React.useState('');
    const [bio,setbio]=React.useState('');
    const [secoundemail,setsecoundemail]=React.useState('');
    const email = session?.user?.email;
    
  return (
    <div>
        <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      > 
        <form >
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Company info</Typography>
          <Typography level="body-sm">
            Customize how your profile information will appear to the networks.
          </Typography>
        </Box>
        <Divider />

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
        >
          <Stack direction="column" spacing={1}>
            <AspectRatio
              ratio="1"
              maxHeight={200}
              sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
            >
              <Image src={session?.user?.image} alt="Profile Picture" height={100} width={100} />
              </AspectRatio>
            <IconButton
              aria-label="upload new picture"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{
                bgcolor: 'background.body',
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                left: 100,
                top: 170,
                boxShadow: 'sm',
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
               
              
                <Input size="sm" value={firstname} placeholder={session?.user?.firstname}   onChange={(e) => setFirstname(e.target.value)} />
                <Input size="sm" value={lastname} placeholder={session?.user?.lastname} onChange={(e) => setLastname(e.target.value)} sx={{ flexGrow: 1 }} />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input size="sm" value={role} placeholder={session?.user?.role} onChange={(e) => setrole(e.target.value)}   />
              </FormControl>
              
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Secoundary Email</FormLabel>
                <Input
                  size="sm"
                  name='secoundemail'
                  value={secoundemail}
                  startDecorator={<EmailRoundedIcon />}
                  placeholder={session?.user?.secoundemail || "Enter your secoundary "}
                  onChange={(e) => setsecoundemail(e.target.value)} 
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
              
            </Stack>
            <FormControl sx={{ flexGrow: 1 }}>
                 <FormLabel>Current Email</FormLabel>
                 <Input
                   name='email'
                   size="sm"
                   startDecorator={<EmailRoundedIcon />}
                   value={session?.user?.email}
                   sx={{ flexGrow: 1 }}
                   disabled
                 />
              </FormControl>
          </Stack>
        </Stack>

        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Bio</Typography>
          <Typography level="body-sm">
            Write a short introduction to be displayed on your profile
          </Typography>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>
          <Textarea
            size="sm"
            value={bio}
            minRows={4}
            sx={{ mt: 1.5 }}
            placeholder={session?.user?.bio}
            onChange={(e) => setbio(e.target.value)}
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
            275 characters left
          </FormHelperText>
        </Stack>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral" >
              Cancel
            </Button>
            <Button size="sm" variant="solid" type='submit'>
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </form>
      
        







        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Portfolio projects</Typography>
            <Typography level="body-sm">
              Share a few snippets of your work.
            </Typography>
          </Box>
          <Divider />
      
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>

      
    </div>
  )
}

export default Company
