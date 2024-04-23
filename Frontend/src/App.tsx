import { Button, ChakraProvider, Flex, HStack, Image, Input, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react"

const API_URL = "https://op62088iil.execute-api.us-east-1.amazonaws.com/vkloud-prod";

function App() {
  const [images, setImages] = useState<string[]>([]);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    axios.get(API_URL + "/fetch").then(res => {
      if (res.status === 200) {
        if (res.data.errorType) return;
        setImages(res.data);
      } else {
        console.error("Could not fetch cloud files.");
      }
    })
  }, [])

  return (
    <ChakraProvider resetCSS>
      <Flex
        minH="100vh"
        minW="100vw"
        backgroundColor="gray.800"
        direction="column"
        padding="5"
        color="white"
      >
        <Input type="file" display="none" ref={uploadInputRef} onChange={(e) => {
          const reader = new FileReader();

          if (e.target.files === null) return;

          reader.onload = function () {
            if (reader.result === null) return;
            const base64String = (reader.result as string).replace("data:", "")
              .replace(/^.+,/, "");

            axios.post(API_URL + "/upload", {
              file: base64String
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            }).then(() => {
              console.log("Uploaded!")
              location.reload()
            })
          };

          reader.onerror = function (error) {
            console.log('Error: ', error);
          };

          const file = e.target.files[0];
          if (file) {
            reader.readAsDataURL(file);
          }
        }} />
        <HStack>
          <Button colorScheme="blue" onClick={() => {
            if (uploadInputRef.current !== null) {
              uploadInputRef.current.click();
            }
          }}>
            Upload
          </Button>
          <Text>
            Total Images: {images.length}
          </Text>
        </HStack>

        <HStack wrap="wrap" mt={5}>
          {images.map((imgSrc, index) => <Image key={`img-${imgSrc}-${index}`} src={imgSrc} border="2px solid blue" rounded="md" />)}
        </HStack>
      </Flex>
    </ChakraProvider>
  )
}

export default App
