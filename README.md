NMessenger

Description:
NMessenger is a command-line interface (CLI) application that allows users to send and receive messages using Notion as a backend database. This tool enables users to communicate online via Notion's API for data storage and retrieval. 

Features:
This application includes 2 main functions:
    - Sending Mail: A user can send a message to an individual recipient or multiple recipients using a mass email feature. The program adds timestamps indicating when messages are sent. 
    - Reading Mail: A recipient can open messages sent to them, view the timestamp of when the message was sent, and mark the message as read when opened. 

Additional Features Implemented:
    - Mass Emailing: A user can input multiple recipients separated by commas, and NMessenger will send the same message to each recipient without them knowing about each other.
    - Timestamps: Timestamps are converted from ISO format to a more readable structure. Timestamps are placed on when a user sends a message and when the recipient has read the message.
    - Read Receipt: When the recipient opens a message, a "Read Timestamp" is updated to tracked when it was read. 

Installation and Setup:
Prerequisites
- Node.js
- A Notion account
- A Notion integration with database access

Steps
1. Clone the repository 
