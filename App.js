//Pregunta: Depuración de un Componente de React Native con Expo
//Se te proporciona el siguiente componente de React Native que tiene como objetivo obtener y
//mostrar una lista de elementos desde una API. El componente utiliza el flujo de trabajo administrado de Expo.
//Revisa el código a continuación e identifica los varios posibles problemas que podrían llevar a
//fallas, bloqueos o comportamientos ineficientes. Propone optimizaciones o correcciones donde sea necesario.
//
//Instrucciones:
//1. Identifica y describe dichos problemas.
//2. Sugiere modificaciones específicas al código para abordar los problemas identificados.
//3. Explica por qué cada modificación soluciona el problema.

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';

const ItemList = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const PAGE_LIMIT = 4;

  useEffect(() => {
    fetchItems();
  }, [page]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();

      setItems((prevItems) => (prevItems ? [...prevItems, ...data.results] : data.results));
    } catch (error) {
      console.error('Error al obtener los elementos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      >
        <Text>{item.name}</Text>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (page < PAGE_LIMIT) {
      setPage(page + 1);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          page < PAGE_LIMIT && (
            <Button
              title="Cargar Más"
              onPress={handleLoadMore}
            />
          )
        }
      />
    </View>
  );
};

export default ItemList;
