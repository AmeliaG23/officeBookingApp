import { databases } from "@/lib/appwrite";
import { createContext, useState } from "react";
import { Models } from "react-native-appwrite";

const DATABASE_ID = "69eb3d9d00273c779c85";
const COLLECTION_ID = "seats";

type SeatsContextValue = {
  seats: SeatDocument[];
  fetchSeats: () => Promise<void>;
};

type SeatDocument = Models.Document & {
  floor_number?: number | string;
  team_area?: string;
  seat_number?: number | string;
};

export const SeatsContext = createContext<SeatsContextValue | null>(null);

export function SeatsProvider({ children }: { children: any }) {
  const [seats, setSeats] = useState<SeatDocument[]>([]);

  async function fetchSeats() {
    try {
      const response = await databases.listDocuments<SeatDocument>({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
      });

      setSeats(response.documents);
    } catch (error) {
      console.log("Error fetching seats -", error);
    }
  }

  return (
    <SeatsContext.Provider
      value={{
        seats,
        fetchSeats,
      }}
    >
      {children}
    </SeatsContext.Provider>
  );
}
