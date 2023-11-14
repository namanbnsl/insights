'use client';

import { CreateClassModal } from '@/components/modals/create-class-modal';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <CreateClassModal />

      {props.children}
      <Toaster />
    </SessionProvider>
  );
};

export default Providers;
