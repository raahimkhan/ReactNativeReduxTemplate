import { useFonts } from 'expo-font';

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  return fontsLoaded;
};

export default useLoadFonts;
