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
1. Clone the repository:
   git clone <(https://github.com/s0327/NMessenger.git)>
   cd notion-messenger
2. Install dependencies:
   npm start
3. Set up environment variables: Create a .env file in the project directory and add the following:
   NOTION_API_KEY=ntn_T88682380617tgdND6orzMcfv1IyPoL3B6lg7SmX0Jq3x1
   NOTION_DATABASE_ID=18e2109692ed8006ac8ffa10bd9b1592
4. Run the application:
   npm start

Usage:

Sending a Message
- To send a message, run:
  npm start
  Then select the send option and input the required fields:
  - Sender Name
  - Recipient(s) (comma-separated for mass messaging)
  - Message Content
 
Reading a Message
- To check messages, select the read option and input the recipient’s name. Messages will be displayed along with timestamps, and their "Read Timestamp" is updated in the database.

References:
- Notion API Documentation: https://developers.notion.com/
- Stack Overflow Discussion on Structuring a Node CLI Application
- Official @notionhq/client npm package documentation

Future Improvements:
- Search and Filter Feature: Add a feature for filtering messages based on keywords, sender names, or date ranges.
- Attachments: Allow users to send and receive files via Notion whether they are images, videos, documents, etc.
- Encrypted Private Messaging: Messages will remain encrypted to avoid unauthorized reading. Can be decrypted by designated recipient only.

Technical Choices:
- Notion API for Storage: Allows for simple data organization, structured storage, and built-in timestamps.
- CLI instead of GUI: Lightweight, simple to deploy, no front-end development required.
- Timestamp Conversion: Timestamps are converted from ISO format to a user-friendly format.
- Using .env for API Key Management: Sensitive API keys and database IDs are stored in a .env file rather than being hardcoded to prevent credentials from being exposed in public respositories and so users can configure their own API keys without modifying the code.
- JavaScript: JavaScript is widely supported and easy to integrate with Notion’s API.

This README serves as a comprehensive guide to installing, running, and understanding NMessenger. 
