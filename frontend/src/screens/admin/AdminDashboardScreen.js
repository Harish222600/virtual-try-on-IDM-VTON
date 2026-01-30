import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI } from '../../api';

const AdminDashboardScreen = ({ navigation }) => {
    const { isAdmin } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const response = await adminAPI.getAnalytics();
            setAnalytics(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.accessDenied}>
                    <Text style={styles.accessDeniedIcon}>🚫</Text>
                    <Text style={styles.accessDeniedText}>Admin access required</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6366f1" />
                </View>
            </SafeAreaView>
        );
    }

    const StatCard = ({ title, value, icon, color }) => (
        <View style={[styles.statCard, { borderColor: color }]}>
            <Text style={styles.statIcon}>{icon}</Text>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );

    const MenuItem = ({ icon, title, subtitle, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>{icon}</Text>
            </View>
            <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Admin Dashboard</Text>
                    <TouchableOpacity onPress={loadAnalytics}>
                        <Text style={styles.refreshIcon}>🔄</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        title="Total Users"
                        value={analytics?.users?.total || 0}
                        icon="👥"
                        color="#6366f1"
                    />
                    <StatCard
                        title="Active Garments"
                        value={analytics?.garments?.active || 0}
                        icon="👗"
                        color="#ec4899"
                    />
                    <StatCard
                        title="Total Try-Ons"
                        value={analytics?.tryOns?.total || 0}
                        icon="✨"
                        color="#10b981"
                    />
                    <StatCard
                        title="Success Rate"
                        value={`${analytics?.tryOns?.successRate || 0}%`}
                        icon="📊"
                        color="#f59e0b"
                    />
                </View>

                <View style={styles.todayStats}>
                    <Text style={styles.sectionTitle}>Today's Activity</Text>
                    <View style={styles.todayRow}>
                        <View style={styles.todayStat}>
                            <Text style={styles.todayValue}>{analytics?.users?.newToday || 0}</Text>
                            <Text style={styles.todayLabel}>New Users</Text>
                        </View>
                        <View style={styles.todayStat}>
                            <Text style={styles.todayValue}>{analytics?.tryOns?.today || 0}</Text>
                            <Text style={styles.todayLabel}>Try-Ons</Text>
                        </View>
                        <View style={styles.todayStat}>
                            <Text style={styles.todayValue}>
                                {analytics?.tryOns?.avgProcessingTime
                                    ? `${(analytics.tryOns.avgProcessingTime / 1000).toFixed(1)}s`
                                    : '-'}
                            </Text>
                            <Text style={styles.todayLabel}>Avg Time</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Management</Text>
                    <MenuItem
                        icon="👥"
                        title="User Management"
                        subtitle="View and manage users"
                        onPress={() => navigation.navigate('UserManagement')}
                    />
                    <MenuItem
                        icon="👗"
                        title="Garment Management"
                        subtitle="Add and edit garments"
                        onPress={() => navigation.navigate('GarmentManagement')}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular Garments</Text>
                    {analytics?.popularGarments?.map((garment, index) => (
                        <View key={garment._id} style={styles.popularItem}>
                            <Text style={styles.popularRank}>#{index + 1}</Text>
                            <View style={styles.popularContent}>
                                <Text style={styles.popularName}>{garment.name}</Text>
                                <Text style={styles.popularCategory}>{garment.category}</Text>
                            </View>
                            <Text style={styles.popularCount}>{garment.tryOnCount} try-ons</Text>
                        </View>
                    ))}
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
        paddingTop: 10,
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    refreshIcon: {
        fontSize: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessDenied: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessDeniedIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    accessDeniedText: {
        fontSize: 18,
        color: '#888',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    statCard: {
        width: '45%',
        margin: '2.5%',
        padding: 16,
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    statIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    statTitle: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    todayStats: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
        marginBottom: 12,
    },
    todayRow: {
        flexDirection: 'row',
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        padding: 16,
    },
    todayStat: {
        flex: 1,
        alignItems: 'center',
    },
    todayValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6366f1',
    },
    todayLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    section: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    menuIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#2d2d44',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuIconText: {
        fontSize: 20,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: '#888',
    },
    popularItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
    },
    popularRank: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6366f1',
        width: 30,
    },
    popularContent: {
        flex: 1,
    },
    popularName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
    popularCategory: {
        fontSize: 12,
        color: '#888',
        textTransform: 'capitalize',
    },
    popularCount: {
        fontSize: 12,
        color: '#10b981',
        fontWeight: '600',
    },
});

export default AdminDashboardScreen;
