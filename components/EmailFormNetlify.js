import { Box, FormControl, Input, Button, Flex, Heading, Text, Checkbox, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Image from "./image";
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const EmailFormNetlify = ({ emailform }) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const router = useRouter();
  const plausible = usePlausible();
  const onSubmit = (data, e) => {
    // console.log(data);
    plausible('subscribe');
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...data }),
    })
      .then(() => {
        toast({
          title: "Subscription Success.",
          description: "You have successfully subscribed to our newsletter.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/subscribed");
      })
      .catch((error) => alert(error));

    e.preventDefault();
    e.target.reset();
  };

  return (
    <Box bg="white" rounded="lg" boxShadow="md" px={8} m={4} border="8px" borderColor="#ff7c2b" borderRadius="12px">
      <form onSubmit={handleSubmit(onSubmit)} name="contact" data-netlify="true">
        <VStack>
          <Flex py={4} align="center">
            <Box w={emailform.image ? "100%" : "auto"}>
            <Image image={emailform.image} style={{ paddingRight: "10px", objectFit:"contain" }} />
            </Box>
            <FormControl isRequired py={2} align="center">
              <Heading mb={2} as="h3" fontSize="2.2em" color={emailform.colorScheme && `${emailform.colorScheme}.600`}>
                {emailform.title || "Subscribe to our newsletter"}{" "}
              </Heading>
              <Heading mb={4} as="h3" fontSize="1.2em" color={"gray.600"}>
                {emailform.subtitle || "Enter your best email below and I'll send you a FREE Course"}
              </Heading>
              <Heading mb={4} as="h3" fontSize="0.8em" color={"gray.500"}>
                {"Remember to check your spam folder!"}
              </Heading>

              <Input name="name" placeholder="Your name" ref={register} />
              <Input type="email" name="email" placeholder="Your email" mt={2} ref={register} />
              {emailform.checkboxText && (
                <Flex fontSize="xs" pt={2} alignItems="flex-start">
                  <Checkbox pt={1} colorScheme={emailform.colorScheme || "teal"} defaultIsChecked></Checkbox>
                  <Text pl={2}>{emailform.checkboxText}</Text>
                </Flex>
              )}
              <Button mt={8} colorScheme={emailform.colorScheme || "teal"} size="lg" fontSize="xl" fontWeight="bold" type="submit">
                {emailform.buttonText || "Subscribe"}
              </Button>
              <Text fontSize="xs" textAlign="center"  pt={2}>
            {emailform.footerText}
          </Text>
            </FormControl>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default EmailFormNetlify;
