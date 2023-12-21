import React, {useEffect, useState} from 'react';
import {Button, Platform} from 'react-native';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';

const adUnitId = Platform.select({
  android: 'ca-app-pub-2433696255996909/9871276424',
  ios: 'ca-app-pub-2433696255996909/9244859969',
});

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['food', 'cooking', 'recipe', 'chef', 'ingredients'],
});

const InterstisialAdUnite = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    interstitial.load();

    // Start loading the interstitial straight away

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    console.log('ads not shown');
    return null;
  } else {
    interstitial.show();
  }

  //   return (
  //     <Button
  //       title="Show Interstitial"
  //       onPress={() => {
  //         interstitial.show();
  //       }}
  //     />
  //   );
};

export default InterstisialAdUnite;
