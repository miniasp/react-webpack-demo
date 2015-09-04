// boot.jsx
require('../sass/main.sass');

import React from 'react';
import App from './containers/App.jsx';


// ready 跟 jQuery 的 $(document).ready 功用一樣
// 會在DOM載完後，執行傳進去的callback function
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
                fn();
        });
    }
};

//DOM載完後就會執行下面這隻Function
ready(function() {
    React.render(<App/> ,
        document.getElementById('root')
    );
});
