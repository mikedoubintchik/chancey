import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.chancey.app',
  appName: 'Chancey',
  webDir: 'build',
  bundledWebRuntime: false,
  // plugins: {
  //   SplashScreen: {
  //     launchShowDuration: 0,
  //   },
  //   GoogleAuth: {
  //     scopes: ['profile', 'email'],
  //     serverClientId: '',
  //     forceCodeForRefreshToken: true,
  //   },
  // },
};

export default config;
