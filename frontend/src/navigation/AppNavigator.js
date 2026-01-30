import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import GarmentGalleryScreen from '../screens/main/GarmentGalleryScreen';
import TryOnScreen from '../screens/main/TryOnScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import GarmentManagementScreen from '../screens/admin/GarmentManagementScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0f0f23' },
        }}
    >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => {
    const { isAdmin } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1a1a2e',
                    borderTopColor: '#2d2d44',
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarActiveTintColor: '#6366f1',
                tabBarInactiveTintColor: '#888',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Gallery"
                component={GarmentGalleryScreen}
                options={{
                    tabBarLabel: 'Gallery',
                }}
            />
            <Tab.Screen
                name="TryOn"
                component={TryOnScreen}
                options={{
                    tabBarLabel: 'Try-On',
                }}
            />
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'History',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                }}
            />
            {isAdmin && (
                <Tab.Screen
                    name="Admin"
                    component={AdminDashboardScreen}
                    options={{
                        tabBarLabel: 'Admin',
                    }}
                />
            )}
        </Tab.Navigator>
    );
};

// Main Stack with Settings and Admin screens
const MainStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '600',
            },
            contentStyle: { backgroundColor: '#0f0f23' },
        }}
    >
        <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
        />
        <Stack.Screen
            name="UserManagement"
            component={UserManagementScreen}
            options={{ title: 'User Management' }}
        />
        <Stack.Screen
            name="GarmentManagement"
            component={GarmentManagementScreen}
            options={{ title: 'Garment Management' }}
        />
    </Stack.Navigator>
);

// Root Navigator
const AppNavigator = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f23' }}>
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
