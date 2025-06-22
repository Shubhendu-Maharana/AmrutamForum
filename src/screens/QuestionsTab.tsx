/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import questions from '../data/questions.json';
import Ionicons from '@react-native-vector-icons/ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentsModal from '../components/CommentsModal';
import CommentCard from '../components/CommentCard';

interface Post {
  id: number;
  user: string;
  time: string;
  picture: string;
  question: string;
  details: string;
  replies: {
    id: number;
    text: string;
    doctor: string;
    picture: string;
    time: string;
  }[];
  likes: number;
  likedByUser: boolean;
  savedByUser: boolean;
}

const QuestionsTab = () => {
  const [forumData, setForumData] = useState<Array<Post>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComments, setSelectedComments] = useState<Post['replies']>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem('forumData');
      if (storedData) {
        setForumData(JSON.parse(storedData));
      } else {
        setForumData(questions);
        await AsyncStorage.setItem('forumData', JSON.stringify(questions));
      }
    };
    loadData();
  }, []);

  const updateData = async (updatedData: Array<Post>) => {
    setForumData(updatedData);
    await AsyncStorage.setItem('forumData', JSON.stringify(updatedData));
  };

  const handleLike = (id: number) => {
    const updatedData = forumData.map(q =>
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
    const updatedData = forumData.map(q =>
      q.id === id
        ? {
            ...q,
            savedByUser: !q.savedByUser,
          }
        : q,
    );
    updateData(updatedData);
  };

  const openCommentsModal = (comments: Post['replies'], postId: number) => {
    setSelectedComments(comments);
    setSelectedPostId(postId);
    setModalVisible(true);
  };

  const handleAddComment = (commentText: string) => {
    if (selectedPostId !== null) {
      const updatedData = forumData.map(post =>
        post.id === selectedPostId
          ? {
              ...post,
              replies: [
                ...post.replies,
                {
                  id: post.replies.length + 1,
                  text: commentText,
                  doctor: 'Dr. User',
                  picture: `https://picsum.photos/seed/${
                    post.replies.length + 1
                  }/200`,
                  time: new Date().toLocaleString(),
                },
              ],
            }
          : post,
      );
      updateData(updatedData);
      setModalVisible(false);
    }
  };

  return (
    <>
      <FlatList
        style={{
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
        data={forumData}
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

            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 16, fontWeight: '800', color: '#2E2F2E'}}>
                Question:{' '}
              </Text>
              <Text style={{fontSize: 16, color: '#2E2F2E'}}>
                {item.question}
              </Text>
            </View>
            <Text style={{fontSize: 14, marginVertical: 15, color: '#1E1E1E'}}>
              {item.details}
            </Text>

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
                {item.replies.length > 0
                  ? `${item.replies.length} Replies`
                  : `${item.replies.length} Reply`}
              </Text>

              <TouchableOpacity
                onPress={() => openCommentsModal(item.replies, item.id)}
                style={{marginLeft: 'auto'}}>
                <Text
                  style={{fontSize: 14, color: '#3A643B', fontWeight: '700'}}>
                  {item.replies.length > 0
                    ? `View All ${item.replies.length} Replies`
                    : ''}
                </Text>
              </TouchableOpacity>
            </View>

            {item.replies.length > 0 && (
              <CommentCard comment={item.replies[item.replies.length - 1]} />
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
                onPress={() => openCommentsModal(item.replies, item.id)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color={'#8D8D8D'}
                />
                <Text style={{fontSize: 17, color: '#8D8D8D'}}>
                  {`${item.replies.length} Reply`}
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
      <CommentsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        comments={selectedComments}
        onAddComment={handleAddComment}
      />
    </>
  );
};

export default QuestionsTab;
