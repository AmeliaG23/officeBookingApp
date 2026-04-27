import { ThemedButton } from "@/components/themed-button/themed-button";
import ThemedModal from "@/components/themed-modal/themed-modal";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";

type CheckedInModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function CheckedInModal({
  isVisible,
  onClose,
}: CheckedInModalProps) {
  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView>
        <ThemedText style={{ fontSize: 24, textAlign: "center" }}>
          Checked In!
        </ThemedText>
        <ThemedButton title="Close" onPress={onClose} />
      </ThemedView>
    </ThemedModal>
  );
}
