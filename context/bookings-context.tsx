import { useUser } from "@/hooks/use-user/use-user";
import { databases } from "@/lib/appwrite";
import { createContext, useState } from "react";
import { ID, Models, Permission, Role } from "react-native-appwrite";

const DATABASE_ID = "69eb3d9d00273c779c85";
const COLLECTION_ID = "bookings";

type BookingDocument = Models.Document & {
  userId?: string;
  bookingDate?: string;
  date?: string;
};

type BookingsContextValue = {
  bookings: BookingDocument[];
  fetchBookings: () => Promise<void>;
  fetchBookingById: (bookingId: string) => Promise<void>;
  updateBooking: (bookingId: string, updatedData: any) => Promise<void>;
  deleteBooking: (bookingId: string) => Promise<void>;
  createBooking: (bookingData: any) => Promise<void>;
};

export const BookingsContext = createContext<BookingsContextValue | null>(null);

export function BookingsProvider({ children }: { children: any }) {
  const [bookings, setBookings] = useState<BookingDocument[]>([]);
  const { user } = useUser();

  async function fetchBookings() {
    try {
      if (!user?.$id) {
        setBookings([]);
        return;
      }

      const response = await databases.listDocuments<BookingDocument>({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
      });

      setBookings(response.documents);
    } catch (error) {
      console.log("Error fetching bookings -", error);
    }
  }

  async function fetchBookingById(bookingId: string) {
    try {
    } catch (error) {
      console.log("Error fetching booking by ID -", error);
    }
  }

  async function updateBooking(bookingId: string, updatedData: any) {
    try {
    } catch (error) {
      console.log("Error updating booking -", error);
    }
  }

  async function deleteBooking(bookingId: string) {
    try {
    } catch (error) {
      console.log("Error deleting booking -", error);
    }
  }

  async function createBooking(bookingData: any) {
    try {
      if (!user?.$id) {
        console.log("User ID is required to create a booking");
        return;
      }
      await databases.createDocument({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: ID.unique(),
        data: { ...bookingData, userId: user.$id },
        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      });
    } catch (error) {
      console.log("Error creating booking -", error);
    }
  }

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        fetchBookings,
        fetchBookingById,
        updateBooking,
        deleteBooking,
        createBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}
