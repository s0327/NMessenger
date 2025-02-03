import { Client } from "@notionhq/client";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();


const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function sendMail() {
    rl.question("Sender: ", async (sender) => {
      rl.question("Recipient(s): ", async (recipientsInput) => {
        rl.question("Message: ", async (message) => {
          const recipients = recipientsInput.split(",").map(r => r.trim()); // Split and clean recipient list
          const isSingleRecipient = recipients.length === 1; // Check if there is only one recipient
  
          try {
            for (const recipient of recipients) {
              await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                  "Message": { title: [{ text: { content: message } }] },
                  "Sender": { rich_text: [{ text: { content: sender } }] },
                  "Recipient": { rich_text: [{ text: { content: recipient } }] },
                  "Timestamp": { date: { start: new Date().toISOString() } },
                },
              });
            }
  
            // Adjust the success message based on the number of recipients
            if (isSingleRecipient) {
              console.log("Message sent successfully!");
            } else {
              console.log("Mass message sent successfully!");
            }
            
          } catch (error) {
            console.error("Error sending message: ", error);
          }
          rl.close();
        });
      });
    });
  }
  
  

async function readMail() {
    rl.question("User: ", async (recipient) => {
        try {
            // Fetch messages from Notion
            const response = await notion.databases.query({
                database_id: process.env.NOTION_DATABASE_ID,
                filter: {
                    property: "Recipient",
                    rich_text: { equals: recipient },
                },
            });

            if (response.results.length === 0) {
                console.log("No messages found for " + recipient);
                rl.close();
                return;
            }

            console.log(`\nMessages for ${recipient}:`);
            for (const page of response.results) {
                const sender = page.properties["Sender"].rich_text[0]?.text.content || "Unknown";
                const message = page.properties["Message"].title[0]?.text.content || "No message";
                const timestampISO = page.properties["Timestamp"].date.start || "Unknown";
                const timestamp = timestampISO !== "Unknown" 
                    ? new Date(timestampISO).toLocaleString("en-US", { 
                        weekday: "long", 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric", 
                        hour: "numeric", 
                        minute: "2-digit", 
                        hour12: true 
                    }) 
                    : "Unknown";


                console.log(`From: ${sender}`);
                console.log(message);
                console.log(`Sent: ${timestamp}`);

                // Check if "Read Timestamp" exists before updating
                try {
                    await notion.pages.update({
                        page_id: page.id,
                        properties: {
                          "Read Timestamp": {
                            date: { start: new Date().toISOString() },
                          },
                        },
                      });
                      console.log("Read Timestamp updated successfully!");                      
                } catch (error) {
                    console.warn("Could not update Read Timestamp. Make sure the property exists in Notion.");
                }
            }

            console.log("\nMessages marked as read.");
        } catch (error) {
            console.error("Error reading messages: ", error);
        }

        rl.close();
    });
}



async function main() {
  console.log("Welcome to NotionMail!");
  console.log("Please select an option:");
  console.log("- send: Send mail to a user.");
  console.log("- read: Check a user's mail.");

  rl.question("$ ", (command) => {
    if (command === "send") {
      sendMail();
    } else if (command === "read") {
      readMail();
    } else {
      console.log("Invalid command.");
      rl.close();
    }
  });
}

main();
