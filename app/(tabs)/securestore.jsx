import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const SecureExample = () => {
  const [tempData, setTempData] = useState("");
  const [data, setData] = useState("");
  const [SecureData, setSecureData] = useState("");

  const saveSecureData = async () => {
    try {
      await SecureStore.setItem("userData", data);
      setTempData(data);
      Alert.alert("Guardado", "Dato guardado.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  const loadSecureData = async () => {
    try {
      const value = await SecureStore.getItem("userData");
      if (value !== null) {
        setSecureData(value);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el nombre.");
    }
  };

  const clearSecureData = async () => {
    try {
      await SecureStore.deleteItemAsync("userData");
      setSecureData("");
    }
    catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  useEffect(() => {
    loadSecureData("userData");
    }, []);
  
  

  return (
    <View style>
      <Text>Ingresa datos</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Save Data" onPress={saveSecureData} />
      <Button title="Load Data" onPress={loadSecureData} />
      <Button title="Delete Data" onPress={clearSecureData} />
      {SecureData ? <Text>Saved Data: {SecureData}</Text> : null}
      <Text>Dato Temporal: {tempData}</Text>
    </View>
  )
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      padding: 20,
    },
  });

  export default SecureExample;