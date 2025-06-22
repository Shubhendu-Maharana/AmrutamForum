/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {pick, types} from '@react-native-documents/picker';

interface Thought {
  id: number;
  user: string;
  time: string;
  picture: string;
  thought: string;
  text: string;
  postPicture: string;
  likes: number;
  likedByUser: boolean;
  savedByUser: boolean;
  comments: {
    id: number;
    user: string;
    text: string;
    time: string;
    picture: string;
  }[];
}

interface NewThoughtProps {
  visible: boolean;
  onClose: () => void;
  onAddThought: (newThought: Thought) => void;
}

interface SelectedFile {
  name: string;
  type: string;
  uri: string;
  size: number;
}

const NewThoughtModal: React.FC<NewThoughtProps> = ({
  visible,
  onClose,
  onAddThought,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<SelectedFile>();

  const createThought = () => {
    if (!title.trim() && !description.trim()) {
      Alert.alert('Error', 'Please enter a title and description.');
      return;
    }
    const newThought: Thought = {
      id: Date.now(),
      user: 'Dr. Mathew Adams',
      time: new Date().toLocaleString(),
      picture: 'https://randomuser.me/api/portraits/men/32.jpg',
      thought: title,
      text: description,
      postPicture: file?.uri ?? '',
      likes: 0,
      likedByUser: false,
      savedByUser: false,
      comments: [],
    };

    onAddThought(newThought);
    setTitle('');
    setDescription('');
    setFile(undefined);
  };

  const pickFile = async ({fileType}: {fileType: string}) => {
    try {
      if (fileType === 'mkv') {
        const result = await pick({
          mode: 'open',
          type: types.video,
          allowMultiSelection: false,
        });
        if (!result[0].error) {
          const {name, nativeType, uri, size} = result[0];
          setFile({
            name: name ?? '',
            type: nativeType ?? '',
            uri,
            size: size ?? 0,
          });
        }
      } else if (fileType === 'jpg or jpeg') {
        const result = await pick({
          mode: 'open',
          type: types.images,
          allowMultiSelection: false,
        });
        if (!result[0].error) {
          const {name, nativeType, uri, size} = result[0];
          setFile({
            name: name ?? '',
            type: nativeType ?? '',
            uri,
            size: size ?? 0,
          });
        }
      } else if (fileType === 'pdf') {
        const result = await pick({
          mode: 'open',
          type: types.pdf,
          allowMultiSelection: false,
        });
        if (!result[0].error) {
          const {name, nativeType, uri, size} = result[0];
          setFile({
            name: name ?? '',
            type: nativeType ?? '',
            uri,
            size: size ?? 0,
          });
        }
      }
    } catch (error) {
      console.log('Error in picking file:', error);
    }
  };

  const exitModal = () => {
    setTitle('');
    setDescription('');
    setFile(undefined);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={exitModal}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add your thoughts</Text>
        </View>
        <View style={styles.userInfo}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}}
            style={styles.userImage}
          />
          <Text style={styles.userName}>Dr. Mathew Adams</Text>
        </View>
        <View style={{position: 'relative', paddingTop: 14}}>
          <Text style={styles.label}>Add title *</Text>
          <TextInput
            style={styles.input}
            placeholder="max 50 words"
            placeholderTextColor={'#B6B6B6'}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={{position: 'relative', paddingTop: 14}}>
          <Text style={styles.label}>Add description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="max 70 words"
            placeholderTextColor={'#B6B6B6'}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <Text style={[styles.label, {marginBottom: 30}]}>
          Upload attachments
        </Text>

        {!file ? (
          <View style={styles.attachmentContainer}>
            {['mkv', 'jpg or jpeg', 'pdf'].map(type => (
              <TouchableOpacity
                key={type}
                style={styles.uploadButton}
                onPress={() => pickFile({fileType: type})}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#3A643B"
                />
                <Text style={styles.uploadText}>Upload {type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : file.type.includes('image') ? (
          <View
            style={{
              position: 'relative',
              paddingTop: 14,
            }}>
            <TouchableOpacity
              onPress={() => {
                setFile(undefined);
              }}
              style={styles.fileCloseButton}>
              <Ionicons name="close" size={24} color={'#000000'} />
            </TouchableOpacity>
            <Image source={{uri: file.uri}} style={styles.previewImage} />
          </View>
        ) : (
          <View
            style={{
              position: 'relative',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 5.4,
              paddingVertical: 10,
              paddingHorizontal: 11,
              justifyContent: 'center',
              width: 300,
            }}>
            <TouchableOpacity
              onPress={() => {
                setFile(undefined);
              }}
              style={styles.pdfCloseButton}>
              <Ionicons name="close" size={24} color={'#000000'} />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', gap: 14}}>
              <View
                style={{
                  height: 43,
                  width: 43,
                  backgroundColor: '#EAF2EA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5.4,
                }}>
                <Ionicons name="document-outline" size={26} color="#3A643B" />
              </View>
              <View
                style={{
                  justifyContent: 'space-around',
                }}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                  {file.name.length > 25
                    ? `${file.name.slice(0, 25)}...`
                    : file.name}
                </Text>
                <Text style={{fontSize: 12, color: '#8D8D8D'}}>
                  {(file.size / 1024).toFixed(2)} KB | pdf
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={createThought}>
          <Text style={styles.saveButtonText}>Save and proceed</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NewThoughtModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    height: 52,
    borderColor: '#D6D6D6',
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 180,
  },
  attachmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  fileCloseButton: {
    height: 30,
    width: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: -5,
    zIndex: 1,
  },
  pdfCloseButton: {
    height: 30,
    width: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -15,
    right: -10,
    zIndex: 1,
  },
  uploadButton: {
    height: 96,
    width: 103,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3FAF1',
  },
  uploadText: {
    fontSize: 10,
    marginTop: 4,
    color: '#2E2F2E',
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 10,
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 11,
  },
  saveButton: {
    backgroundColor: '#3A643B',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
