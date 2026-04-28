import { ThemedButton } from "@/components/themed-button/themed-button";
import ThemedModal from "@/components/themed-modal/themed-modal";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";

type BookingModalProps = {
  isVisible: boolean;
  seatNumber: number;
  date: string;
  onCreateBooking: () => void;
  onClosePressed: () => void;
};

const BookingModal = ({
  isVisible,
  onCreateBooking,
  onClosePressed,
  seatNumber,
  date,
}: BookingModalProps) => {
  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView>
        <ThemedText style={{ fontSize: 24, textAlign: "center" }}>
          Book Seat
        </ThemedText>
        <ThemedText style={{ textAlign: "center", marginVertical: 12 }}>
          Are you sure you want to book seat {seatNumber} on {date}?
        </ThemedText>
        <ThemedButton
          title="Book Seat"
          onPress={onCreateBooking}
          style={{
            backgroundColor: Colors.green.background,
            borderColor: Colors.green.text,
          }}
        />
        <ThemedButton title="Close" onPress={onClosePressed} />
      </ThemedView>
    </ThemedModal>
  );
};

export default BookingModal;
