import FilterModel from '@/components/FilterModel'
import { useFilterStore } from '@/store/filterStore'
import { Property } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Search() {
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  const { openFilters } = useLocalSearchParams<{ openFilters: string }>();

  useEffect(() => {
    if (openFilters === 'true') {
      setShowFilters(true);
    }
  }, [openFilters])

  const {
    search,
    type,
    bedrooms,
    minPrice,
    maxPrice,
    setSearch,
    setType,
    setBedrooms,
    setMinPrice,
    setMaxPrice,
    resetFilters
  } = useFilterStore();

  const activeFilterCount = [
    type !== null,
    bedrooms !== null,
    minPrice !== null,
    maxPrice !== null,
    search.length > 0
  ].filter(Boolean).length;

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <View className='px-5 pt-4 pb-3'>
        <Text className='text-2xl font-bold text-gray-800'>
          Find Properties</Text>

        <View className='flex-row items-center gap-3 mt-4'>
          <View className='flex-1 flex-row items-center bg-white border border-gray-300 rounded-lg px-4 gap-3'
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <MaterialIcons name='search' size={20} color='#9CA3AF' />
            <TextInput
              placeholder='Search'
              className='flex-1 py-3.5 text-gray-800'
              value={search}
              onChangeText={setSearch}
              autoCapitalize='none'
            />
            {activeFilterCount > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <MaterialIcons name='close' size={20} color='#9CA3AF' />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity className='bg-primary p-3 rounded-lg' onPress={() => setShowFilters(true)}>
            <MaterialIcons name='filter-alt' size={20} color={activeFilterCount > 0 ? '#fff' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
        {/* Filter chips */}
      </View>
      {/* Result */}

      {/* FilterModel */}
      <FilterModel
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </SafeAreaView>
  )
}
