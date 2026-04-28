import { useUser } from "@/hooks/use-user/use-user";
import { client, databases } from "@/lib/appwrite";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";

const DATABASE_ID = "69ef5c350011864d4b73";
const COLLECTION_ID = "seat_bookings";

type BookingContextValue = {
  name: string;
  seat: string;
  userId: string;
  bookingDate: string;
};

type BookingDocument = Models.Document & BookingContextValue;

type BookingsContextValue = {
  allBookings: BookingDocument[];
  userBookings: BookingDocument[];
  fetchAllBookings: () => Promise<void>;
  fetchBookingsbyUserID: (userId: string) => Promise<void>;
  fetchBookingById: (bookingId: string) => Promise<BookingDocument | undefined>;
  deleteBooking: (bookingId: string) => Promise<void>;
  createBooking: (bookingData: BookingContextValue) => Promise<void>;
};

export const BookingsContext = createContext<BookingsContextValue | null>(null);

export function BookingsProvider({ children }: { children: any }) {
  const [allBookings, setAllBookings] = useState<BookingDocument[]>([]);
  const [userBookings, setUserBookings] = useState<BookingDocument[]>([]);
  const { user } = useUser();

  const fetchAllBookings = useCallback(async () => {
    try {
      const response = await databases.listDocuments<BookingDocument>({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
      });
      setAllBookings(response.documents);
    } catch (error) {
      console.log("Error fetching bookings -", error);
    }
  }, []);

  const fetchBookingsbyUserID = useCallback(async (userId: string) => {
    try {
      const response = await databases.listDocuments<BookingDocument>({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        queries: [Query.equal("userId", userId)],
      });

      setUserBookings(response.documents);
    } catch (error) {
      console.log("Error fetching bookings by user ID -", error);
    }
  }, []);

  const fetchBookingById = useCallback(async (bookingId: string) => {
    try {
      const response = await databases.getDocument<BookingDocument>({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: bookingId,
      });

      return response;
    } catch (error) {
      console.log("Error fetching booking by ID -", error);
    }
  }, []);

  const deleteBooking = useCallback(async (bookingId: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, bookingId);
    } catch (error) {
      console.log("Error deleting booking -", error);
    }
  }, []);

  const createBooking = useCallback(
    async (bookingData: BookingContextValue) => {
      try {
        if (!user?.$id) {
          console.log("User ID is required to create a booking");
          return;
        }
        await databases.createDocument({
          databaseId: DATABASE_ID,
          collectionId: COLLECTION_ID,
          documentId: ID.unique(),
          data: { ...bookingData },
          permissions: [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ],
        });
        await Promise.all([fetchBookingsbyUserID(user.$id)]);
      } catch (error) {
        console.log("Error creating booking -", error);
      }
    },
    [fetchBookingsbyUserID, user?.$id],
  );

  useEffect(() => {
    let unsubscribe: () => void;
    // subscribing to this channel as a listener
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchAllBookings();

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;
        const bookingPayload = payload as BookingDocument;

        if (events[0].includes("create")) {
          setAllBookings((prevAllBookings) => [
            ...prevAllBookings,
            bookingPayload,
          ]);
        }

        if (events[0].includes("delete")) {
          setAllBookings((prevAllBookings) =>
            prevAllBookings.filter(
              (booking) => booking.$id !== bookingPayload.$id,
            ),
          );
        }
      });
    } else {
      setAllBookings([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [fetchAllBookings, user]);

  useEffect(() => {
    if (user) {
      fetchBookingsbyUserID(user.$id);
    } else {
      setUserBookings([]);
    }
  }, [fetchBookingsbyUserID, user]);

  const value = useMemo(
    () => ({
      allBookings,
      userBookings,
      fetchAllBookings,
      fetchBookingsbyUserID,
      fetchBookingById,
      deleteBooking,
      createBooking,
    }),
    [
      allBookings,
      userBookings,
      fetchAllBookings,
      fetchBookingsbyUserID,
      fetchBookingById,
      deleteBooking,
      createBooking,
    ],
  );

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
}
