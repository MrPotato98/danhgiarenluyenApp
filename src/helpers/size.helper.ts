import {Dimensions, PixelRatio} from 'react-native';
import {useEffect, useState} from 'react';
export const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

const {width, height} = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const ratio3Scale = 0.8;

export const sizeWidth = (size: number) => {
  let layoutSize = (size / 320) * 100 * vw;
  return PixelRatio.roundToNearestPixel(layoutSize);
};

export const sizeHeight = (size: number) => {
  let layoutSize = (size / 568) * 100 * vh;
  if (PixelRatio.get() == 3) {
    layoutSize = layoutSize * ratio3Scale;
  }
  return PixelRatio.roundToNearestPixel(layoutSize);
};

export const sizeFont = (size: number) => {
  let layoutSize = (size / 320) * 100 * vw;
  if (PixelRatio.get() == 3) {
    layoutSize = layoutSize * ratio3Scale;
  }
  return PixelRatio.roundToNearestPixel(layoutSize);
};

// inspired by moderateScale
// from https://github.com/nirsky/react-native-size-matters
export const moderateScale = (size: number) => {
  let layoutSize = (size / 320) * 100 * vw;
  if (PixelRatio.get() == 3) {
    layoutSize = layoutSize * ratio3Scale;
  }
  return PixelRatio.roundToNearestPixel(layoutSize);
};
