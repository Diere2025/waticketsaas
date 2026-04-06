const fs = require('fs');
const filePath = 'c:\\Users\\usuario invitado\\Documents\\GitHub\\WhaticketSaaS\\backend\\src\\services\\WbotServices\\wbotMessageListener.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Inject logging at the start of handleOpenAi
content = content.replace("const handleOpenAi = async (", "const handleOpenAi = async (\n  msg: proto.IWebMessageInfo,\n  wbot: Session,\n  ticket: Ticket,\n  contact: Contact,\n  mediaSent: Message | undefined\n): Promise<void> => {\n  const fs = require('fs');\n  fs.appendFileSync('chatbot_debug.txt', 'handleOpenAi triggered\\n');\n  try {");

content = content.replace("fs.appendFileSync('chatbot_debug.txt', 'handleOpenAi triggered\\n');\n  try {", "fs.appendFileSync('chatbot_debug.txt', 'handleOpenAi triggered for ticket: ' + ticket.id + '\\n');\n  try {");


fs.writeFileSync(filePath, content, 'utf8');
console.log("DEBUG LOGGING ADDED");
