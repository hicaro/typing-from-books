import React from 'react';

export default class Root extends React.Component {
    render() {
        return (

            <div className="App">
                <div className="center">
                    <span className="weak">This site is</span>
                    <span className="huge">Coming soon</span>
                    <div className="social">
                        <ul>
                            <li>
                                <a href="https://github.com/hicaro" target="_blank">
                                    <i className="fa fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}