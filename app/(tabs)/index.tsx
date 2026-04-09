import { router, Stack } from 'expo-router';
import { Delete, Hourglass } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useHistory } from '../../context/CalculatorContext';


const { width, height } = Dimensions.get('window');

type ButtonType = 'number' | 'operator' | 'utility';

interface CalcButtonProps {
  label: string;
  type: ButtonType;
  onPress: (label: string) => void;
}

interface ButtonData {
  label: string;
  type: ButtonType;
}

const COLORS = {
  bg: '#1C1C1C',
  number: '#505050',
  operator: '#757575',
  utility: '#AFAFAF',
  text: '#000000',
};

const CalcButton: React.FC<CalcButtonProps> = ({ label, type, onPress }) => {
  let bgColor = COLORS.number;
  if (type === 'operator') bgColor = COLORS.operator;
  else if (type === 'utility') bgColor = COLORS.utility;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={() => onPress(label)}
      activeOpacity={0.7}
    >
      {label === 'backspace' ? <Delete size={24} color={COLORS.text} /> : <Text style={styles.buttonText}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default function CalculatorScreen() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const { addToHistory } = useHistory();

  const handleButtonPress = (target: string) => {
    if (target === 'AC') {
      setInput('');
      setResult('');
      return;
    }

    if (target === 'backspace') {
      setInput(input.slice(0, -1));
      return;
    }

    if (target === '=') {
      calculateResults();
      return;
    }

    let val = target;
    if (val === '( )') {
      const openBrackets = (input.match(/\(/g) || []).length;
      const closeBrackets = (input.match(/\)/g) || []).length;
      val = openBrackets === closeBrackets ? '(' : ')';
    }

    setInput((prev) => prev + val);
  };

  const calculateResults = () => {
    try {
      let formattedInput = input
        .replace(/X/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100')
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**');

      const evalResult = new Function('return ' + formattedInput)();
      setResult(evalResult.toString());

      const finalResult = evalResult.toString();
      setResult(finalResult);

      if (input && input !== finalResult) {
        addToHistory(input, finalResult);
      }
    }
    catch (error) {
      setResult('Error');
    }
  }

  const buttons: ButtonData[] = [
    { label: '√', type: 'operator' }, { label: 'π', type: 'operator' }, { label: '^', type: 'operator' }, { label: '!', type: 'operator' },
    { label: 'AC', type: 'utility' }, { label: '( )', type: 'operator' }, { label: '%', type: 'operator' }, { label: '÷', type: 'operator' },
    { label: '7', type: 'number' }, { label: '8', type: 'number' }, { label: '9', type: 'number' }, { label: 'X', type: 'operator' },
    { label: '4', type: 'number' }, { label: '5', type: 'number' }, { label: '6', type: 'number' }, { label: '-', type: 'operator' },
    { label: '1', type: 'number' }, { label: '2', type: 'number' }, { label: '3', type: 'number' }, { label: '+', type: 'operator' },
    { label: '0', type: 'number' }, { label: '.', type: 'number' }, { label: 'backspace', type: 'number' }, { label: '=', type: 'operator' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={styles.displayContainer}>
        <TouchableOpacity style={styles.historyBtn} onPress={() => { router.push('/history' as any) }}>
          <Hourglass size={24} color={COLORS.utility} />
        </TouchableOpacity>

        <View style={styles.textWrapper}>
          <Text style={styles.inputText} numberOfLines={1} adjustsFontSizeToFit={true}>
            {input || '0'}
          </Text>
          <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit={true}>
            {result ? `= ${result}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        {buttons.map((btn, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <CalcButton label={btn.label} type={btn.type} onPress={handleButtonPress} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  displayContainer: {
    height: height * 0.35,
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  historyBtn: { position: 'absolute', top: 55, right: 20, padding: 10 },
  textWrapper: { alignItems: 'flex-end', width: '100%' },
  inputText: { color: '#FFFFFF', fontSize: 48, fontWeight: '300' },
  resultText: { color: COLORS.utility, fontSize: 24, marginTop: 10 },
  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 12, marginTop: -115 },
  buttonWrapper: { width: '25%', aspectRatio: 1, padding: 6 },
  button: { flex: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 22, fontWeight: '600', color: COLORS.text },
});