import Toast from 'react-native-root-toast';

/**
 * Display the toast with message that you have passed
 * @param {String} message Message to display into the toast
 */
const showToast = (message: String) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: false,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
  });
}

export default showToast
