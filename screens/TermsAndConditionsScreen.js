import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { BackButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const TermsAndConditionsScreen = ({ navigation }) => {
    return (
        <Layout style={{ flex: 1 }}>
            <FocusedStatusBar
                backgroundColor={COLORS.primary}
                barStyle="dark-content"
            />
            <SafeAreaView style={{ flex: 1 }}>
                <BackButton onPress={() => navigation.goBack()} color="white" />
                <Layout style={styles.container}>
                    <Text style={styles.header1}>Terms And Conditions</Text>
                </Layout>
                <ScrollView>
                    <Layout style={{ margin: SIZES.font }}>
                        <Text style={styles.header2}>1. AGREEMENT TO TERMS</Text>
                        <Text style={styles.text}>
							{`These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and HealthierMe ("Company", “we”, “us”, or “our”), concerning your access to and use of the HealthierMe App as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively,  the “Site”).\n\nYou agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.\n\nSupplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. Please ensure that you check the applicable Terms every time you use our Site so that you understand which Terms apply. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.\n\nThe information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.`}
                        </Text>
						<Text style={styles.header2}>2. INTELLECTUAL PROPERTY RIGHTS</Text>
						<Text style={styles.text}> 
							{`Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.\n\nProvided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.\n`}
						</Text>
						<Text style={styles.header2}>3. CONTRIBUTION LICENSE</Text>
						<Text style={styles.text}>
							{`You and the Site agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).\n\nBy submitting suggestions or other feedback regarding the Site, you agree that we can use and share such feedback for any purpose without compensation to you.\n\nWe do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.\n`}
						</Text>
						<Text style={styles.header2}>4. USER DATA</Text>
						<Text style={styles.text}>
							{`We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.`}
						</Text>
						<Text style={styles.header2}>5. SITE MANAGEMENT</Text>
						<Text style={styles.text}>
							{`We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.`}
						</Text>
                    </Layout>
                </ScrollView>
            </SafeAreaView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: TITLEBAR_HEIGHT,
        backgroundColor: COLORS.primary,
        justifyContent: "flex-end",
    },
    header1: {
        fontFamily: FONTS.bold,
        textAlign: "center",
        paddingBottom: SIZES.font,
        color: COLORS.white,
        fontSize: SIZES.large,
    },
    header2: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
        paddingBottom: SIZES.font,
    },
    text: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.gray,
        textAlign: "justify",
    },
});

export default TermsAndConditionsScreen;
