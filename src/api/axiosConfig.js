import axios from 'axios';

export default axios.create({
    baseURL:'cseprojectsem8-backend-production.up.railway.app/',
    headers: {"ngrok-skip-browser-warning": "true"}
});


//ngrok http 8080