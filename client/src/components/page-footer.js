import React from 'react';
<<<<<<< Updated upstream
import { Footer } from 'react-materialize';


export default function PageFooter() {

    return (
        <Footer copyrights="&copy; 2017 Copyright Text">
            <h6 className="white-text author-name">Made By Jeffrey Degoma</h6>
            <a target="_blank" className="grey-text text-lighten-3" href="https://github.com/JeffDegoma/nba-twitter">GitHub</a>
        </Footer>


export default function PageFooter() {
    return (
        <footer className="footer-component">
            &copy; 2017 Copyright
            <h6 className="white-text author-name">Made By Jeffrey Degoma</h6>
            <a target="_blank" className="grey-text text-lighten-3" href="https://github.com/JeffDegoma/nba-twitter">GitHub</a>
        </footer>
    );
}