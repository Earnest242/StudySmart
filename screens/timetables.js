import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  ActivityIndicator,
  Platform,Modal, ToastAndroid
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import OpenFile from 'react-native-files-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import { GroupData } from './groupScreen';

var counter = 252;



const timetables = ({navigation, route}) => {
  var notes2 = route.params;
  let [TimeTables, setTimeTables]=useState([]);
  const [delModal, setDelModal]=useState(false);
  let [deleteID, setdeleteID] = useState('');
  //
  //const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {}, []);

  
  function handlePress() {
    if (Platform.OS === 'android') {
      //setAnimating(true);
      OpenFile.openDoc(
          {
            url: 'http://www.africau.edu/images/default/sample.pdf',
            fileName: 'demo1',
            cache: true,
            fileType: 'application/pdf',
          },
        cb,
      );
    }
  }

  //picking a document
  async function _chooseFile () {
    // Opening Document Picker to select one file
    try {
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Setting the state for selected File
      
        let file = res[0];
        const filePath = await normalizePath(file.uri)
        const result = await RNFetchBlob.fs.readFile(filePath,'base64');
        uploadingToFirebase(file, result)
      
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

  async function normalizePath (filePath){
    if(Platform.OS === 'ios' || Platform.OS === 'android'){
      const filePrefix = 'file://';
      if(filePath.startsWith(filePrefix)){
        filePath = filePath.substring(filePrefix.length);
        try{
          filePath = decodeURI(filePath);
        }catch(e){}
      }
    }
    return filePath;
  }
  //uploading a file
  async function uploadingToFirebase (file, result){
    let d = new Date().getTime();
      let Doc_Id = `${d}`; 
      let fileName = `${file.name}` + `${d}`;
    const uploadTask = storage().ref(`classDocuments/${fileName}`).putString(result,'base64',{contentType:file.type});
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error)
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      firestore().collection('classGroups').doc(`${GroupData.groupId}`).collection('timetables').doc(`${Doc_Id}`).set({DocId:Doc_Id, DocName:file.name, DocType:file.type, DocPath:downloadURL, DocSize:file.size})
    });
  }
);
}

//getting the documents
useEffect(() => {
  const subscriber = firestore()
    .collection('classGroups')
    .doc(GroupData.groupId)
    .collection('timetables')
    .onSnapshot(snapshot =>
      setTimeTables(
        snapshot.docs.map(doc => ({
          DocId:doc.data().DocId,
          DocName: doc.data().DocName,
          DocType: doc.data().DocType,
          DocPath: doc.data().DocPath,
          DocSize: doc.data().DocSize,
        })),
      ),
    );
  // Stop listening for updates when no longer required
  return () => subscriber();
}, []);
//deleting a doc
const delMOdal2 =(DocId)=>{
  setDelModal(true);
  setdeleteID(DocId)
}
  //deleting a unit
  function deleteTT (){
    try{
    const delete45 = firestore().
    collection('classGroups').doc(`${GroupData.groupId}`).collection('timetables').
    doc(`${deleteID}`).delete();
    if (delete45){
      ToastAndroid.show('Deleted', ToastAndroid.SHORT);
      setDelModal(null);
    }
    }catch (error){
      alert(error);
    }
  }

  return (
    <View style={styles.container56}>
      
      <FlatList
        data={TimeTables}
        keyExtractor={item => item.DocId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 40,
              paddingLeft: 10,
              paddingTop: 8,
              flexDirection: 'row',
            }}
            onPress={()=>handlePress()}
            onLongPress={()=>delMOdal2(item.DocId)}>
            <Text style={{color: 'black', fontSize: 15, paddingLeft: 10}}>
              {item.DocName}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.Flot} onPress={_chooseFile}>
        <Text style={{fontSize: 42, color: 'white'}}>+</Text>
      </TouchableOpacity>
      <Modal visible={delModal} transparent={true}>
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
        <View style={{backgroundColor:'white', height:90, width:'80%', borderRadius:20, padding:10}}>
          <Text style={{color:'dodgerblue', fontSize:18}}>Do you want to delete the document?</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', padding:17}}>
            <TouchableOpacity onPress={()=>setDelModal(false)} >
              <Text style={{color:'dodgerblue', fontSize:18}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteTT(deleteID)}>
              <Text style={{color:'red', fontSize:18}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default timetables;

const styles = StyleSheet.create({
  container56: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title: {
    height: 60,
    width: '100%',
    backgroundColor: '#0F172A',
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
