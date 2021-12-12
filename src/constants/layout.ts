import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const defaultHeightScreen = 896;

export default {
  window: {
    width,
    height,
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  isSmallDevice: width < 375,
  defaultHeightScreen,
  fontSize: {
    sm: 11,
    md: 13,
    lg: 17,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  btnShadow: {
    shadowColor: '#9E9E9E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boldShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  fontInput: 'Lato-Regular',
};
