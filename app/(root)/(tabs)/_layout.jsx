import { useUserStore } from '@/store/userStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

function AndroidTabs() {

  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="create"
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="saved"
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}

function IOSTabs() {

  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon src={<VectorIcon family={FontAwesome} name="home" />} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Icon src={<VectorIcon family={FontAwesome} name="search" />} />
        <Label>Search</Label>
      </NativeTabs.Trigger>

      {/* Create Property */}
      {isAdmin && (
        <NativeTabs.Trigger name="create">
          <Icon src={<VectorIcon family={FontAwesome} name="plus" />} />
          <Label>Add Property</Label>
        </NativeTabs.Trigger>
      )}

      <NativeTabs.Trigger name="saved">
        <Icon src={<VectorIcon family={FontAwesome} name="heart" />} />
        <Label>Saved</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon src={<VectorIcon family={FontAwesome} name="user" />} />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

export default function TabLayout() {
  return Platform.OS === "ios" ?
    <IOSTabs /> : <AndroidTabs />;
}
