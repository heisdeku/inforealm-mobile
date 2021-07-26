import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager, TouchableOpacity } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import SaveIcon from '../svgs/saveIcon';

export default class SwipeableContainer extends Component {
  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction}>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'column', paddingRight: 30, justifyContent: 'center'}}>
            <SaveIcon />
            <Text
                style={{                              
                fontWeight: '600',                
                paddingVertical: 20,
                color: '#fff',
                fontSize: 18
                }}
            >
                Save
            </Text>
          </TouchableOpacity>          
      </RectButton>
    );
  };
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={41}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#e33127',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
  },
});

