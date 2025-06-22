/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

type AppointmentData = {
  label: string;
  value: string;
};

interface AppointmentDropdownProps {
  title?: string;
  data: AppointmentData[];
}

const AppointmentDropdown: React.FC<AppointmentDropdownProps> = ({
  title = 'Appointment Details',
  data,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#00000025',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
      }}>
      {/* Header */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => setExpanded(!expanded)}>
        <Text style={{fontSize: 14, fontWeight: '500'}}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-down-outline' : 'chevron-forward-outline'}
          size={20}
          color="black"
        />
      </TouchableOpacity>

      {/* Expandable Content */}
      {expanded &&
        data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: '#444', fontSize: 13, flex: 1}}>
              {item.label}
            </Text>
            <Text style={{color: '#000', fontSize: 13}}> : </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 13,
                flex: 1,
                marginLeft: 12,
                fontWeight: '500',
              }}>
              {item.value}
            </Text>
          </View>
        ))}
    </View>
  );
};

export default AppointmentDropdown;
