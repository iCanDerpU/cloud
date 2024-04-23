import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import Interface from "./components/Interface";
import '@aws-amplify/ui-react/styles.css';
import { ChakraProvider } from "@chakra-ui/react";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_YTBdRuBxB",
      userPoolClientId: "1jk6gje7vnpkvvhg6t9344aruu"
    }
  }
})

function App() {

  return (
    <ChakraProvider resetCSS>
      <Authenticator
        hideSignUp={true}
      >
        {({ signOut }) => (
          <Interface signOut={signOut} />
        )}
      </Authenticator>
    </ChakraProvider>
  )
}

export default App
