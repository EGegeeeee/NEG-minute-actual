import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
} from "react-native-vision-camera";

export default function PPGCamera() {
  const [hasPermission, setHasPermission] =
    useState(false);

  const device = useCameraDevice("back");

  useEffect(() => {
    async function getPermission() {
      const permission =
        await Camera.requestCameraPermission();

      setHasPermission(
        permission === "granted"
      );
    }

    getPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading camera...</Text>
      </View>
    );
  }
  return (
    <Camera
      style={{ flex: 1 }}
      device={device}
      isActive={true}
      enableZoomGesture={false}
      torch="on"
      photo={true}
    />
  );
}