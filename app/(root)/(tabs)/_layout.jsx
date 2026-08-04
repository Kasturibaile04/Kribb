import { NativeTabs, Icon, Label, VectorIcon } from 'expo-router/unstable-native-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
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