"use client";

import Registration from '@/components/registration/registration';
import React from 'react';
import { msalInstance } from "@/lib/msalConfig";
import { MsalProvider } from '@azure/msal-react';

export default function RegistrationForm() {
  return (
    <div>
      <MsalProvider instance={msalInstance}>
        <Registration />
      </MsalProvider>
    </div>
  );
}





