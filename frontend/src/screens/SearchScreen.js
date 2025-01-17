import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
      .then(response => response.json())
      .then(data => setMovies(data));
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.show.image?.medium }} />
              <Card.Content>
                <Title>{item.show.name}</Title>
                <Paragraph>{item.show.summary.replace(/<[^>]*>?/gm, '')}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 10,
  },
});

export default SearchScreen;