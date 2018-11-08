import React from 'react';
import {Button, NativeModules, Picker, Platform, StyleSheet, Text, View} from 'react-native';
import {Languages, GetString} from '../resources/strings';

let systemLanguage = 'en';
if (Platform.OS === 'android') {
  systemLanguage = NativeModules.I18nManager.localeIdentifier;
} else {
  // Doesn't work : systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
  systemLanguage = 'fr';
}
var globalUserLang = systemLanguage.substring(0, 2);

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: globalUserLang,
      useImages: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph/*label*/}>{GetString('userLanguageLabel', this.state.lang)}</Text>
        <Text style={styles.paragraph/*description*/}>{GetString('userLanguageDescription', this.state.lang)}</Text>
        <Picker
          selectedValue={this.state.lang}
          style={{ width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ lang: itemValue })
          }>
          {Languages.map(language => (<Picker.Item key={language.language} label={language.descriptions[language.language]} value={language.language} />))}
        </Picker>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Select', {
              userLang: this.state.lang,
            });
            globalUserLang = this.state.lang;
          }}
          title={GetString('applyButton', this.state.lang)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
  },
});
