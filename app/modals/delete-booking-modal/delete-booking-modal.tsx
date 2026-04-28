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
    marginTop: 12,
  },
  message: {
    textAlign: "center",
    marginVertical: 12,
  },
});

type DeleteBookingModalProps = {
  isVisible: boolean;
  seatNumber: number;
  date: string;
  onClosePressed: () => void;
  onDeletePressed: () => void;
};

const DeleteBookingModal = ({
  isVisible,
  onClosePressed,
  onDeletePressed,
  seatNumber,
  date,
}: DeleteBookingModalProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView>
        <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
          Delete Booking
        </ThemedText>
        <ThemedText style={[styles.message, { color: theme.textPrimary }]}>
          If you delete this booking for seat {seatNumber} on {date}, the seat
          will become available for other users to book.
        </ThemedText>
        <ThemedButton
          title="Delete Booking"
          onPress={onDeletePressed}
          style={{
            backgroundColor: theme.statusDanger,
            borderColor: theme.statusDanger,
          }}
        />
        <ThemedButton title="Close" onPress={onClosePressed} />
      </ThemedView>
    </ThemedModal>
  );
};

export default DeleteBookingModal;
