/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigationTypes';
import {useAppointments} from '../../context/AppointmentContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DropdownSelector from '../../components/DropdownSelector';

interface BasicInfo {
  gender: string;
  age: string;
  height: string;
  weight: string;
}

interface ConcernInfo {
  concern: string;
  severity: string;
  duration: string;
}

const EditInfo = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditInfo'>>();
  const {currentAppointment, setCurrentAppointment} = useAppointments();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const title = route.params?.title || 'Edit Info';
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState<BasicInfo>({
    gender: currentAppointment?.basicInfo.gender ?? 'Male',
    age: currentAppointment?.basicInfo.age ?? '22',
    height: currentAppointment?.basicInfo.height ?? '171',
    weight: currentAppointment?.basicInfo.weight ?? '60',
  });

  const parseSymptomDetails = (
    details: {label: string; value: string}[],
  ): ConcernInfo => {
    const data: Partial<ConcernInfo> = {};
    details.forEach(({label, value}) => {
      const key = label.toLowerCase() as keyof ConcernInfo;
      data[key] = value;
    });
    return data as ConcernInfo;
  };

  const [concernData, setConcernData] = useState<ConcernInfo>(
    parseSymptomDetails(currentAppointment?.symptomDetails ?? []),
  );

  const handleInputChange = (field: keyof BasicInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConcernChange = (field: keyof ConcernInfo, value: string) => {
    setConcernData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    if (!currentAppointment || !currentAppointment.id) {
      Alert.alert('Error', 'Current appointment is missing or invalid.');
      return;
    }
    setCurrentAppointment({
      ...currentAppointment,
      basicInfo: formData,
      symptomDetails: [
        {label: 'Concern', value: concernData.concern},
        {label: 'Severity', value: concernData.severity},
        {label: 'Duration', value: concernData.duration},
      ],
    });
    navigation.goBack();
  };

  const renderInputField = (
    label: string,
    value: string,
    field: keyof BasicInfo | keyof ConcernInfo,
    placeholder: string,
  ) => (
    <View
      style={{
        marginBottom: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 16,
        paddingVertical: 4,
      }}>
      <Text
        style={{
          fontSize: 14,
          color: '#666',
          fontWeight: '500',
        }}>
        {label}
      </Text>
      <View>
        <TextInput
          style={{
            fontSize: 16,
            color: '#333',
            paddingVertical: 12,
            minHeight: 44,
          }}
          value={value}
          onChangeText={text =>
            title === 'Basic Info'
              ? handleInputChange(field as keyof BasicInfo, text)
              : handleConcernChange(field as keyof ConcernInfo, text)
          }
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderBasicInfo = () => (
    <View style={{marginVertical: 16}}>
      <Text style={{fontSize: 14, fontWeight: '700', color: '#2E2F2E'}}>
        Please confirm your basic information
      </Text>

      <View style={{marginTop: 20}}>
        <DropdownSelector
          label={formData.gender}
          options={['Male', 'Female', 'Other']}
          onSelect={value => handleInputChange('gender', value)}
        />
        {renderInputField('Age', formData.age, 'age', 'Age')}
        {renderInputField('Height', formData.height, 'height', 'Height')}
        {renderInputField('Weight', formData.weight, 'weight', 'Weight')}

        <TouchableOpacity
          style={{
            backgroundColor: '#3A643B',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={handleConfirm}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConcern = () => (
    <View style={{marginVertical: 16}}>
      <Text style={styles.sectionLabel}>Please select a concern</Text>
      <View>
        <DropdownSelector
          label={concernData.concern}
          options={[
            'Headache',
            'Fever',
            'Irregular periods',
            'Skin rash',
            'Chest Pain',
            'Fatigue',
            'Anxiety',
            'Ear pain',
            'Back pain',
            'Frequent urination',
            'Back Pain',
            'Mental Health Concerns',
          ]}
          onSelect={value => {
            handleConcernChange('concern', value);
          }}
        />
        <DropdownSelector
          label={concernData.severity}
          options={['Mild', 'Moderate', 'Severe']}
          onSelect={value => handleConcernChange('severity', value)}
        />
        {renderInputField(
          'Duration',
          concernData.duration,
          'duration',
          'Duration',
        )}

        <TouchableOpacity
          style={{
            backgroundColor: '#3A643B',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={handleConfirm}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Header heading={title} />

      <View style={{padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: currentAppointment?.doctorImage}}
            style={{
              height: 70,
              width: 70,
              resizeMode: 'cover',
              borderRadius: 12,
            }}
          />
          <View>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#2E2F2E'}}>
              {currentAppointment?.doctorName}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#646665'}}>
              {currentAppointment?.specialization}
            </Text>
          </View>
        </View>

        {title === 'Basic Info' ? renderBasicInfo() : renderConcern()}
      </View>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownOptions: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  dropdownOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
});
