import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';
import shade from 'polished/lib/color/shade';

export const paleGrey = '#efefef';
export const lightGrey = 'rgba(20, 20, 20, 0.1)';
export const darkGrey = darken(0.05, '#282a36');
export const grey = '#282a36';

export const red = '#ff5555';
export const violetRed = 'rgb(219, 112, 147)';
export const darkVioletRed = darken(0.1, 'rgb(219, 112, 147)');
export const lightVioletRed = lighten(0.31, 'rgb(219, 112, 147)');
export const violetRed_Selection = 'rgba(219, 112, 147, 0.25)';

export const gold = shade(0.9, 'rgb(243, 182, 97)');

// BLM palette
export const blmGrey = 'rgb(10 16 26)';
export const blmBlack = 'rgb(0, 0, 0)';
export const blmLightGrey = lighten(0.75, 'rgb(33, 33, 33)');

export const blmMetal = 'rgb(20 27 44)';
export const blmLightMetal = lighten(0.1, 'rgb(20, 27, 44)');
