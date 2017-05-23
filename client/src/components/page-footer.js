import React from 'react';
import { Footer } from 'react-materialize';


export default function PageFooter() {

    return (
        <Footer copyrights="&copy; 2017 Copyright Text">
            <h6 className="white-text author-name">Made By Jeffrey Degoma</h6>
            <a className="grey-text text-lighten-3" href="#">GitHub</a>
        </Footer>
    );
}