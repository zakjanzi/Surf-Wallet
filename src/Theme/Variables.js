/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That makes it possible to change them more easily later on.
 */

/** 
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  backgroundColor: '#F9F9F9',
  textInButton: '#F9F9F9',
  text: '#141414',
  headerText: '#3700B3',
  bodyText: '#333333',
  skip: '#707070',
  someText: '#3700B3',

  fadedButton: '#290B70',
  langButton: '#FFFFFF',
  normalButton: '#3700B3'
}

export const NavigationColors = {
  primary: Colors.backgroundColor,
  text: Colors.text,
}

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30

export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
