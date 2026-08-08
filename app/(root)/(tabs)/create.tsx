import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Create() {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <Text className='text-2xl font-bold'>Create</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})