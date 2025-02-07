import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface Comment {
  id: number;
  text: string;
  doctor?: string;
  user?: string;
  picture: string;
  time: string;
}

const CommentCard = ({comment}: {comment: Comment}) => {
  return (
    <View
      style={{
        marginBottom: 10,
        backgroundColor: '#F3FAF1',
        borderRadius: 8,
        padding: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 10,
        }}>
        <Image
          source={{uri: comment.picture}}
          style={{
            width: 41,
            height: 41,
            borderRadius: 20,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#3A643B',
            }}>
            {comment?.doctor || comment?.user}
          </Text>
          <Text style={{color: '#B6B6B6', fontSize: 14}}>{comment?.time}</Text>
        </View>

        <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Ionicons name="ellipsis-vertical" size={18} color={'#2E2F2E'} />
        </TouchableOpacity>
      </View>

      <Text style={{fontSize: 14}}>{comment?.text}</Text>
    </View>
  );
};

export default CommentCard;
