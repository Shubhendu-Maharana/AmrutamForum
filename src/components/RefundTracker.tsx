import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface RefundStep {
  id: string;
  title: string;
  date?: string;
  status: 'completed' | 'current' | 'pending';
}

interface RefundTrackerProps {
  steps?: RefundStep[];
}

const RefundTracker: React.FC<RefundTrackerProps> = ({steps}) => {
  const defaultSteps: RefundStep[] = [
    {
      id: '1',
      title: 'Refund requested',
      date: 'Fri, 10th Sep 25, 05:30 PM',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Refund processing',
      date: 'Sat, 11th Sep 25',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Refunded',
      status: 'pending',
    },
  ];

  const [currentSteps, setCurrentSteps] = useState<RefundStep[]>(
    steps || defaultSteps,
  );

  // Auto-complete all steps after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSteps(prevSteps =>
        prevSteps.map(step => ({
          ...step,
          status: 'completed' as const,
          date: step.date || 'Sun, 12th Sep 25, 03:15 PM', // Add date for final step
        })),
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const refundSteps = currentSteps;

  const renderStepIcon = (status: string, isLast: boolean) => {
    const iconStyle = [
      styles.stepIcon,
      status === 'completed' && styles.completedIcon,
      status === 'current' && styles.currentIcon,
      status === 'pending' && styles.pendingIcon,
    ];

    return (
      <View style={styles.stepIconContainer}>
        <View style={iconStyle}>
          {status === 'completed' && <Text style={styles.checkmark}>✓</Text>}
        </View>
        {!isLast && <View style={styles.connector} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track your refund process</Text>

      <View style={styles.stepsContainer}>
        {refundSteps.map((step, index) => (
          <View key={step.id} style={styles.stepRow}>
            {renderStepIcon(step.status, index === refundSteps.length - 1)}

            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              {step.date && <Text style={styles.stepDate}>{step.date}</Text>}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.successMessage}>
        <Ionicons name="information-circle" size={24} color="#3A643B" />
        <Text style={styles.successText}>Refund added to your wallet.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 18,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 32,
  },
  stepsContainer: {
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 16,
    minHeight: 60,
  },
  stepIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  completedIcon: {
    backgroundColor: '#3A643B',
  },
  currentIcon: {
    backgroundColor: '#3A643B',
  },
  pendingIcon: {
    backgroundColor: '#d1d5db',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: '#d1d5db',
    minHeight: 32,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  stepDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E3FFE3',
    padding: 10,
    borderRadius: 6,
  },
  successText: {
    fontSize: 16,
    color: '#000',
  },
});

export default RefundTracker;
