import { NavItemadmin, NavItem } from '@/types';
import { on } from 'events';

export type User = {
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
    title: 'Dashboard',
    href: '/admin/overview',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/admin/user',
    icon: 'user',
    label: 'user'
  },

 

];

export const navItem: NavItem[] = [//customer view
  {
    title: 'overview',
    href: '/customer/overview',
    icon: 'dashboard',
    label: 'Dashboard'
  },
 

  {
    title: 'Profile',
    href: '/customer/profile',
    icon: 'profile',
    label: 'profile'
  },

  {
    title: 'Vehicles',
    href: '/customer/vehicles',
    icon: 'car',
    label: 'profile'
  },
 

  
];


