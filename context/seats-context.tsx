import { databases } from "@/lib/appwrite";
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Models } from "react-native-appwrite";

const DATABASE_ID = "69ef5c350011864d4b73";
const COLLECTION_ID = "seats";

type SeatDocument = Models.Document & {
  floorNumber?: number | string;
  teamArea?: string;
  seatNumber?: number | string;
};

type SeatsContextValue = {
  seats: SeatDocument[];
  fetchSeats: () => Promise<void>;
};

export const SeatsContext = createContext<SeatsContextValue | null>(null);

export function SeatsProvider({ children }: { children: any }) {
  const [seats, setSeats] = useState<SeatDocument[]>([]);

  const fetchSeats = useCallback(async () => {
    try {
      const response = await databases.listDocuments<SeatDocument>({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
      });
      setSeats(response.documents);
    } catch (error) {
      console.log("Error fetching seats -", error);
    }
  }, []);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  const value = useMemo(() => ({ seats, fetchSeats }), [seats, fetchSeats]);

  return (
    <SeatsContext.Provider value={value}>{children}</SeatsContext.Provider>
  );
}
