import { useState } from "react";
import { Modal } from "react-native";

type DialogType = "error" | "success" | "info";

export const useDialogToDisplay = (dialog: DialogType) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);


  return (
    <Modal
      visible={isDialogVisible}
    >
      {dialogContent}
    </Modal>
  );
};