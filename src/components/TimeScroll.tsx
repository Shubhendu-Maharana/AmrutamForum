import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  isSelected?: boolean;
}

interface TimeScrollProps {
  selectedTime?: string;
  onTimeSelect?: (timeSlot: TimeSlot) => void;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const TimeScroll: React.FC<TimeScrollProps> = ({
  onTimeSelect,
  selected,
  setSelected,
}) => {
  const timeSlots: TimeSlot[] = [
    // Morning
    {id: '1', time: '09:00 AM', period: 'morning'},
    {id: '2', time: '09:35 AM', period: 'morning'},
    {id: '3', time: '10:05 AM', period: 'morning'},
    {id: '4', time: '10:30 AM', period: 'morning'},
    {id: '5', time: '11:00 AM', period: 'morning'},
    {id: '6', time: '11:35 AM', period: 'morning'},

    // Afternoon
    {id: '7', time: '12:00 PM', period: 'afternoon'},
    {id: '8', time: '12:35 PM', period: 'afternoon'},
    {id: '9', time: '01:05 PM', period: 'afternoon'},
    {id: '10', time: '01:30 PM', period: 'afternoon'},
    {id: '11', time: '02:00 PM', period: 'afternoon'},
    {id: '12', time: '02:35 PM', period: 'afternoon'},
    {id: '13', time: '03:05 PM', period: 'afternoon'},
    {id: '14', time: '03:30 PM', period: 'afternoon'},
    {id: '15', time: '04:00 PM', period: 'afternoon'},
    {id: '16', time: '04:35 PM', period: 'afternoon'},
    {id: '17', time: '05:05 PM', period: 'afternoon'},

    // Evening
    {id: '18', time: '06:00 AM', period: 'evening'},
    {id: '19', time: '07:00 AM', period: 'evening'},
    {id: '20', time: '08:05 AM', period: 'evening'},
    {id: '21', time: '08:30 PM', period: 'evening'},
    {id: '22', time: '09:00 PM', period: 'evening'},
    {id: '23', time: '09:35 PM', period: 'evening'},
  ];

  const handleTimePress = (timeSlot: TimeSlot) => {
    setSelected(timeSlot.time);
    if (onTimeSelect) {
      onTimeSelect(timeSlot);
    }
  };

  const renderTimeSlot = (timeSlot: TimeSlot) => {
    const isSelected = selected === timeSlot.time;

    return (
      <TouchableOpacity
        key={timeSlot.id}
        style={[
          styles.timeContainer,
          isSelected && styles.selectedTimeContainer,
        ]}
        onPress={() => handleTimePress(timeSlot)}
        activeOpacity={0.7}>
        <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>
          {timeSlot.time}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSection = (
    title: string,
    period: 'morning' | 'afternoon' | 'evening',
  ) => {
    const sectionSlots = timeSlots.filter(slot => slot.period === period);

    return (
      <View key={period} style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.timeSlotsGrid}>
          {sectionSlots.map(timeSlot => renderTimeSlot(timeSlot))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        {renderSection('Morning', 'morning')}
        {renderSection('Afternoon', 'afternoon')}
        {renderSection('Evening', 'evening')}
      </ScrollView>
    </View>
  );
};

const {width} = Dimensions.get('window');
const itemWidth = (width - 100) / 3; // 3 columns with padding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 16,
    marginLeft: 4,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeContainer: {
    width: itemWidth,
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  selectedTimeContainer: {
    backgroundColor: '#3A643B',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
  },
  selectedTimeText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default TimeScroll;
