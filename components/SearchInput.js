import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

// import { Container } from './styles';

const SearchInput = ({placeholder, onSubmit}) => {
  const [location, setLocation] = useState('');

  const handleChangeText = (newLocation) => {
    setLocation(newLocation);
  }

  const handleSubmitEditing = () => {
    if (!location) return;

    onSubmit(location);
    setLocation('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        value={location}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  )
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

SearchInput.defaultProps = {
  placeholder: "Search any city",
}