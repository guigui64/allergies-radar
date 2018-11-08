import React from 'react';
import {
  AsyncStorage,
  Button,
  NativeModules,
  Picker,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Languages, GetString} from '../resources/strings';
import allergens from '../resources/allergens.json';

let systemLanguage = 'en';
if (Platform.OS === 'android') {
  systemLanguage = NativeModules.I18nManager.localeIdentifier;
} else {
  // Doesn't work : systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
  systemLanguage = 'fr';
}
var globalUserLang = systemLanguage.substring(0, 2);

function _buildItems(lang) {
  let nextIndex = 0;
  let nextSubIndex = 100;
  let items = [];
  let idToAllergy = {};
  let allergyToId = {};
  allergens.map(allergen => {
    // Build subItems beforehand for this item
    let subItems = [];
    allergen.sub.map(suballergen => {
      subItems.push({
        name: suballergen.translations[lang] || (suballergen.name + ' [no translation]'),
        translations: suballergen.translations,
        id: nextSubIndex,
      });
      idToAllergy[nextSubIndex] = suballergen;
      allergyToId[suballergen] = nextSubIndex;
      nextSubIndex++;
    });
    // Build item with already built subItems
    items.push({
      name: allergen.translations[lang] || (allergen.name + ' [no translation]'),
      translations: allergen.translations,
      id: nextIndex++,
      sub: subItems,
    });
  });
  return { items: items, idToAllergy: idToAllergy, allergyToId: allergyToId };
}

function _allergiesFromIds(ids, idToAllergy) {
  let allergies = [];
  ids.map(id => idToAllergy[id] && allergies.push(idToAllergy[id]));
  return allergies;
}

function _idsFromAllergies(allergies, allergyToId) {
  let ids = [];
  allergies.map(allergy => allergyToId[allergy] && ids.push(allergyToId[allergy]));
  return ids;
}

/*function _loadAllergiesFromLocalFile(allergyToId) {
  async () => {
    try {
      const allergies = JSON.parse(await AsyncStorage.getItem('STOREDALLERGIES'));
      console.log('Loaded allergies : ' + JSON.stringify(allergies));
      return _idsFromAllergies(allergies, allergyToId);
    } catch (error) {
      console.error(error + " while trying to load allergies from local file");
    }
  }
}*/

function Selector(props) {
  // Strings
  const selectText = GetString('selectText', props.lang);
  const selectedText = GetString('selectedText', props.lang);
  const confirmText = GetString('confirmText', props.lang);
  const searchPlaceholderText = GetString('searchPlaceholderText', props.lang);
  const noResultsText = GetString('noResultsText', props.lang);
  const noResultsComponent = (
    <View
      style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{noResultsText}</Text>
    </View>
  );
  // Component
  return (
    <SectionedMultiSelect
      items={props.items}
      uniqueKey="id"
      subKey="sub"
      selectText={selectText}
      showDropDowns={false}
      expandDropDowns={true}
      readOnlyHeadings={false}
      selectChildren={true}
      onSelectedItemsChange={props.onSelectedItemsChange}
      selectedItems={props.selectedItems}
      selectedText={selectedText}
      confirmText={confirmText}
      searchPlaceholderText={searchPlaceholderText}
      noResultsComponent={noResultsComponent}
      colors={{ primary: 'dodgerblue' }}
      styles={{
        selectedItem: {
          fontWeight: 'bold',
          color: 'green',
          backgroundColor: '#e9fce9',
        },
      }}
    />
  );
}

export default class SelectScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Allergies Radar',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="gear" size={20} style={{ padding: 10 }} />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    let { items, idToAllergy, allergyToId } = _buildItems(globalUserLang);
    [this.items, this.idToAllergy, this.allergyToId] = [items, idToAllergy, allergyToId];
    let showLang = 'en';
    if (globalUserLang === 'en') {
      showLang = 'fr';
    }
    this.state = {
      selectedItems: [],
      showLang: showLang,
    };
  }

  /*componentDidMount() {
    const selectedFromFile = _loadAllergiesFromLocalFile(this.allergyToId);
    if (selectedFromFile && selectedFromFile.length != 0) {
      this.setState({selectedItems : selectedFromFile});
    }
  }*/

  _refreshItems(userLang) {
    this.items.map(parent => {
      parent.name = parent.translations[userLang] || (parent.translations['en'] + ' [no translation]');
      parent.sub.map(allergen => {
        allergen.name = allergen.translations[userLang] || (allergen.translations['en'] + ' [no translation]');
      });
    });
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    /*async () => {
      try {
        await AsyncStorage.setItem('STOREDALLERGIES', JSON.stringify(_allergiesFromIds(this.selectedItems, this.idToAllergy)));
      } catch (error) {
        console.error(error + " while trying to save selected allergies to local file");
      }
    }*/
  };

  updateShowLangFromUserLang(userLang) {
    if (userLang === this.state.showLang) {
      if (userLang === 'en') {
        this.setState({ showLang: 'fr' });
      } else {
        this.setState({ showLang: 'en' });
      }
    }
  }

  render() {
    const { navigation } = this.props;
    const userLang = navigation.getParam('userLang', globalUserLang);
    this.updateShowLangFromUserLang(userLang);
    this._refreshItems(userLang);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.selectPadding} />
          <View style={styles.selectContainer}>
            <Selector
              items={this.items}
              lang={userLang}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
            />
          </View>
          <View style={styles.selectPadding} />
        </View>
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            {GetString('showLangLabel', userLang)}:
          </Text>
          <Picker
            selectedValue={this.state.showLang}
            style={{ width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ showLang: itemValue })
            }>
            {Languages.map(language => (<Picker.Item key={language.language} label={language.descriptions[userLang]} value={language.language} />))}
          </Picker>
          <Button
            onPress={() =>
              navigation.navigate('Show', {
                showLang: this.state.showLang,
                allergies: _allergiesFromIds(
                  this.state.selectedItems,
                  this.idToAllergy
                ),
              })
            }
            title={GetString('showAllergiesButton', userLang)}
            disabled={this.state.selectedItems.length === 0}
          />
        </View>
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
  },
  selectPadding: {
    flex: 0.1,
    backgroundColor: '#ecf0f1',
  },
  selectContainer: {
    flex: 0.8,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
  },
});
