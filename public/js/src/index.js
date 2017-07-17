import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Root from "./components/root";

jQuery(function(){
    ReactDOM.render(
        <Root />,
        document.getElementById("root")
    );
});