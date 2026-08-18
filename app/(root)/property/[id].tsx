import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PropertyDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <SafeAreaView className='flex-1 bg-gray-50 items-center justify-center'>
            <Text className='text-lg font-bold text-gray-800'>Property ID: {id}</Text>
            <Text className='text-gray-500 mt-2'>Detail screen coming soon</Text>
        </SafeAreaView>
        

    )
}
