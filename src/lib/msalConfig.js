import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "99d54a60-cd09-4c72-b4a5-86cdafa7a275", // Replace with your Azure AD Application (client) ID
    authority: "https://login.microsoftonline.com/7f017d7e-4e37-4ee2-bc42-a665b433dcb4", // Replace with your Tenant ID or common for multi-tenant
    redirectUri: "http://localhost:3000", // Must match your Azure AD app registration
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set to true if you are having issues on IE11 or edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Files.ReadWrite.All", "Sites.ReadWrite.All"],
};

export const msalInstance = new PublicClientApplication(msalConfig);