import { Box, FormControl, Input, Button, Flex, Heading, Text, Checkbox, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Image from "./image";
import marked from "marked";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const EmailFormNetlify = ({ emailform, hideShadow ,onSuccess}) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const onSubmit = (data, e) => {
    // console.log(data);
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
        if(onSuccess) onSuccess();
      })
      .catch((error) => alert(error));

    e.preventDefault();
    e.target.reset();
  };

  return (
    <Box bg="white" rounded="lg" boxShadow={!hideShadow && "md"} p={6} m={4}>
      <form onSubmit={handleSubmit(onSubmit)} name="contact" data-netlify="true">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(emailform.description) }}></div>
        <VStack>
          <Flex py={0} align="flex-start" >
            <Box w={emailform.image ? "50%" : "auto"}>
              <Image image={emailform.image} style={{  paddingRight: "10px", objectFit: "contain" }} />
            </Box>
            <FormControl isRequired py={2} align1="center" >
              {emailform.title && (
                <Heading mb={8} as="h3" fontSize="1.4em" color={emailform.colorScheme && `${emailform.colorScheme}.600`}>
                  {emailform.title}
                </Heading>
              )}
              <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(emailform.subdescription) }}></div>
              <Input name="name" placeholder="Your name" ref={register} />
              <Input type="email" name="email" placeholder="Your email" mt={2} ref={register} />
              {emailform.checkboxText && (
                <Flex fontSize="xs" pt={2} alignItems="flex-start">
                  <Checkbox pt={1} colorScheme={emailform.colorScheme || "teal"} defaultIsChecked></Checkbox>
                  <Text align="left" pl={2}>
                    {emailform.checkboxText}
                  </Text>
                </Flex>
              )}
              {/* <Button mt={8} colorScheme={emailform.colorScheme || "teal"} size="lg" fontSize="xl" fontWeight="bold" type="submit">
                {emailform.buttonText || "Subscribe"}
              </Button> */}
            </FormControl>
          </Flex>
          <Button w="100%" mt={8} colorScheme={emailform.colorScheme || "teal"} size="lg" fontSize={{base:"3vw",lg:"xl"}} fontWeight="bold" type="submit">
            {emailform.buttonText || "Subscribe"}
          </Button>
          <Text fontSize="xs" textAlign="left" pt={4}>
            {emailform.footerText}
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default EmailFormNetlify;
