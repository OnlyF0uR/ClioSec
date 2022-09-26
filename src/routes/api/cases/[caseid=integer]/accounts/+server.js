import { getTitleFromTarget } from '/lib/server/convert.js';

export function GET() {
    // The placeholder data is located in the function scope indeed, so we do not have to clone the entire array :/
    const data = [
        { 
            service: "example",
            uri: "example.com",
            username: "abc", 
            email: "abc@example.com", 
            secret: "example",
            secrethash: "3bb12eda3c298db5de25597f54d924f2e17e78a26ad8953ed8218ee682f0bbbe9021e2f3009d152c911bf1f25ec683a902714166767afbd8e5bd0fb0124ecb8a",
            security_questions: [
                { question: "What is your favorite word?", answer: "example" },
                { question: "What city were you born in?", answer: "ExampleCity" }
            ],
    
            // Will be a little join statement for this
            target_info: {
                name: "John Doe",
                sex: 0,
                age: 32
            }
        },
    ]

    // Loop through the data
    for (let i = 0; i < data.length; i++) {
        // Set the constructed title for the target
        data[i]["target_title"] = getTitleFromTarget(data[i].target_info);
        // Delete the original target data since we do not need it anyway
        delete data[i].target_info;
    }

    return new Response(JSON.stringify(data))
};