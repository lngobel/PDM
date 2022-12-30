import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {UserContext} from '../context/UserProvider';

const Mapa = () => {
  const [mapType, setMapType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {users} = useContext(UserContext);

  useEffect(() => {
    let m = [];
    users.map(u => {
      m.push({
        key: u.uid,
        coords: {
          latitude: Number(u.latitude),
          longitude: Number(u.longitude),
        },
        title: u.nome,
        description: `${u.email}`,
        image: require('../assets/images/minipoint.png'),
      });
    });
    setMarkers(m);
    console.log(m);
  }, [users]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map(marker => {
          console.log(marker);
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              draggable
              image={marker.image}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default Mapa;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
