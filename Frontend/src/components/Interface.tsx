import { Button, Flex, HStack, Image, Input, Text, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const API_URL = "https://op62088iil.execute-api.us-east-1.amazonaws.com/vkloud-prod";

export default function Interface({ signOut }: { signOut: (data?: object) => void }) {
    const [images, setImages] = useState<string[]>([]);
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const toast = useToast({
        position: "bottom-right",
        variant: "solid",
        status: "info",
        description: "Your image is being uploaded...",
        isClosable: false
    })

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

                    toast();

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

                <Button colorScheme="red" float="right" onClick={() => signOut()}>
                    Sign Out
                </Button>
            </HStack>

            <HStack wrap="wrap" mt={5}>
                {images.map((imgSrc, index) => <Image maxWidth="300px" key={`img-${imgSrc}-${index}`} src={imgSrc} border="2px solid blue" rounded="md" />)}
            </HStack>
        </Flex>
    )
}
