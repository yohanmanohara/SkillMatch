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

import OtpFroget from '@/components/froms/otpfroget';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}




export default function JoySignInSideTemplate() {

const [email, setEmail] = useState("");
const [issentotp, setissentotp] = useState(false);
const [loading, setLoading] = React.useState(false);

const haddlesubmit = async (e:any) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/otpfroget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();
      sessionStorage.setItem("email",result.email);

      if (response.ok) {
        // toast({
        //   title: "OTP Sent",
        //   description: "An OTP has been sent to your email.",
        // });
        console.log("otp sent");
        setissentotp(true);
       
      } else {
        // toast({
        //   title: "Error",
        //   description: result.message || "Failed to send OTP.",
        // });
        alert(result.message);
        console.log("erro",result.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while sending OTP:", error);
    //   toast({
    //     title: "Error",
    //     description: "An unexpected error occurred.",
    //   });
      setLoading(false);
    }
  }

 






  return (
    <>
     { issentotp ? (
       <OtpFroget setIsSentOtp={setissentotp} setLoadings={setLoading} />
      ) : (
    
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
             
              <FormControl >
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              </FormControl>
             
              <Stack gap={4} sx={{ mt: 2 }}>
               
                <Button type="submit"  fullWidth disabled={loading}>
                {loading? "Processing..." : "Send Otp"}
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
  )
}

   
    </>
 
  );

}

