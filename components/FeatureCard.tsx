import { formatPrice } from '@/lib/utils'
import { Property } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function FeatureCard({ Property: property }: { Property: Property }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className='bg-white rounded-xl border border-gray-200 overflow-hidden w-72'
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
        opacity: property.is_sold ? 0.5 : 1,
      }}
      onPress={() => router.push(`/(root)/property/${property.id}` as any)}
    >
      <Image
        source={{ uri: property.images[0] }}
        resizeMode='cover'
        className='w-full h-44'
      />

      {/* Property type badge */}
      <View className='absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full'>
        <Text className='text-xs font-bold text-primary capitalize'>{property.type}</Text>
      </View>

      {/* Sold badge */}
      {property.is_sold && (
        <View className='absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full'>
          <Text className='text-xs font-bold text-white'>Sold</Text>
        </View>
      )}

      <View className='p-4'>
        <Text className='text-lg font-bold text-gray-800 mb-1' numberOfLines={1}>
          {property.title}
        </Text>

        <View className='flex-row items-center gap-1 mb-3'>
          <MaterialIcons name='location-on' size={14} color='#6B7280' />
          <Text className='text-gray-500 text-sm flex-1' numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        <Text className='text-lg font-bold text-primary mb-2'>
          {formatPrice(property.price)}
        </Text>

        <View className='flex-row items-center gap-3'>
          <View className='flex-row items-center gap-1'>
            <MaterialIcons name='bed' size={14} color='#6B7280' />
            <Text className='text-gray-500 text-sm'>{property.bedrooms} Bed</Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <MaterialIcons name='bathtub' size={14} color='#6B7280' />
            <Text className='text-gray-500 text-sm'>{property.bathrooms} Bath</Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <MaterialIcons name='straighten' size={14} color='#6B7280' />
            <Text className='text-gray-500 text-sm'>{property.area_sqft} sqft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}