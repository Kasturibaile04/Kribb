import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Property } from '@/types'
import { useRouter } from 'expo-router'

export default function FeatureCard({Property}: {Property: Property}) {
    const router = useRouter();
  return (
    <TouchableOpacity>
        <Image source={{uri: Property.images[0]}}
        style={{width: 200, height: 200}}
        resizeMode='cover'
        className='rounded-xl w-full h-44'
        />
    </TouchableOpacity>
  )
}