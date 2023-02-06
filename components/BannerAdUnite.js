import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import React from 'react';
import {View, Platform} from 'react-native';

const BannerAdUnite = () => {
  const adUnitId = Platform.select({
    android: 'ca-app-pub-2433696255996909/7200617721',
    ios: 'ca-app-pub-6328032470205692/7336094188',
  });

  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
      }}>
      <BannerAd
        unitId={adUnitId}
        servePersonalizedAds={true}
        size={BannerAdSize.BANNER}
      />
    </View>
  );
};

export default BannerAdUnite;
