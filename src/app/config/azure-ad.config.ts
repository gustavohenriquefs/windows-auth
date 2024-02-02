import { MsalGuardConfiguration, MsalInterceptorConfiguration } from "@azure/msal-angular";
import { InteractionType, IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { environment } from "../../environments/environment.development";

function getUserAgent(req: { headers: { [x: string]: any; }; }): string {
  return req.headers['user-agent'] || '';
}

function isInternetExplorer(userAgent: string): boolean {
  return userAgent.indexOf('MSIE ') > -1 || userAgent.indexOf('Trident/') > -1;
}

const req = { 
  headers: { 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
  } 
};

const userAgent = getUserAgent(req);
const isIE = isInternetExplorer(userAgent);

const msalGuardConfiguration: MsalGuardConfiguration = {
  interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup,
  authRequest: {
    scopes: ['user.read']
  }
};

const msalInterceptorConfiguration: MsalInterceptorConfiguration = {
  interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup,
  protectedResourceMap: new Map([
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  ])
};

const publicClientApp: IPublicClientApplication = new PublicClientApplication({
  auth: {
    clientId: environment.azureAd.clientId,
    authority: environment.azureAd.instance + environment.azureAd.tenantId,
    redirectUri: environment.azureAd.url + environment.azureAd.callbackPath,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
});

export const msalModuleConfig = {
  publicClientApp, 
  msalGuardConfiguration, 
  msalInterceptorConfiguration
};