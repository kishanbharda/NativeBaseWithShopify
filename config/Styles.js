/**
 * 
 * @param {Number} width Width of the shadow 
 * @param {Number} height Height of the shadow
 * @param {String} color Color of the shadow
 * @param {Number} opacity opacity of the shadow
 * @param {Number} radius radius of the shadow
 */
export const getShadow = ({width = 0, height = 1, color = "#0000ff", opacity = 0.5, radius = 10} = {}) => {
  return {
      shadowColor: color,
      shadowOffset: {
          width,
          height,
      },
      shadowOpacity: opacity,
      shadowRadius: radius,

      elevation: 3,
  }
}

export const temp = () => {

}
