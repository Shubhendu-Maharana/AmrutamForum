import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {Text, TouchableOpacity, View} from 'react-native';

const CustomTopTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 20,
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isFocused ? '#0C140C' : 'white',
              borderRadius: 8,
              paddingVertical: 14,
            }}>
            <Text
              style={{
                color: isFocused ? 'white' : '#2E2F2E',
                fontWeight: '500',
                fontSize: 17,
                lineHeight: 20,
              }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTopTabBar;
