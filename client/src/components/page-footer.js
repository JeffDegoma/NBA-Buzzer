import React from 'react';


export default function PageFooter() {

    const year = new Date()
    const thisYear = `${year.getFullYear()}`

    return (
        <footer className="footer-component">
            &copy; {thisYear}
            <h6 className="white-text author-name">Made By Jeffrey Degoma</h6>
            <a target="_blank" className="white-text text-lighten-3" href="https://github.com/JeffDegoma/nba-twitter">GitHub</a>
        </footer>
    );
    
}