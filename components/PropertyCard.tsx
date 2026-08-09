import { formatPrice } from '@/lib/utils'
import { Property } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function PropertyCard({
    property,
    onUnsave,
    showSave = false,
}: {
    property: Property;
    onUnsave?: () => void;
    showSave?: boolean;
}) {
    const router = useRouter();

    const isSaved = true;

    return (
        <TouchableOpacity
            className='flex-row bg-white rounded-2xl mb-4 overflow-hidden'
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
                className='w-28 h-28'
            />

            <View className='flex-1 p-3 justify-between'>
                <View>
                    <Text className='text-lg font-bold text-gray-800' numberOfLines={1}>
                        {property.title}
                    </Text>
                    <View className='flex-row items-center gap-1'>
                        <MaterialIcons name='location-on' size={14} color='#6B7280' />
                        <Text className='text-gray-500 text-sm flex-1' numberOfLines={1}>
                            {property.city}
                        </Text>
                    </View>
                </View>

                <View className='flex-row items-center justify-between mt-2'>
                    <Text className='text-lg font-bold text-primary'>
                        {formatPrice(property.price)}
                    </Text>
                    <View className='flex-row items-center gap-1'>
                        <MaterialIcons name='bed' size={14} color='#6B7280' />
                        <Text className='text-gray-500 text-sm'>{property.bedrooms} Bed</Text>
                    </View>
                    <View className='flex-row items-center gap-1'>
                        <MaterialIcons name='bathtub' size={14} color='#6B7280' />
                        <Text className='text-gray-500 text-sm'>{property.bathrooms} Bath</Text>
                    </View>
                </View>
            </View>

            {/* Save / Unsave button */}
            <TouchableOpacity className='w-10 items-center pt-3' onPress={onUnsave}>
                <MaterialIcons
                    name={showSave ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={showSave ? 'red' : '#6B7280'}
                />
            </TouchableOpacity>

            {/* Full-card SOLD overlay */}
            {property.is_sold && (
                <View className='absolute inset-0 bg-black/40 items-center justify-center rounded-2xl'>
                    <Text className='text-white text-xl font-bold tracking-widest'>SOLD</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
