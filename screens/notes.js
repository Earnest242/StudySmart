import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
// To pick the file from local file system
import DocumentPicker from 'react-native-document-picker';
//import FileViewer from "react-native-file-viewer";

var counter = 252;

const notespage = ({navigation, route}) => {
  var notes2 = route.params;
  let [loading, setLoading] = useState(false);
  let [filePath, setFilePath] = useState();
  let [process, setProcess] = useState('');
  let [filename, setFilename] = useState();
  let [fileUri, setFileUri] = useState();
  let [fileSize, setFileSize] = useState();

  //picking a document
  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Setting the state for selected File
      if (res) {
        let res2 = res[0];
        setFilePath(res2);
        console.log(filePath.name);
        console.log(filePath.uri);
        console.log(res2);
        //_uploadFile();
      } else {
        ('unable to pick file');
      }
    } catch (error) {
      setFilePath();
      // If user canceled the document selection
      alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };
  //uploading a file
  /*const _uploadFile = async () => {
    try {
      // Check if file selected
      if (filename == '') return alert('Please Select any File');
      setLoading(true);

      // Create Referencesss
      const reference = storage().ref('classDocuments/upload.img');

      // Put File
      const task = reference.putFile(`${filePath.uri}`);
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();

      /*task.on('state_changed', taskSnapshot => {
        setProcess(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`,
        );
        console.log(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`,
        );
      });
      task.then(() => {
        alert('Image uploaded to the bucket!');
        setProcess('');
      });
      setFilePath(null);
    } catch (error) {
      console.log('Error->', error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };*/

  return (
    <View style={styles.container56}>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 15,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {notes2.UnitName}
        </Text>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 15,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {process}
        </Text>
      </View>
      <FlatList
        data={notes2.notes}
        keyExtractor={item => item.notesId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 40,
              paddingLeft: 10,
              paddingTop: 8,
              flexDirection: 'row',
            }}>
            <Text style={{color: 'black', fontSize: 15, paddingLeft: 10}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.Flot} onPress={_chooseFile}>
        <Text style={{fontSize: 42, color: 'white'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default notespage;

const styles = StyleSheet.create({
  container56: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title: {
    height: 60,
    width: '100%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: 1,
  },
  Flot: {
    position: 'absolute',
    bottom: 30,
    //marginBottom: 30,
    right: 13,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    height: 60,
    width: 60,
    borderRadius: 53,
  },
});
