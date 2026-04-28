import { Account, Avatars, Client, Databases } from "react-native-appwrite";

const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";

export const client = new Client()
  .setProject("69ef5b1c001970819cb6")
  .setEndpoint(APPWRITE_ENDPOINT);

// new instance of account class
export const account = new Account(client);

export const avatars = new Avatars(client);

export const databases = new Databases(client);

// export const pingServer = async () => {
//   const response = await fetch(`${APPWRITE_ENDPOINT}/health`);

//   if (!response.ok) {
//     throw new Error(
//       `Appwrite health check failed with status ${response.status}`,
//     );
//   }

//   return response.json();
// };
