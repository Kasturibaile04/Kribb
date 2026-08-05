import { useAuth } from '@clerk/expo'
import { useSignUp } from '@clerk/expo/legacy'
import { FontAwesome } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SignUp() {
  // 1. Clerk Hooks
  const { signUp, isLoaded, setActive } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  // 2. Form Inputs State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  // 3. UI State for Loading & Error Messages
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Hide component if already signed in
  if (signUp?.status === 'complete' || isSignedIn) {
    return null
  }

  // --- STEP 1: HANDLE INITIAL SIGN UP ---
  const onSignUpPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    setErrorMessage('') // Clear previous errors

    try {
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Create sign up with Clerk
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch (err: any) {
      // Catch and display Clerk error messages
      setErrorMessage(err?.errors?.[0]?.message || 'Something went wrong during sign up')
    } finally {
      setLoading(false)
    }
  }

  // --- STEP 2: HANDLE CODE VERIFICATION & REDIRECT ---
  const onVerifyPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    setErrorMessage('') // Clear previous errors

    try {
      // Verify code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If code is correct and sign up is complete
      if (completeSignUp.status === 'complete') {
        // Activate session to log user in on the device
        await setActive({ session: completeSignUp.createdSessionId })

        // Redirect to main tabs/home screen
        router.replace('/')
      } else {
        console.log('Sign up status not complete:', completeSignUp)
      }
    } catch (err: any) {
      setErrorMessage(err?.errors?.[0]?.message || 'Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  // --- VIEW 2: VERIFICATION SCREEN ---
  if (
    signUp?.status === 'missing_requirements' &&
    signUp?.unverifiedFields?.includes('email_address')
  ) {
    return (
      <View className="flex-1 justify-center px-6 py-12 bg-white">
        <Image
          source={require('@/assets/images/kribb.png')}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-black mb-2">
          Welcome to Kribb
        </Text>
        <Text className="text-gray-600 text-base mb-8">
          We sent a verification code to your email address
        </Text>

        <View className="space-y-4">
          {/* Verification Code Input */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-2">
            <FontAwesome name="key" size={20} color="#6B7280" />
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-black ml-3"
              keyboardType="number-pad"
              placeholder="Verification Code"
            />
          </View>

          {/* Error Message Display */}
          {errorMessage ? (
            <Text className="text-red-500 font-medium mb-2">{errorMessage}</Text>
          ) : null}

          {/* Verify Button */}
          <TouchableOpacity
            onPress={onVerifyPress}
            disabled={loading}
            className="bg-black rounded-lg px-4 py-3 mt-2"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold">Verify</Text>
            )}
          </TouchableOpacity>

          {/* Resend Code Button */}
          <TouchableOpacity
            onPress={() => signUp.prepareEmailAddressVerification({ strategy: 'email_code' })}
            className="py-2"
          >
            <Text className="text-black text-center font-bold">Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // --- VIEW 1: INITIAL SIGN UP FORM ---
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

          {/* Password Input */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-2">
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

          {/* Error Message Display */}
          {errorMessage ? (
            <Text className="text-red-500 font-medium mb-2">{errorMessage}</Text>
          ) : null}

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={onSignUpPress}
            disabled={loading}
            className="bg-black rounded-lg px-4 py-3 mt-2"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-black font-bold ml-2">Sign In</Text>
            </Link>
          </View>

          <View nativeID="clerk-captcha" />
        </View>
      </View>
    </ScrollView>
  )
}