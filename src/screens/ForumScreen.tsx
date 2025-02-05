import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const ForumScreen = () => {
  const posts = [
    {
      id: '1',
      user: 'Priya Singh',
      time: '2 days ago',
      question: 'Can Ayurveda help with stress and mental health issues?',
      details: 'I want to know the benefits of Ayurvedic products.',
    },
    {
      id: '2',
      user: 'Anonymous',
      time: '5 days ago',
      question: 'Can Ayurveda help with stress and mental health issues?',
      details: 'I want to know the benefits of Ayurvedic products.',
    },
  ];

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.question}>
            <Text style={{fontWeight: 'bold'}}>Question: </Text>
            {item.question}
          </Text>
          <Text style={styles.details}>{item.details}</Text>
          <View style={styles.actions}>
            <Text>💬 Reply</Text>
            <Text>❤️ Like</Text>
            <Text>🔖 Save</Text>
          </View>
        </View>
      )}
    />
  );
};

export default ForumScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  question: {
    fontSize: 14,
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    marginTop: 5,
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
