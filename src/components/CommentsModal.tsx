/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import CommentCard from './CommentCard';

interface Comment {
  id: number;
  text: string;
  doctor?: string;
  user?: string;
  picture: string;
  time: string;
}

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (commentText: string) => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  visible,
  onClose,
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleAdd = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '80%',
          }}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={{alignSelf: 'flex-end'}}>
            <Ionicons name="close" size={24} color="#2E2F2E" />
          </TouchableOpacity>

          {/* Comments Header */}
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Comments
          </Text>

          {/* Comments List */}
          {comments.length === 0 ? (
            <Text style={{color: '#8D8D8D'}}>No comments yet.</Text>
          ) : (
            <FlatList
              data={comments}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              style={{marginBottom: 50}}
              renderItem={({item}) => <CommentCard comment={item} />}
            />
          )}

          {/* Comment Input */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3F3F3',
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              position: 'absolute',
              bottom: 10,
              left: 20,
              right: 20,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#000',
                paddingHorizontal: 10,
              }}
              placeholder="Write a comment..."
              placeholderTextColor="#888"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity
              onPress={handleAdd}
              disabled={newComment.trim() === ''}>
              <Ionicons
                name="send"
                size={24}
                color={newComment.trim() ? '#3A643B' : '#A9A9A9'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;
