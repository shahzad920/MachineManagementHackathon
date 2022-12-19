import React, {PropsWithChildren} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  ViewProps,
} from 'react-native';
import PropTypes from 'prop-types';
import {size, Colors} from '../../theme';
interface ff extends ViewProps {
  row: boolean;
  flex: boolean;
  center: boolean;
  middle: boolean;
  top: boolean;
  bottom: boolean;
  right: boolean;
  left: boolean;
  card: boolean;
  shadow: boolean;
  space: null;
  fluid: boolean;
  height: null;
  width: null;
  shadowColor: null;
  bgColor: null;
  safe: boolean;
  wrap: boolean;
  alignItemsCenter: boolean;
  pVertical: number;
  mHorizontal: number;
  pHorizontal: number;
  pBottom: number;
  mVertical: number;
  mTop: number;
}

type Props = PropsWithChildren<ff>;

function Block({
  row,
  flex,
  center,
  middle,
  top,
  bottom,
  right,
  left,
  shadow,
  space,
  fluid,
  height,
  shadowColor,
  bgColor,
  wrap,
  alignItemsCenter,
  pVertical,
  mHorizontal,
  pHorizontal,
  pBottom,
  mVertical,
  mTop,
  style,
  card,
  width,
  safe,
  children,
  ...rest
}: Props) {
  const styleBlock = [
    styles.block,
    row && styles.row,
    flex && {flex: flex === true ? 1 : flex},
    center && styles.center,
    middle && styles.middle,
    wrap && {flexWrap: 'wrap'},
    top && styles.top,
    bottom && styles.bottom,
    right && styles.right,
    left && styles.left,
    space && {justifyContent: `space-${space}`},
    shadow && styles.shadow,
    fluid && styles.fluid,
    card && styles.card,
    height && {height},
    width && {width},
    shadowColor && {shadowColor},
    bgColor && {backgroundColor: bgColor},
    pHorizontal && {paddingHorizontal: pHorizontal},
    alignItemsCenter && styles.alignItemsCenter,
    pVertical && {paddingVertical: pVertical},
    pBottom && {paddingBottom: pBottom},
    mHorizontal && {marginHorizontal: mHorizontal},
    mVertical && {marginVertical: mVertical},
    mTop && {marginTop: mTop},
    style,
  ];

  if (safe) {
    return (
      <SafeAreaView style={styleBlock} {...rest}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={styleBlock} {...rest}>
      {children}
    </View>
  );
}

Block.defaultProps = {
  row: false,
  flex: false,
  center: false,
  middle: false,
  top: false,
  bottom: false,
  right: false,
  left: false,
  card: false,
  shadow: false,
  space: null,
  fluid: false,
  height: null,
  width: null,
  shadowColor: null,
  bgColor: null,
  safe: false,
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  top: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  bottom: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  card: {
    borderRadius: size.CARD_BORDER_RADIUS,
    borderWidth: size.CARD_BORDER_WIDTH,
    borderColor: Colors.BLOCK,
  },
  shadow: {
    shadowColor: Colors.BLOCK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: size.BLOCK_SHADOW_OPACITY,
    shadowRadius: size.BLOCK_SHADOW_RADIUS,
    elevation: 4,
  },
  fluid: {
    width: 'auto',
  },
});

export default Block;
