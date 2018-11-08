const csvLanguages = `"lang","en","fr","pt","es","it","de","th","ths","id"
"en","English","French","Portuguese","Spanish","Italian","German","Thai","Thai (symbols)","Indonesian"
"fr","Anglais","Français","Portugais","Espagnol","Italien","Allemand","Thailandais","Thailandais (symboles)","Indonésien"
"pt","Inglês","Francês","Português","Espanhol","Italiano","Alemão","Tailandesa","Tailandesa (símbolos)","Indonésio"
"es","Inglés","Francés","Portugués","Español","Italiano","Alemán","Tailandés","Tailandés (símbolos)","Indonesio"
"it","Inglese","Francese","Portoghese","Spagnolo","Italiano","Tedesco","Deutsch","Tailandese","Tailandese (simboli)","Indonesiano"
"de","Englisch","Französisch","Portugiesisch","Spanisch","Italienisch","Thai","Thai (Symbole)","Indonesische"
"th","Xạngkvs̄ʹ","f̄rạ̀ngṣ̄es̄","portukes̄","s̄pen","xitālī","yexrmạn","thịy","thịy (S̄ạỵlạks̄ʹṇ̒)","xindonīseīy"
"ths","ภาษาอังกฤษ","ฝรั่งเศส","โปรตุเกส","สเปน","อิตาลี","เยอรมัน","ไทย","ไทย (สัญลักษณ์)","อินโดนีเซีย"
"id","Inggris","Prancis","Portugis","Spanyol","Italia","Jerman","Thailand","Thailand (simbol)","Indonesia"`;

var langTrans = {};
let first = true;
for (var line of csvLanguages.split('\n')) {
  if (first) {
    var headerLangs = line.split(`"lang","`)[1].slice(0,-1).split('","');
    first = false;
    continue;
  }
  let lang = line.split('","')[0].slice(1);
  let rest = line.slice(0,-1).split('","').slice(1);
  langTrans[lang] = {};
  for (var i = 0; i < headerLangs.length; ++i) {
    langTrans[lang][headerLangs[i]] = rest[i];
  }
}
var languages = [];
headerLangs.forEach(lang => {
  let descriptions = {};
  headerLangs.forEach(lang2 => {
    descriptions[lang2] = langTrans[lang2][lang];
  });
  languages.push({
    language: lang,
    descriptions: descriptions,
  });
});

/* Available languages */
export const Languages = languages;

/* Strings for the app */
const csvStrings = `"lang","selectText","selectedText","searchPlaceholderText","noResultsText","confirmText","showLangLabel","showAllergiesButton","applyButton","userLanguageLabel","userLanguageDescription","introText"
"en","Select your allergies","selected","Search allergies...","Sorry, no results","Confirm","Language to show allergies in","Show allergies","Apply and go back","User language","Language used for the interface of the application","I'm allergic to the following allergens :"
"fr","Choisissez vos allergies","selectionnée(s)","Rechercher des allergies...","Désolé, aucun résultat","Confirmer","Langue dans laquelle montrer les allergies","Montrer les allergies","Appliquer et retour","Langue utilisateur","Langue utilisée pour l'interface de l'application","Je suis allergique aux allergènes suivants :"
"pt","Selecione suas alergias","selecionada(s)","Pesquisar alergias ...","Desculpe, não há resultados","Confirmar","Idioma para mostrar alergias em","Mostrar alergias","Aplicar e voltar","Idioma do usuário","Idioma usado para a interface do aplicativo","Sou alérgico aos seguintes alérgenos:"
"es","Seleccione sus alergias","seleccionada(s)","Buscar alergias ...","Lo sentimos, no hay resultados","Confirmar","Idioma para mostrar alergias en","Mostrar alergias","Aplicar y volver","Idioma del usuario","Idioma utilizado para la interfaz de la aplicación","Soy alérgico a los siguientes alérgenos:"
"it","Seleziona le tue allergie","selezionata(/e)","Cerca allergie ...","Spiacente, nessun risultato","Conferma","Lingua per mostrare le allergie","Mostra allergie","Applica e torna indietro","Lingua utente","Lingua utilizzata per l'interfaccia dell'applicazione","Sono allergico ai seguenti allergeni:"
"de","Wählen Sie Ihre Allergien aus","Ausgewählt","Allergien suchen ...","Sorry, no results","Bestätigen","Sprache Allergien anzeigen in","Allergien anzeigen","Bewerben und zurück gehen","Benutzersprache","Sprache, die für die Schnittstelle der Anwendung verwendet wird","Ich bin allergisch gegen folgende Allergene:"
"th","Leụ̄xk xākār phæ̂","leụ̄xk","kĥnh̄ā rokh p̣hūmiphæ̂ ...","K̄hxxp̣hạy mị̀mī p̄hllạphṭh̒","yụ̄nyạn","p̣hās̄ʹā pheụ̄̀x s̄ædng xākār phæ̂ nı","s̄ædng xākār phæ̂","chı̂ læa klạb pị","p̣hās̄ʹā p̄hū̂ chı̂","p̣hās̄ʹā thī̀ chı̂ s̄ảh̄rạb xin the xr̒fes k̄hxng xæphphlikhechạn","c̄hạn phæ̂ s̄ār k̀x p̣hūmiphæ̂ t̀x pị nī̂:"
"ths","เลือกอาการแพ้","เลือก","ค้นหาโรคภูมิแพ้ ...","ขออภัยไม่มีผลลัพธ์","ยืนยัน","ภาษาเพื่อแสดงอาการแพ้ใน","แสดงอาการแพ้","ใช้และกลับไป","ภาษาผู้ใช้","ภาษาที่ใช้สำหรับอินเทอร์เฟซของแอพพลิเคชัน","ฉันแพ้สารก่อภูมิแพ้ต่อไปนี้:"
"id","Pilih alergi Anda","dipilih","Cari alergi ...","Maaf, tidak ada hasil","Konfirmasi","Bahasa untuk menunjukkan alergi di","Tampilkan alergi","Terapkan dan kembali","Bahasa pengguna","Bahasa yang digunakan untuk antarmuka aplikasi","Saya alergi terhadap alergen berikut:"`;

var translations = {};
first = true;
for (line of csvStrings.split('\n')) {
  if (first) {
    var headerWords = line.split(`"lang","`)[1].slice(0,-1).split('","');
    first = false;
    continue;
  }
  let lang = line.split('","')[0].slice(1);
  let rest = line.slice(0,-1).split('","').slice(1);
  translations[lang] = {};
  for (i = 0; i < headerWords.length; ++i) {
    translations[lang][headerWords[i]] = rest[i];
  }
}

export function GetString(keyword, lang) {
  if (!headerWords.includes(keyword)) {
    return '[No keyword "' + keyword + '"]';
  }
  if (translations[lang] && translations[lang][keyword]) {
    return translations[lang][keyword];
  }
  return '[No available translation in ' + lang + ' for "' + keyword + '"]';
}