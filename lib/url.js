const BaseUrl = (process.env.NODE_ENV === 'production') ? 'https://api.ibankmatch.com:8620' : 'http://ad.ibankmatch.com:8611'
// const BaseUrl = (process.env.NODE_ENV === 'production') ? 'https://api.ibankmatch.com:8620' : 'http://localhost:3000'
export default BaseUrl;
