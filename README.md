Feed Application
================

This project is a simple two-page feed application developed using React Native with Expo for the front-end and Node.js with Express for the back-end. The purpose of this project was to showcase full-stack development capabilities within a limited timeframe.

Implementation Details
----------------------

### Front-end (React Native with Expo)

*   The application consists of two main pages:
    
    *   **Feed Display:** This page displays the current feed entries.
        
    *   **Add to Feed:** Users can post new entries from this page.
        
*   Expo's router is utilized for navigation between these two pages.
    

### Back-end (Node.js with Express)

*   API endpoints are developed using Node.js and Express for:
    
    *   Fetching feed data for display.
        
    *   Adding new entries to the feed.
        

### Integration

*   The application facilitates seamless data exchange between the React Native front-end and the Node.js back-end.
    

Running the Project
-------------------

To run the project locally, follow the Readme files in backend, and mobile folders.

Recommendations and Improvements
--------------------------------

### Backend Shift to Nest.js

Due to time constraints, the back-end was implemented using Node.js with Express. However, for future iterations or projects, consider shifting to Nest.js for the back-end. Nest.js offers several benefits over Express, including:

*   Better organization and structure with its modular architecture.
    
*   Built-in support for TypeScript, for improved maintainability.
    
*   Dependency injection
    
*   Modular design making testing and scalability easier.
    
*   Robust middleware and interceptor support for handling custom business logics.
    

### Utilizing React Native CLI instead of Expo

While Expo provided rapid development capabilities, using React Native CLI could offer additional benefits, especially for more complex applications:

*   Greater flexibility and control over the project configuration.
    
*   Direct access to native modules and APIs, enabling more advanced features and optimizations.
    
*   No reliance on Expo's managed workflow, which can sometimes limit customization options.
    

### Adding Offline Feature

With context to the job description, to enhance the application's user experience, an offline feature to store posts locally on the device can be implemented. This would allow users to view and interact with the feed even without an active internet connection, improving usability and accessibility.
