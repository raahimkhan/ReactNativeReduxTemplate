import { useFonts } from 'expo-font';

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'SFProDisplayBold': require('../assets/fonts/SFProDisplayBold.otf'),
  });
  return fontsLoaded;
};

export default useLoadFonts;
