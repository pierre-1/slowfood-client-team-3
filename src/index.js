import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";

axios.defaults.baseURL = "https://slowfoodteam3-api.herokuapp.com/";

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
