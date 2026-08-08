import { useSignIn } from '@clerk/expo/legacy'
import { FontAwesome } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SignIn() {
  const { signIn, isLoaded, setActive } = useSignIn()
  const router = useRouter()

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  // UI state
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)

  // --- STEP 1: SIGN IN WITH EMAIL & PASSWORD ---
  const onSignInPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    setErrorMessage('')

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      // If sign-in is complete (no 2FA), activate session
      // (auth)/_layout.tsx will automatically redirect when isSignedIn becomes true
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
      } else if (result.status === 'needs_second_factor') {
        // MFA / email code required
        setPendingVerification(true)
      } else {
        console.log('Sign in status:', result.status)
      }
    } catch (err: any) {
      setErrorMessage(err?.errors?.[0]?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  // --- STEP 2: VERIFY CODE (if 2FA is required) ---
  const onVerifyPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    setErrorMessage('')

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: 'totp',
        code,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        // (auth)/_layout.tsx will automatically redirect when isSignedIn becomes true
      } else {
        console.log('Verification status:', result.status)
      }
    } catch (err: any) {
      setErrorMessage(err?.errors?.[0]?.message || 'Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  // --- VIEW 2: CODE VERIFICATION SCREEN ---
  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center px-6 py-12 bg-white">
        <Image
          source={require('@/assets/images/kribb.png')}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-black mb-2">
          Verify your identity
        </Text>
        <Text className="text-gray-600 text-base mb-8">
          Enter the verification code sent to your device.
        </Text>

        <View className="space-y-4">
          {/* Code Input */}
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

          {errorMessage ? (
            <Text className="text-red-500 font-medium mb-2">{errorMessage}</Text>
          ) : null}

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

          <TouchableOpacity onPress={() => setPendingVerification(false)} className="py-2">
            <Text className="text-gray-500 text-center">Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // --- VIEW 1: EMAIL & PASSWORD SIGN IN FORM ---
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
          Welcome back
        </Text>
        <Text className="text-gray-600 text-base mb-8">
          Sign in to continue to Kribb
        </Text>

        <View className="space-y-4">
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

          {errorMessage ? (
            <Text className="text-red-500 font-medium mb-2">{errorMessage}</Text>
          ) : null}

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={loading}
            className="bg-black rounded-lg px-4 py-3 mt-2"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Don't have an account?</Text>
            <Link href="/sign-up">
              <Text className="text-black font-bold ml-2">Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
