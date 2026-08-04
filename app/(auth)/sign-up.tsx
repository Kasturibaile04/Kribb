import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useSignUp, useAuth } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'

export default function SignUp() {
  const { signUp, fetchStatus,errors} = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  const isloading = fetchStatus === 'fetching'

  const onSignUpPress = async () => {
  const {error} = await signUp.password({
    emailAddress: email,
    password,
    firstName: fullName,
    lastName: fullName,
  })

  if (error) {
    alert(error.message)
    return;
  }
  if(!error) await signUp.verifications.sendEmailCode();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require('@/assets/images/kribb.png')}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-black mb-2">
          Welcome to Kribb
        </Text>
        <Text className="text-gray-600 text-base mb-8">
          Join our community and connect with people around you
        </Text>
        

        <View className="space-y-4">
          {/* Full Name Input */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
            <FontAwesome name="user" size={20} color="#6B7280" />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-black ml-3"
              autoCapitalize="words"
              placeholder="Full Name"
            />
          </View>

          {/* Email Input */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
            <FontAwesome name="envelope" size={20} color="#6B7280" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-black ml-3"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
            />
          </View>
            {errors.fields.emailAddress && 
            <Text className='text-red-500'>
                {errors.fields.emailAddress.message}
                </Text>}

          {/* Password Input */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
            <FontAwesome name="lock" size={20} color="#6B7280" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-black ml-3"
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry
            />
          </View>
            {errors.fields.password && 
            <Text className='text-red-500'>
                {errors.fields.password.message}
            </Text>}
            
          <TouchableOpacity onPress={onSignUpPress}
          disabled={isloading} className='bg-black rounded-lg px-4 py-3 mt-4 py-5'>
            {isloading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className='text-white text-center font-bold'>Sign Up</Text>
            )}
          </TouchableOpacity>
          <View className='flex-row justify-center mt-6'>
            <Text className='text-gray-600'>Already have an account?</Text>
            <Link href="/sign-in">
                <Text className='text-black font-bold ml-2'>Sign In</Text>
            </Link>
      </View>
         

        <View nativeID='clerk-captcha'/>
       </View>
      </View>
    </ScrollView>
  )
}