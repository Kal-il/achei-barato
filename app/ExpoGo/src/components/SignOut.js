import React from 'react';
import { Button } from 'react-native';
import { GoogleManager } from './GoogleSignIn';

export const SignOutButton = () => {
  const { signOut } = GoogleManager();

  return (
    <Button
      onPress={signOut}
      title="LogOut"
      color="red"
    />
  );
};

export default SignOutButton;