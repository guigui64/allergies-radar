import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo';

import {Languages, GetString} from '../resources/strings';

export default class ShowScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    const lang = navigation.getParam('showLang', 'en');
    const allergies = navigation.getParam('allergies', []);
    const list = allergies.map(allergy => ({key: allergy.translations[lang] || (allergy.translations['en'] + ' [no translation]')}));
    const introText = GetString('introText', lang);
    return (
      <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={({item}) => <Text style={styles.items}>{item.key}</Text>}
          ListHeaderComponent={() => {return <Text style={styles.intro}>{introText}</Text>;}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
  },
  intro: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
  },
  items: {
    margin: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
  },
});