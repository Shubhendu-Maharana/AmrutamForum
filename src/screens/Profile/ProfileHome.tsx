/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationTypes';

const ProfileHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClick = (item: string) => {
    if (item === 'My Appointments') {
      navigation.navigate('MyAppointments');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Header heading="Profile" />
      <View style={{flex: 1, marginTop: -40, paddingBottom: 30}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={{width: 150, height: 150, borderRadius: 28}}
          />
          <View
            style={{
              backgroundColor: '#EAF2EA',
              marginTop: -20,
              padding: 10,
              borderRadius: 14,
            }}>
            <Ionicons name="pencil-outline" size={20} color="black" />
          </View>

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Mayank Singh</Text>
            <Text style={{fontSize: 16, color: 'grey'}}>81728-49347</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#FEECD7',
            marginHorizontal: 20,
            padding: 14,
            borderRadius: 24,
            marginVertical: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              Your Profile is 10% completed
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 10,
              height: 16,
              borderRadius: 16,
              overflow: 'hidden',
            }}>
            <View
              style={{
                backgroundColor: '#F79624',
                height: 16,
                width: '10%',
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: '#F0F0F0',
            paddingVertical: 18,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              borderLeftWidth: 3,
              borderLeftColor: '#9DB29D',
              paddingLeft: 17,
            }}>
            Ordering
          </Text>
          <View style={{paddingHorizontal: 14}}>
            {['Store', 'Cart', 'Order History', 'My Appointments'].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => handleClick(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#EAF2EA',
                    padding: 10,
                    borderRadius: 50,
                  }}>
                  <Ionicons
                    name={
                      item === 'Store'
                        ? 'storefront-outline'
                        : item === 'Cart'
                        ? 'cart-outline'
                        : item === 'Order History'
                        ? 'time-outline'
                        : 'calendar-outline'
                    }
                    size={20}
                    color="black"
                  />
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 12,
                  }}>
                  {item}
                </Text>
                <Ionicons name="chevron-forward-outline" size={20} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileHome;
