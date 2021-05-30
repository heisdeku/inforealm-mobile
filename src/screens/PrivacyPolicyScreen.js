import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>The Inforealm Privacy Policy</Text>
                <Text style={styles.headingText}>last updated on Sep 26, 2020</Text>
            </View>
            <ScrollView style={styles.body}>
                <Text style={styles.bodyHeading}>Privacy Policy:</Text>
                <Text style={styles.bodyText}>
                    Like many other websites,  www.theinforealm.com makes use of log files. The information inside the log files includes Internet Protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and the number of clicks to analyze trends, administer the site, track user movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
                </Text>
                <Text style={styles.bodyHeading}>Privacy Policy:</Text>
                <Text style={styles.bodyText}>
                    Like many other websites,  www.theinforealm.com makes use of log files. The information inside the log files includes Internet Protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and the number of clicks to analyze trends, administer the site, track user movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
                </Text>
                <Text style={styles.bodyHeading}>Privacy Policy:</Text>
                <Text style={styles.bodyText}>
                    Like many other websites,  www.theinforealm.com makes use of log files. The information inside the log files includes Internet Protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and the number of clicks to analyze trends, administer the site, track user movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
                </Text>
                <Text style={styles.bodyHeading}>Privacy Policy:</Text>
                <Text style={styles.bodyText}>
                    Like many other websites,  www.theinforealm.com makes use of log files. The information inside the log files includes Internet Protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and the number of clicks to analyze trends, administer the site, track user movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    title: {
        fontFamily: 'DMBold',
        fontSize: 18
    },
    heading: {
        minHeight: 100,
        backgroundColor: '#F7F7F7',
        paddingTop: 30,
        paddingHorizontal: 15,
        elevation: 4,
        shadowRadius: 20,
        shadowOffset: {
            height: 4,
            width: 4
        }
    },
    headingText: {
        fontFamily: 'DMRegular',
        fontSize: 12,
        marginTop: 10,
        fontWeight: '500'
    },
    bodyHeading: {
        fontSize: 16,
        fontFamily: 'DMBold',
        marginBottom: 8
    },
    bodyText: {
        fontSize: 14,
        fontFamily: 'DMRegular',
        marginBottom: 16
    },
    body: {
        padding: 15
    }
});

export default PrivacyPolicyScreen;
