import Toast from 'react-native-root-toast';

/**
 * Display an error on toast
 * @param {String} message Error to display
 */
const showError = (message: String) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    animation: false,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    backgroundColor: '#d50000',
  });
}

export default showError
