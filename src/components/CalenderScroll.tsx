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
  fullDate: Date;
  date: number;
  day: string;
  month: string;
  isSelected?: boolean;
}

interface CalendarScrollProps {
  baseDateISO: string;
  selectedDateISO: string;
  onDateSelect: (selectedDate: Date) => void;
}

const CalendarScroll: React.FC<CalendarScrollProps> = ({
  baseDateISO,
  selectedDateISO,
  onDateSelect,
}) => {
  const baseDate = new Date(baseDateISO);
  const selectedDateOnly = new Date(selectedDateISO).toDateString();

  const generateFutureDates = (): CalendarDate[] => {
    const dates: CalendarDate[] = [];

    for (let i = 0; i < 15; i++) {
      const newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + i);

      const dayName = newDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });
      const monthShort = newDate.toLocaleDateString('en-US', {
        month: 'short',
      });

      dates.push({
        fullDate: newDate,
        date: newDate.getDate(),
        day: dayName,
        month: monthShort,
      });
    }

    return dates;
  };

  const calendarDates = generateFutureDates();

  const renderDateItem = (item: CalendarDate) => {
    const isSelected = item.fullDate.toDateString() === selectedDateOnly;

    return (
      <TouchableOpacity
        key={item.fullDate.toISOString()}
        style={[
          styles.dateContainer,
          isSelected && styles.selectedDateContainer,
        ]}
        onPress={() => {
          const year = item.fullDate.getFullYear();
          const month = (item.fullDate.getMonth() + 1)
            .toString()
            .padStart(2, '0');
          const day = item.fullDate.getDate().toString().padStart(2, '0');

          const isoDateWithoutTime = `${year}-${month}-${day}T00:00:00`;
          onDateSelect(new Date(isoDateWithoutTime));
        }}
        activeOpacity={0.7}>
        <Text
          style={[styles.dateNumber, isSelected && styles.selectedDateNumber]}>
          {item.date.toString().padStart(2, '0')} {item.month}
        </Text>
        <Text style={[styles.dayName, isSelected && styles.selectedDayName]}>
          {item.day}
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
          {calendarDates.map(renderDateItem)}
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
