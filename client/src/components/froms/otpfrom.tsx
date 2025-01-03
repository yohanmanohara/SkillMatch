
'use client'
import * as React from 'react';
import { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from '@/components/Icons/GoogleIcon';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {useRouter} from 'next/navigation';
import { OtherHouses } from '@mui/icons-material';

import { useEffect } from 'react';

interface OtpFormProps {
    setIsSentOtp: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadings:React.Dispatch<React.SetStateAction<boolean>>;
}



const OtpFroget: React.FC<OtpFormProps> = ({ setIsSentOtp,setLoadings }) => {
const [loading, setLoading] = React.useState(false);
const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
      
      if (typeof window !== 'undefined') {
        const storedEmail = sessionStorage.getItem('email');
        setEmail(storedEmail);
      }
    }, []);


const [otps, setotps] = useState('');

const haddlesubmit = async (e:any) => {
    setLoading(true);
    e.preventDefault();
    if (!email) {
        alert('email not found');
        setLoading(false);
      }
     if(!otps){
        alert('otp is required');
        setLoading(false);
     }  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/verifyotp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otps,
          }),
        });
        
          
        const result = await response.json();
  
        if (response.ok) {
        window.location.href = result.redirectUrl;
        sessionStorage.removeItem("email");
       
        
        } else {
          console.log(result);
            alert('otp verification failed');
            setLoading(false);
           
        //   toast({
        //     title: "OTP Verification Failed",
        //     description: result.message || "An error occurred during OTP verification.",
        //   });
        }
      } catch (error) {
        alert('An unexpected error occurred');
        sessionStorage.removeItem("email");
        setIsSentOtp(false);   
        setLoading(false);
        // toast({
        //   title: "Verification Error",
        //   description: "An unexpected error occurred.",
        // });
      }


    }

const router =useRouter();



  return (
    <div>
       <div className=' flex justify-center items-center'>
    <Box
      sx={(theme) => ({
        width: { xs: '100%', md: '50vw' },
        transition: 'width var(--Transition-duration)',
        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255 255 255 / 0.2)',
        [theme.getColorSchemeSelector('dark')]: {
          backgroundColor: 'rgba(19 19 24 / 0.4)',
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          width: '100%',
          px: 2,
        }}
      >
        <Box
          component="header"
          sx={{
            py: 3,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
        
       
        </Box>
        <Box
          component="main"
          sx={{
            my: 'auto',
            py: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
            [`& .MuiFormLabel-asterisk`]: {
              visibility: 'hidden',
            },
          }}
        >
         

         
          <Stack gap={4} sx={{ mt: 2 }}>
            <form onSubmit={haddlesubmit} >
            <Typography level="body-md" textAlign="center">
             Plz check your email for OTP
              </Typography>
              <FormControl >
                <FormLabel>OTP</FormLabel>
                <Input type='text'  value={otps} onChange={(e)=>setotps(e.target.value)} />
              </FormControl>
             
              <Stack gap={4} direction="row">
                        <Button type="submit" fullWidth disabled={loading}>
                          {loading? "Processing..." : "Submit"}
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => {setIsSentOtp(false) 
                              router.refresh();
                              setLoadings(false)
                          }
                                     } // Setting false to cancel OTP state
                          fullWidth
                          sx={{
                            backgroundColor: 'red', 
                            '&:hover': {
                              backgroundColor: 'darkred', 
                            },
                          }} 
                        >
                          Cancel
                        </Button>
                      </Stack>


            </form>
          </Stack>
          <Typography className=" w-fit p-5 text-center">
          By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
        <Box component="footer">
          <Typography level="body-xs" textAlign="center">
            © Recruitwise {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
    </div>
    </div>
  )
}

export default OtpFroget;