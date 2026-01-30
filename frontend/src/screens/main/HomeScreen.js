import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
    const { user } = useAuth();

    const features = [
        {
            id: 'tryon',
            title: 'Virtual Try-On',
            description: 'Try clothes virtually using AI',
            icon: '👗',
            screen: 'TryOn',
            color: '#6366f1',
        },
        {
            id: 'gallery',
            title: 'Garment Gallery',
            description: 'Browse our collection',
            icon: '🛍️',
            screen: 'Gallery',
            color: '#ec4899',
        },
        {
            id: 'history',
            title: 'Try-On History',
            description: 'View your past try-ons',
            icon: '📜',
            screen: 'History',
            color: '#10b981',
        },
        {
            id: 'profile',
            title: 'My Profile',
            description: 'Manage your account',
            icon: '👤',
            screen: 'Profile',
            color: '#f59e0b',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hello,</Text>
                        <Text style={styles.userName}>{user?.name || 'User'} 👋</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.heroCard}>
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>AI Virtual Try-On</Text>
                        <Text style={styles.heroSubtitle}>
                            Try clothes virtually before you buy. Upload your photo and see how you look!
                        </Text>
                        <TouchableOpacity
                            style={styles.heroButton}
                            onPress={() => navigation.navigate('TryOn')}
                        >
                            <Text style={styles.heroButtonText}>Start Try-On</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.heroEmoji}>✨</Text>
                </View>

                <Text style={styles.sectionTitle}>Quick Actions</Text>

                <View style={styles.featuresGrid}>
                    {features.map((feature) => (
                        <TouchableOpacity
                            key={feature.id}
                            style={[styles.featureCard, { borderColor: feature.color }]}
                            onPress={() => navigation.navigate(feature.screen)}
                        >
                            <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                                <Text style={styles.featureEmoji}>{feature.icon}</Text>
                            </View>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDescription}>{feature.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>💡</Text>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>How it works</Text>
                        <Text style={styles.infoText}>
                            1. Upload your photo{'\n'}
                            2. Select a garment{'\n'}
                            3. Get AI-generated try-on result
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f23',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greeting: {
        fontSize: 16,
        color: '#888',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        fontSize: 22,
    },
    heroCard: {
        margin: 20,
        padding: 24,
        backgroundColor: '#1a1a2e',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6366f1',
    },
    heroContent: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 16,
        lineHeight: 20,
    },
    heroButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    heroButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    heroEmoji: {
        fontSize: 60,
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    featureCard: {
        width: '45%',
        margin: '2.5%',
        padding: 16,
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        borderWidth: 1,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureEmoji: {
        fontSize: 24,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 12,
        color: '#888',
    },
    infoCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    infoIcon: {
        fontSize: 32,
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#888',
        lineHeight: 22,
    },
});

export default HomeScreen;
