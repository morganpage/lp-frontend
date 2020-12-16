import { Box, FormControl, Input, Button, Flex, Heading, Text, Checkbox, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Image from "./image";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const EmailFormNetlify = ({ emailform }) => {
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
      })
      .catch((error) => alert(error));

    e.preventDefault();
    e.target.reset();
  };

  return (
    <Box bg="white" rounded="lg" boxShadow="md" p={8} m={4}>
      <Heading as="h2" size="lg">
        {emailform.title || "Subscribe to our newsletter"}{" "}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} name="contact" data-netlify="true">
        <VStack>
          <Flex py={4} align="center">
            <Image image={emailform.image} style={{ width:"200px", paddingRight: "10px" }} />
            <FormControl isRequired py={2} align="left">
              <Input name="name" placeholder="Your name" ref={register} />
              <Input type="email" name="email" placeholder="Your email" mt={2} ref={register} />
              {emailform.checkboxText && <Flex fontSize="xs" pt={2} alignItems="flex-start">
                <Checkbox pt={1} colorScheme={emailform.colorScheme || "teal"} defaultIsChecked></Checkbox>
                <Text pl={2}>{emailform.checkboxText}</Text>
              </Flex>}
            </FormControl>
          </Flex>
          <Button colorScheme={emailform.colorScheme || "teal"} size="lg" fontSize="xl" fontWeight="bold" type="submit">
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
