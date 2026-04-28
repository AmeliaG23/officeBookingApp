import { ThemedButton } from "@/components/themed-button/themed-button";
import ThemedModal from "@/components/themed-modal/themed-modal";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet, useColorScheme } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    marginVertical: 12,
  },
});

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
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView>
        <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
          Book Seat
        </ThemedText>
        <ThemedText style={[styles.message, { color: theme.textPrimary }]}>
          Are you sure you want to book seat {seatNumber} on {date}?
        </ThemedText>
        <ThemedButton
          title="Book Seat"
          onPress={onCreateBooking}
          style={{
            backgroundColor: theme.statusSuccess,
            borderColor: theme.statusSuccess,
          }}
        />
        <ThemedButton title="Close" onPress={onClosePressed} />
      </ThemedView>
    </ThemedModal>
  );
};

export default BookingModal;
