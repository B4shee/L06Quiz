import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { quizData } from './Uma';

const UmamusumeQuiz = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({
        1: '',
        2: '',
        3: '',
    });

    const handleSelect = (questionId, value) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const getFeedbackMessage = (score, total) => {
        const ratio = score / total;

        if (ratio === 1) {
            return "Mission complete! Hehe! We had it in the bag!";
        } else if (ratio >= 0.75) {
            return "So much has happened...";
        } else if (ratio >= 0.5) {
            return "Ugh, you're supposed to match my vibe!";
        } else if (ratio > 0) {
            return "There's nothing more to say.";
        } else {
            return "There'd better be some logic to your training.";
        }
    };

    const handleSubmit = () => {
        let score = 0;
        quizData.forEach((item) => {
            if (selectedAnswers[item.id] === item.correctAnswer) {
                score += 1;
            }
        });

        const feedback = getFeedbackMessage(score, quizData.length);

        Alert.alert(
            'Quiz Results',
            ` You got ${score} out of ${quizData.length} correct!\n\n${feedback}`,
            [{ text: 'OK' }]
        );
    };

    return (
        <ScrollView style={{ padding: 16 }}>
            {/* Title Logo Image */}
            <Image
                source={{ uri: 'https://static.wikia.nocookie.net/logopedia/images/4/4f/Uma_Musume_Pretty_Derby_JP_Logo.png/revision/latest?cb=20250717043740' }}
                style={{ width: 250, height: 100, alignSelf: 'center', marginVertical: 10 }}
                resizeMode="contain"
            />
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
                Pretty Derby Quiz
            </Text>

            {quizData.map((item, index) => (
                <View key={item.id} style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
                        Question {index + 1}: Who is this Umamusume?
                    </Text>

                    <Image
                        source={item.image}
                        style={{ width: 250, height: 250, alignSelf: 'center' }}
                        resizeMode="contain"
                    />

                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 10 }}>
                        <Picker
                            selectedValue={selectedAnswers[item.id]}
                            onValueChange={(itemValue) => handleSelect(item.id, itemValue)}
                        >
                            <Picker.Item label="Select an answer..." value="" />
                            {item.options.map((option, optIdx) => (
                                <Picker.Item key={optIdx} label={option} value={option} />
                            ))}
                        </Picker>
                    </View>
                </View>
            ))}

            <Button title="Submit Answers" onPress={handleSubmit} />
        </ScrollView>
    );
};

export default UmamusumeQuiz;