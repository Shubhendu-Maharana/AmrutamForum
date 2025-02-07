import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import thoughts from '../data/thoughts.json';
import Ionicons from '@react-native-vector-icons/ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentsModal from '../components/CommentsModal';
import CommentCard from '../components/CommentCard';
import NewThoughtModal from '../components/NewThoughtModal';

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

const ThoughtsScreen = () => {
  const [thoughtData, setThoughtData] = useState<Array<Thought>>([]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [thoughtModalVisible, setThoughtModalVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState<Thought['comments']>(
    [],
  );
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem('thoughtData');
      if (storedData) {
        setThoughtData(JSON.parse(storedData));
      } else {
        setThoughtData(thoughts);
        await AsyncStorage.setItem('thoughtData', JSON.stringify(thoughts));
      }
    };
    loadData();
  }, []);

  const updateData = async (updatedData: Array<Thought>) => {
    setThoughtData(updatedData);
    await AsyncStorage.setItem('thoughtData', JSON.stringify(updatedData));
  };

  const handleLike = (id: number) => {
    const updatedData = thoughtData.map(q =>
      q.id === id
        ? {
            ...q,
            likes: q.likedByUser ? q.likes - 1 : q.likes + 1,
            likedByUser: !q.likedByUser,
          }
        : q,
    );
    updateData(updatedData);
  };

  const handleSave = (id: number) => {
    const updatedData = thoughtData.map(q =>
      q.id === id
        ? {
            ...q,
            savedByUser: !q.savedByUser,
          }
        : q,
    );
    updateData(updatedData);
  };

  const openCommentsModal = (comments: Thought['comments'], postId: number) => {
    setSelectedComments(comments);
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  };

  const openNewThoughtModal = () => {
    setThoughtModalVisible(true);
  };

  const handleAddComment = (commentText: string) => {
    if (selectedPostId !== null) {
      const updatedData = thoughtData.map(post =>
        post.id === selectedPostId
          ? {
              ...post,
              replies: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  text: commentText,
                  doctor: 'Dr. User',
                  picture: `https://picsum.photos/seed/${
                    post.comments.length + 1
                  }/200`,
                  time: new Date().toLocaleString(),
                },
              ],
            }
          : post,
      );
      updateData(updatedData);
      setCommentModalVisible(false); // Close modal after adding comment
    }
  };

  const handleAddThought = (newThought: Thought) => {
    const updatedData = [newThought, ...thoughtData];
    updateData(updatedData);
    setThoughtModalVisible(false);
  };

  return (
    <>
      <FlatList
        style={{
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
        data={thoughtData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 15,
              marginVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#EDEDED',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 44,
                  width: 44,
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image source={{uri: item.picture}} style={{flex: 1}} />
              </View>

              <View>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#1E1E1E'}}>
                  {item.user}
                </Text>
                <Text style={{fontSize: 14, color: '#8D8D8D'}}>
                  {item.time}
                </Text>
              </View>

              <TouchableOpacity style={{marginLeft: 'auto'}}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={'#2E2F2E'}
                />
              </TouchableOpacity>
            </View>

            <Text style={{fontSize: 16, marginTop: 5, color: '#2E2F2E'}}>
              <Text style={{fontWeight: '800'}}>Thought: </Text>
              {item.thought}
            </Text>

            <Text style={{fontSize: 16, marginTop: 10, color: '#2E2F2E'}}>
              {item.text}
            </Text>

            {item.postPicture && (
              <Image
                source={{uri: item.postPicture}}
                style={{
                  marginTop: 10,
                  height: 300,
                  width: '100%',
                  borderRadius: 12,
                }}
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                gap: 8,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#8D8D8D'}}>Replies</Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#3A643B',
                  borderRadius: 50,
                }}
              />
              <Text style={{fontSize: 16, color: '#8D8D8D'}}>
                {item.comments.length > 0
                  ? `${item.comments.length} Replies`
                  : `${item.comments.length} Reply`}
              </Text>

              <TouchableOpacity
                onPress={() => openCommentsModal(item.comments, item.id)}
                style={{marginLeft: 'auto'}}>
                <Text
                  style={{fontSize: 14, color: '#3A643B', fontWeight: '700'}}>
                  {item.comments.length > 0
                    ? `View All ${item.comments.length} Replies`
                    : ''}
                </Text>
              </TouchableOpacity>
            </View>

            {item.comments.length > 0 && (
              <CommentCard comment={item.comments[item.comments.length - 1]} />
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#EDEDED',
                paddingTop: 15,
              }}>
              <TouchableOpacity
                onPress={() => handleLike(item.id)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Ionicons
                  name={item.likedByUser ? 'heart' : 'heart-outline'}
                  size={20}
                  color={'#8D8D8D'}
                />
                <Text style={{fontSize: 17, color: '#8D8D8D'}}>
                  {item.likes > 0
                    ? `${item.likes} Likes`
                    : `${item.likes} Like`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openCommentsModal(item.comments, item.id)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color={'#8D8D8D'}
                />
                <Text style={{fontSize: 17, color: '#8D8D8D'}}>
                  {`${item.comments.length} Reply`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSave(item.id)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Ionicons
                  name={item.savedByUser ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={'#8D8D8D'}
                />
                <Text style={{fontSize: 17, color: '#8D8D8D'}}>
                  {item.savedByUser ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={openNewThoughtModal}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#3A643B',
          borderRadius: 50,
          height: 56,
          width: 56,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="add-outline" size={28} color={'white'} />
      </TouchableOpacity>
      <CommentsModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        comments={selectedComments}
        onAddComment={handleAddComment}
      />
      <NewThoughtModal
        visible={thoughtModalVisible}
        onClose={() => setThoughtModalVisible(false)}
        onAddThought={handleAddThought}
      />
    </>
  );
};

export default ThoughtsScreen;
