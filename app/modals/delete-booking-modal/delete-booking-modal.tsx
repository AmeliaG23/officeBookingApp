import { ThemedButton } from "@/components/themed-button/themed-button";
import ThemedModal from "@/components/themed-modal/themed-modal";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";

type DeleteBookingModalProps = {
  isVisible: boolean;
  onClosePressed: () => void;
  onDeletePressed: () => void;
};

const DeleteBookingModal = ({
  isVisible,
  onClosePressed,
  onDeletePressed,
}: DeleteBookingModalProps) => {
  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView>
        <ThemedText style={{ fontSize: 24, textAlign: "center" }}>
          Delete Booking
        </ThemedText>
        <ThemedText style={{ textAlign: "center", marginVertical: 12 }}>
          If you delete this booking, the seat will become available for other
          users to book.
        </ThemedText>
        <ThemedButton
          title="Delete Booking"
          onPress={onDeletePressed}
          style={{
            backgroundColor: Colors.red.background,
            borderColor: Colors.red.text,
          }}
        />
        <ThemedButton title="Close" onPress={onClosePressed} />
      </ThemedView>
    </ThemedModal>
  );
};

export default DeleteBookingModal;
