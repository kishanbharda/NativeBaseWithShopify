import axios from 'axios';
// import PhpDashboard from '../../config/PhpDashboard';

const getHomePage = () => {
  return async () => {
    // const { data } = await axios.get(`${PhpDashboard.url}/homepage`, { headers: PhpDashboard.header }).catch((error) => {
    //   throw error
    // });
    // if (data) {
    //   return data
    // }
    return []
  }
}

export default getHomePage
