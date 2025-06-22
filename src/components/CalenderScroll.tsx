import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface CalendarDate {
  date: number;
  day: string;
  month: string;
  isSelected?: boolean;
}

interface CalendarScrollProps {
  selectedDate?: number;
  onDateSelect?: (date: CalendarDate) => void;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const CalendarScroll: React.FC<CalendarScrollProps> = ({
  onDateSelect,
  selected,
  setSelected,
}) => {
  const calendarDates: CalendarDate[] = [
    {date: 6, day: 'Friday', month: 'Feb'},
    {date: 7, day: 'Saturday', month: 'Feb'},
    {date: 8, day: 'Sunday', month: 'Feb'},
    {date: 9, day: 'Monday', month: 'Feb'},
    {date: 10, day: 'Tuesday', month: 'Feb'},
    {date: 11, day: 'Wednesday', month: 'Feb'},
    {date: 12, day: 'Thursday', month: 'Feb'},
    {date: 13, day: 'Friday', month: 'Feb'},
    {date: 14, day: 'Saturday', month: 'Feb'},
    {date: 15, day: 'Sunday', month: 'Feb'},
    {date: 16, day: 'Monday', month: 'Feb'},
    {date: 17, day: 'Tuesday', month: 'Feb'},
    {date: 18, day: 'Wednesday', month: 'Feb'},
    {date: 19, day: 'Thursday', month: 'Feb'},
    {date: 20, day: 'Friday', month: 'Feb'},
    {date: 21, day: 'Saturday', month: 'Feb'},
    {date: 22, day: 'Sunday', month: 'Feb'},
    {date: 23, day: 'Monday', month: 'Feb'},
    {date: 24, day: 'Tuesday', month: 'Feb'},
    {date: 25, day: 'Wednesday', month: 'Feb'},
  ];

  const handleDatePress = (dateItem: CalendarDate) => {
    setSelected(dateItem.date);
    if (onDateSelect) {
      onDateSelect(dateItem);
    }
  };

  const renderDateItem = (dateItem: CalendarDate) => {
    const isSelected = selected === dateItem.date;

    return (
      <TouchableOpacity
        key={dateItem.date}
        style={[
          styles.dateContainer,
          isSelected && styles.selectedDateContainer,
        ]}
        onPress={() => handleDatePress(dateItem)}
        activeOpacity={0.7}>
        <Text
          style={[styles.dateNumber, isSelected && styles.selectedDateNumber]}>
          {dateItem.date.toString().padStart(2, '0')} {dateItem.month}
        </Text>
        <Text style={[styles.dayName, isSelected && styles.selectedDayName]}>
          {dateItem.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {calendarDates.map(dateItem => renderDateItem(dateItem))}
        </View>
      </ScrollView>
    </View>
  );
};

const {width} = Dimensions.get('window');
const itemWidth = (width - 100) / 3;

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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dateContainer: {
    width: itemWidth,
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
  },
  selectedDateContainer: {
    backgroundColor: '#3A643B',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  selectedDateNumber: {
    color: '#ffffff',
  },
  dayName: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '400',
  },
  selectedDayName: {
    color: '#ffffff',
  },
});

export default CalendarScroll;
