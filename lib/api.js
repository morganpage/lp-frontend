function removeTrailingSlashes(url) {
  return url.replace(/\/+$/, ''); //Removes one or more trailing slashes from URL
}

export function getStrapiURL(path = "") {
  return `${
    removeTrailingSlashes(process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337")
  }${path}`;
}

export function getStrapiMedia(media) {
  if(!media) return "";
  if(!media.url) return "";
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl;
}


// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  if(response.status != 200) return [];
  const data = await response.json();
  return data;
}