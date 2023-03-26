import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const route = useRoute();

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
          title="travel photo"
        />
      </MapView>
    </View>
  );
};
export default MapScreen;
