import {View, Text} from 'react-native';
import TopTabsNavigator from '../navigation/TopTabsNavigator';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#EAF2EA',
          height: 188,
          position: 'relative',
          overflow: 'hidden',
          borderBottomStartRadius: 42,
          borderBottomEndRadius: 42,
        }}>
        <Text
          style={{
            position: 'absolute',
            top: 48,
            left: 15,
            color: '#0C140C',
            fontWeight: '500',
            fontSize: 29,
          }}>
          Forum
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

      <View style={{backgroundColor: 'red', flex: 1}}>
        <TopTabsNavigator />
      </View>
    </View>
  );
};

export default HomeScreen;
