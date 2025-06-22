/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import {useState} from 'react';

const Header = ({
  heading,
  isEditable = false,
  onCanelPress,
  onReschedulePress,
}: {
  heading: string;
  isEditable?: boolean;
  onCanelPress?: () => void;
  onReschedulePress?: () => void;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        backgroundColor: '#EAF2EA',
        height: 188,
        position: 'relative',
        overflow: 'hidden',
        borderBottomStartRadius: 42,
        borderBottomEndRadius: 42,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 25, left: 15, zIndex: 1}}>
        <Ionicons name="chevron-back" size={24} color="#0C140C" />
      </TouchableOpacity>

      {isEditable && (
        <>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{position: 'absolute', top: 25, right: 15, zIndex: 1}}>
            <Ionicons
              name="ellipsis-vertical-outline"
              size={30}
              color="#0C140C"
            />
          </TouchableOpacity>

          {visible && (
            <View
              style={{
                position: 'absolute',
                top: 68,
                right: 15,
                zIndex: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  onReschedulePress?.();
                }}
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Ionicons name="timer-outline" size={24} color="#646665" />
                <Text style={{color: '#646665'}}>Reschedule Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  onCanelPress?.();
                }}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Ionicons name="trash-outline" size={24} color="#ED3535" />
                <Text style={{color: '#ED3535'}}>Cancel Appointment</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      <Text
        style={{
          position: 'absolute',
          top: 68,
          left: 15,
          color: '#0C140C',
          fontWeight: '500',
          fontSize: 29,
          zIndex: 1,
        }}>
        {heading}
      </Text>
      <View
        style={{
          height: 191,
          width: 191,
          backgroundColor: '#CFEBCF80',
          borderRadius: 100,
          position: 'absolute',
          top: -104,
          left: 183,
        }}
      />
      <View
        style={{
          height: 191,
          width: 191,
          backgroundColor: '#CFEBCF80',
          borderRadius: 100,
          position: 'absolute',
          top: 117,
          left: 216,
        }}
      />
    </View>
  );
};

export default Header;
