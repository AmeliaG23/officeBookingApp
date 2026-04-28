import CheckedInModal from "@/app/modals/checked-in-modal/checked-in-modal";
import { ThemedView } from "@/components/themed-view/themed-view";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

const CheckInScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCheckInModalVisible, setCheckInModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const onBarCodeScanned = () => {
    setCheckInModalVisible(true);
  };

  const onCloseCheckInModal = () => {
    setCheckInModalVisible(false);
    router.replace("/(tabs)/home-screen/home-screen");
  };

  return (
    <>
      <ThemedView>
        {Platform.OS === "android" ? <StatusBar hidden /> : null}
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={onBarCodeScanned}
        />
      </ThemedView>
      <CheckedInModal
        isVisible={isCheckInModalVisible}
        onClose={onCloseCheckInModal}
      />
    </>
  );
};

export default CheckInScreen;
