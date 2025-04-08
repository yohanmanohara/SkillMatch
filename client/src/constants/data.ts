import { NavItemadmin, NavItem, } from '@/types';
import { on } from 'events';

export type User = {
  userPicUrl: string | undefined;
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
};


export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItemadmin: NavItemadmin[] = [
  {
    title: 'Overview',
    href: '/admin/overview',
    icon: 'dashboard',
    label: 'Overview'
  },
  {
    title: 'User',
    href: '/admin/user',
    icon: 'user',
    label: 'User'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: 'user',
    label: 'Settings'
  },

 

];

export const navItem: NavItem[] = [//customer view
  {
    title: 'Overview',
    href: '/employee/overview',
    icon: 'dashboard',
    label: 'overview'
  },
 

 

  {
    title: 'Interviews',
    href: '/employee/interviews',
    icon: 'spinner',
    label: 'profile'
  },
  {
    title: 'Jobs',
    href: '/jobs',
    icon: 'spinner',
    label: 'profile'
  },
  {
    title: 'Support',
    href: '/employee/support',
    icon: 'media',
    label: 'profile'
  },
  {
    title: 'Recomanded jobs',
    href: '/employee/recomandadjobs',
    icon: 'profile',
    label: 'profile'
  },

  {
    title: 'Settings',
    href: '/employee/settings',
    icon: 'car',
    label: 'settings'
  },
 

  
];


export const navItemempy: NavItem[] = [//employer view
  {
    title: 'overview',
    href: '/employer/overview',
    icon: 'dashboard',
    label: 'overview'
  },
 
  
  {

    title: 'Jobs',
    href: '/employer/hiring/jobs',
    icon: 'post',
    label: 'profile'
  },
  {
    title: 'Candidates',
    href: '/employer/hiring/candidates',
    icon: 'post',
    label: 'profile'

  },


  {
    title: 'Interviews',
    href: '/employer/interview',
    icon: 'post',
    label: 'profile'
  },
  {
    title: 'Manage',
    href: '/employer/manage',
    icon: 'employee',
    label: 'profile'
  },
  {
    title: 'Support',
    href: '/employer/support',
    icon: 'spinner',
    label: 'profile'
  },
 

  {
    title: 'Settings',
    href: '/employer/settings',
    icon: 'profile',
    label: 'settings'
  },
 

  
];


