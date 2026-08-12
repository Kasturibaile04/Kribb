import { StyleSheet, Text, View,Modal } from 'react-native'
import React from 'react'
import { useFilterStore } from '@/store/filterStore'

const {
    type,
    bedrooms,
    bathrooms,
    priceRange,
    parking,
    furnished,
    minPrice,
    maxPrice,
    resetFilters } = useFilterStore();

export default function FilterModel({visible,onClose}:{
    visible:boolean;
    onClose:() => void;
}) {
    if(!visible) return null;

    return (
        <Modal
        visible={visible}
        animationType='slide'
        transparent
        presentationStyle='pageSheet'
        onRequestClose={onClose}
        >
            <View className='flex-1 justify-end'>
                <View className='bg-white rounded-t-2xl p-6'>
                    <Text>FilterModel</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})