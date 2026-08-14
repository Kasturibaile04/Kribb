import { useFilterStore } from '@/store/filterStore'
import { PropertyType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const TYPES: { label: string; value: PropertyType | null }[] = [
    { label: "All", value: null },
    { label: "Apartment", value: "apartment" },
    { label: "House", value: "house" },
    { label: "Villa", value: "villa" },
    { label: "Studio", value: "studio" },
];

const BEDS = [
    { label: "Any", value: null },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
];

const PRICE_PRESETS = [
    { label: "Under ₹50L", min: null, max: 5000000 },
    { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr – ₹2Cr", min: 10000000, max: 20000000 },
    { label: "Above ₹2Cr", min: 20000000, max: null },
];

const chip = (active: boolean) =>
    `px-4 py-2 rounded-full border ${active ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
    }`;

const chipText = (active: boolean) =>
    `text-sm font-semibold ${active ? "text-white" : "text-gray-600"}`;


export default function FilterModel({ visible, onClose }: {
    visible: boolean;
    onClose: () => void;
}) {
    const {
        type,
        bedrooms,
        bathrooms,
        minPrice,
        maxPrice,
        setType,
        setBedrooms,
        setBathrooms,
        setMinPrice,
        setMaxPrice,
        resetFilters } = useFilterStore();

    const [localMinPrice, setLocalMinPrice] = useState(minPrice ? String(minPrice) : '');
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice ? String(maxPrice) : '');

    const handleReset = () => {
        setLocalMinPrice('');
        setLocalMaxPrice('');
        resetFilters();
        onClose();
    }

    const activeCount = [type, bedrooms, bathrooms, minPrice, maxPrice].filter(
        (v) => v !== null,
    ).length;

    const handleApply = () => {
        setMinPrice(localMinPrice ? Number(localMinPrice) : null);
        setMaxPrice(localMaxPrice ? Number(localMaxPrice) : null);
        onClose();
    }

    const shadow = {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent
            presentationStyle='pageSheet'
            onRequestClose={onClose}
        >
            <View className='flex-1 bg-gray-50 justify-end'>
                <View className='flex-row justify-between items-center p-4 bg-white border-b border-gray-200 px-5 pt-6 pb-8'>
                    {/* <Text className='text-xl font-bold'>Filter</Text> */}
                    <TouchableOpacity onPress={onClose} className='p-1'>
                        <Ionicons name='close-outline' size={24} color='black' />
                    </TouchableOpacity>

                    <Text className='text-lg font-bold text-gray-900'>Filters</Text>
                    <TouchableOpacity onPress={handleReset}>
                        <Text className='text-blue-600 font-semibold'>Reset</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className='flex-1'
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 40,

                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text className='text-gray-700 font-semibold mb-4'>Property Type</Text>
                    <View className='flex-row flex-wrap gap-2 mb-6'>
                        {TYPES.map((t) => (
                            <TouchableOpacity
                                key={t.value || 'all'}
                                onPress={() => setType(t.value)}
                                className={chip(type === t.value)}
                            >
                                <Text className={chipText(type === t.value)}>{t.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className='text-gray-700 font-semibold mb-4'>Bedrooms</Text>
                    <View className='flex-row flex-wrap gap-2 mb-6'>
                        {BEDS.map((b) => (
                            <TouchableOpacity
                                key={b.value || 'any'}
                                onPress={() => setBedrooms(b.value)}
                                className={chip(bedrooms === b.value)}
                            >
                                <Text className={chipText(bedrooms === b.value)}>{b.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className='text-gray-700 font-semibold mb-4'>Price Range (₹)</Text>
                    <View className='flex-row gap-3 mb-6'>
                        {[
                            {
                                label: "Min Price",
                                value: localMinPrice,
                                placeholder: "0",
                                onChangeText: setLocalMinPrice,
                            },
                            {
                                label: "Max Price",
                                value: localMaxPrice,
                                placeholder: "Any",
                                onChangeText: setLocalMaxPrice,
                            }
                        ].map(({ label, value, onChangeText, placeholder }) => (
                            <View key={label} className='flex-1'>
                                <Text className='text-gray-700 font-semibold mb-2'>{label}</Text>
                                <TextInput
                                    className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
                                    placeholder={placeholder}
                                    keyboardType='numeric'
                                    value={value}
                                    onChangeText={onChangeText}
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        ))}
                    </View>
                    <Text className='text-gray-700 font-semibold mb-4'>Price Presets</Text>
                    <View className='flex-row flex-wrap gap-2 mb-6'>
                        {PRICE_PRESETS.map((p) => {
                            const isActive = minPrice === p.min && maxPrice === p.max;
                            return (
                                <TouchableOpacity
                                    key={p.label}
                                    onPress={() => {
                                        setMinPrice(p.min);
                                        setMaxPrice(p.max);
                                        setLocalMinPrice(p.min ? String(p.min) : '');
                                        setLocalMaxPrice(p.max ? String(p.max) : '');
                                    }}
                                    className={chip(isActive)}
                                >
                                    <Text className={chipText(isActive)}>{p.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Apply Button */}
                <View className='p-4 border-t border-gray-200 bg-white'>
                    <TouchableOpacity
                        onPress={handleApply}
                        className='bg-blue-600 py-4 rounded-xl items-center'
                    >
                        <Text className='text-white font-bold text-lg text-center'>
                            Apply Filters
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

