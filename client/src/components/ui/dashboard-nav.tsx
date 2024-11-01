'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function   DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-5">
      <TooltipProvider>
        <Accordion type="single" collapsible>

          
          {items.map((item, index) => {
            const Icon = Icons[item.icon || 'arrowRight'];
            const isAccordionItem = item.subItems && item.subItems.length > 0;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  {isAccordionItem ? (
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>
                        <div
                          className={cn(
                            'flex items-center gap-4 overflow-hidden rounded-md py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                            path === item.href ? 'bg-accent' : 'transparent',
                            item.disabled && 'cursor-not-allowed opacity-80'
                          )}
                          onClick={() => {
                            if (setOpen) setOpen(false);
                          }}
                        >
                          <Icon className={`ml-3 size-5 flex-none`} />
                          {isMobileNav || (!isMinimized && !isMobileNav) ? (
                            <span className="mr-2 truncate">{item.title}</span>
                          ) : (
                            ''
                          )}
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent>

                        <div className="pl-4 ">
                          {item.subItems?.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.disabled || !subItem.href ? '/' : subItem.href}
                              className={cn(
                                'block py-1 text-sm hover:bg-accent hover:text-accent-foreground',
                                subItem.disabled && 'cursor-not-allowed opacity-80'
                              )}
                            >
                             
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    
                  ) : (

                    //not the arro down omes
                    <Link
                      href={item.disabled || !item.href ? '/' : item.href}
                      className={cn(
                        'flex items-center gap-4 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        path === item.href ? 'bg-accent' : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                    >
                      <Icon className={`ml-3 size-5 flex-none`} />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </Accordion>
      </TooltipProvider>
    </nav>
  );
}
