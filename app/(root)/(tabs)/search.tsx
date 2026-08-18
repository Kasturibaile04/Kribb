import FilterModel from '@/components/FilterModel'
import PropertyCard from '@/components/PropertyCard'
import { supabase } from '@/lib/supabase'
import { useFilterStore } from '@/store/filterStore'
import { Property } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

  useEffect(() => {
    fetchResults();
  }, [search, type, bedrooms, minPrice, maxPrice]);

  const fetchResults = async () => {
    setLoading(true);

    let query = supabase.from('properties').select('*');

    if (search) {
      query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%`);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (bedrooms) {
      query = query.eq('bedrooms', bedrooms);
    }

    if (minPrice) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice) {
      query = query.lte('price', maxPrice);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      return;
    }

    setResults(data || []);
    setLoading(false);
  }

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
        {activeFilterCount > 0 && (
          <View className='flex-row gap-2 mt-4'>
            {type && (
              <View className='flex-row items-center bg-blue-50 border
              border-blue-200 rounded-full px-3 py-1.5'>
                <Text className='text-blue-700 font-medium mr-1'>Type: {type}</Text>
                <TouchableOpacity onPress={() => setType(null)}>
                  <MaterialIcons name='close' size={16} color='#2563EB' />
                </TouchableOpacity>
              </View>
            )}
            {bedrooms && (
              <View className='flex-row items-center bg-blue-50 border
              border-blue-200 rounded-full px-3 py-1.5'>
                <Text className='text-blue-700 font-medium mr-1'>Bedrooms: {bedrooms}</Text>
                <TouchableOpacity onPress={() => setBedrooms(null)}>
                  <MaterialIcons name='close' size={16} color='#2563EB' />
                </TouchableOpacity>
              </View>
            )}
            {minPrice && (
              <View className='flex-row items-center bg-blue-50 border
              border-blue-200 rounded-full px-3 py-1.5'>
                <Text className='text-blue-700 font-medium mr-1'>Min Price: ₹{minPrice}</Text>
                <TouchableOpacity onPress={() => {
                  setMinPrice(null);
                  setMaxPrice(null);
                }}>
                  <MaterialIcons name='close' size={16} color='#2563EB' />
                </TouchableOpacity>
              </View>
            )}
            {maxPrice && (
              <View className='flex-row items-center bg-blue-50 border
              border-blue-200 rounded-full px-3 py-1.5'>
                <Text className='text-blue-700 font-medium mr-1'>Max Price: ₹{maxPrice}</Text>
                <TouchableOpacity onPress={() => {
                  setMaxPrice(null);
                  setMinPrice(null);
                }}>
                  <MaterialIcons name='close' size={16} color='#2563EB' />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
      {/* Result */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}

        renderItem={({ item }) => (
          <PropertyCard property={item} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          loading ? (
            <View className='items-center justify-center mt-12'>
              <ActivityIndicator size='large' color='#2563EB' />
              <Text className='text-gray-500 mt-2'>Searching...</Text>
            </View>

          ) : null
        }
        
        ListEmptyComponent={
          !loading && results.length === 0 ? (
            <View className='items-center justify-center mt-12'>
              <MaterialIcons name='search' size={48} color='#9CA3AF' />
              <Text className='text-gray-500 mt-2'>No properties found</Text>
              <Text className='text-gray-500 mt-2'>
                Try adjusting your search or filters.
              </Text>
            </View>
          ) : (
            <ActivityIndicator size='large' color='#2563EB'
            className='py-20' />
          )
        }
      />



      {/* FilterModel */}
      <FilterModel
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </SafeAreaView>
  )
}
