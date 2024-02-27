import axios from 'axios';

export default axios.create({
  baseURL: `http://staging.redappletech.com:5006/api/v1/`, //staging
});

