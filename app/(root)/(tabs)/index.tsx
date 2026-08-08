import { useSupabase } from '@/lib/useSupabase'
import { Property } from '@/types'
import { useUser } from '@clerk/expo'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'


export default function HomeScreen() {
    const { user } = useUser();
    const router = useRouter();

    const [featured, setFeatured] = useState<Property[]>([]);
    const [recommended, setRecommended] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);

    const supabase = useSupabase();

    console.log(featured, recommended);


    const fetchProperties = async () => {
        setLoading(true);
        try {
            const { data: featuredData } = await supabase
                .from("properties")
                .select("*")
                .eq("is_featured", true)
                .order("created_at", { ascending: false });

            // Browse all non-featured listings
            const { data: recommendedData } = await supabase
                .from("properties")
                .select("*")
                .eq("is_featured", false)
                .order("created_at", { ascending: false });


            setFeatured(featuredData ?? []);
            setRecommended(recommendedData ?? []);
        } catch (error) {
            console.log("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch whenever this screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchProperties();
        }, [])
    );

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                data={recommended}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View className="px-4 pt-4 pb-2">
                        {/* Header */}
                        <View className='flex-row items-center justify-between px-5 pt-4 pb-4'>
                            <Image source={require('@/assets/images/kribb.png')}
                                style={{ width: 90, height: 36 }}
                                resizeMode='contain' />

                            <View className='item-end'>
                                <Text>Good Morning</Text>
                                <Text className='text-grey-900 text-base font-bold'>{user?.fullName ?? 'User'}</Text>

                            </View>
                        </View>

                        {/* Search Bar */}
                        <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/search')}
                            className='flex-row items-center bg-white rounded-xl px-4 py-3 mx-5 shadow-sm'
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.06,
                                shadowRadius: 6,
                                elevation: 2,
                            }}>

                            <FontAwesome name='search' size={20} color='#6B7280' />
                            <Text className='text-gray-500 ml-3'>Search Properties</Text>
                            <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/search ? openFilter=true')}
                            className='w-8 h-8 bg-black-600 rounded-xl items-center justify-center'>
                                <FontAwesome name='filter' size={20} color='#6B7280' />
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {/* Featured Properties */}
                        <View className='px-5 mt-6'>
                            <View className='flex-row items-center justify-between'>
                                <Text className='text-2xl font-bold text-black'>Featured Properties</Text>
                                {loading ? <ActivityIndicator size="small" color="#000" /> : (
                                    <TouchableOpacity>
                                        <Text className='text-blue-600'>See All</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <FlatList
                                data={featured}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                renderItem={({ item }) => (
                                    <Feature className="mx-4 mb-3 bg-white rounded-xl p-4 shadow-sm">
                                        <Text className="text-lg font-semibold">{item.title}</Text>
                                        <Text className="text-gray-500">{item.address}, {item.city}</Text>
                                        <Text className="text-black font-bold mt-1">₹{item.price.toLocaleString()}</Text>
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <View className="flex-1 justify-center items-center mt-20">
                                        <Text className="text-gray-400 text-lg">No properties found</Text>
                                    </View>
                                }
                            />
                        </View>

                        {/* Recommended Properties */}
                        <Text className="text-2xl font-bold text-black px-5">Recommended Properties</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="mx-4 mb-3 bg-white rounded-xl p-4 shadow-sm">
                        <Text className="text-lg font-semibold">{item.title}</Text>
                        <Text className="text-gray-500">{item.address}, {item.city}</Text>
                        <Text className="text-black font-bold mt-1">₹{item.price.toLocaleString()}</Text>
                    </View>

                )}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text className="text-gray-400 text-lg">No properties found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}
