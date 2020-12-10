import { getStrapiMedia } from "../lib/api";
import { Flex, Text } from "@chakra-ui/react";

const Image = ({ image, style, prefix,nocaption }) => {
  if (!image) return null;
  let imageUrl = getStrapiMedia(image);
  //imageUrl = imageUrl.replace(".png", ".jpg");
  if (prefix) {
    let filename = imageUrl.split("/").pop();
    imageUrl = imageUrl.replace(filename, prefix + filename);
  }
  //let filename = imageUrl.split('/').pop();
  //let smallImageUrl = imageUrl.replace(filename,"small_" + filename.replace(".png",".jpg"));

  return (
    <Flex direction="column" style={style}>
      <img src={imageUrl} alt={image.alternativeText || image.name} style={style} />
      <Text textAlign="center" color="gray.500">
        {!nocaption && image?.caption}
      </Text>
    </Flex>
  );
};

export default Image;
