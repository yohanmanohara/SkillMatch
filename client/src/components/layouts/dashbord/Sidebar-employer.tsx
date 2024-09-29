import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import { useRouter } from 'next/navigation';
import ListItems from '@mui/joy/ListItem';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import MailIcon from '@mui/icons-material/Mail';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttributionRoundedIcon from '@mui/icons-material/AttributionRounded';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { AppBar } from '@mui/material';

import { red } from '@mui/material/colors';
import { redirect } from 'next/navigation';
import { useScatterChartProps } from '@mui/x-charts/internals';
import { useSession,signOut } from 'next-auth/react';
import { KeyboardArrowRight } from '@mui/icons-material';
import  Image from 'next/image';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default  function Sidebar() {
  const handleLogout = () => {
    signOut(); 
  
  };
  

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 22,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
     
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' ,justifyContent:"center" }}>
       <Link href={'/'} >
        <Image src="/recruitwise.png" alt="" width={150} height={100} />
        </Link>
       
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >


        <List
          size="sm"
          sx={{
            
            '--List-nestedInsetStart': '3px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >




         <ListItems nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Hiring</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>

              {['Jobs','Candidates'].map((text, index) => (
            <Link href={`/employer/hiring/${text.toLowerCase()}`} key={text}>
           
  
          
           <ListItem key={text} disablePadding sx={{ display: 'block',pl:'40px' }}>

            <ListItemText primary={text}  />
               
             
           </ListItem> 

         
          

      
           </Link>
           ))}
           
              </List>
            </Toggler>
          </ListItems>

          {['Overview','Headhunting','Interviews','Manage','Notification'].map((text, index) => (
            <Link href={`/employer/${text.toLowerCase()}`} key={text}>
           
  
          
           <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>

            <ListItemIcon
                     sx={{
                       minWidth: 0,
                       
                       justifyContent: 'center',
                     }}
                   >
                 
                     {index % 2 === 0 ? <AttributionRoundedIcon /> : <MailIcon />}
                 
                 
                   </ListItemIcon>              
              <ListItemText primary={text}  />


            </ListItemButton>
          </ListItem> 

         
          

      
            </Link>
          ))}






        <Link href="/employee/overview" passHref>
          <Button endDecorator={<KeyboardArrowRight />} color="success">
            Employee View
          </Button>
         </Link>

        </List>


      

        <ListItems nested>
            <Toggler 
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)} sx={{paddingLeft:'8px'}}>
                  <AssignmentRoundedIcon/>
                  <ListItemContent>
                    <Typography level="title-sm">Settings</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>

              {['Billing','Colaberation','General','Profile'].map((text, index) => (
            <Link href={`/employer/settings/${text.toLowerCase()}`} key={text}>
           
  
          
           <ListItem key={text} disablePadding sx={{ display: 'block',pl:'40px' }}>

            <ListItemText primary={text}  />
               
             
           </ListItem> 

         
          

      
           </Link>
           ))}
           
              </List>
            </Toggler>
          </ListItems>


      

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >

      {['Support'].map((text, index) => (
            <Link href={`/employer/${text.toLowerCase()}`} key={text}>
          
           <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          

           <ListItemButton>

         <ListItemIcon
         sx={{
           minWidth: 0,
           
           justifyContent: 'center',
         }}
       >
     
         {index % 2 === 0 ?  <SettingsRoundedIcon /> :  <SupportRoundedIcon />}
     
     
       </ListItemIcon>              
     <ListItemText primary={text}  />


    </ListItemButton>
          </ListItem>
          </Link>
          ))}
        </List>


        
      </Box>



      <Divider />



      {/* dfweasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/* <Avatar
      variant="outlined"
      size="lg"
      src={im }
      alt="Profile Picture"
    /> */}
        {/* <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{session?.user?.name}</Typography>
        </Box> */}
        
        <IconButton variant="plain" color="neutral" onClick={handleLogout} >
      <LogoutRoundedIcon />
    </IconButton>
      </Box>



    </Sheet>
  );
}