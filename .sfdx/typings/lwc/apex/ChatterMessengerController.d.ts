declare module "@salesforce/apex/ChatterMessengerController.getConversations" {
  export default function getConversations(): Promise<any>;
}
declare module "@salesforce/apex/ChatterMessengerController.getConversation" {
  export default function getConversation(param: {convId: any}): Promise<any>;
}
declare module "@salesforce/apex/ChatterMessengerController.replyToMessage" {
  export default function replyToMessage(param: {text: any, msgId: any}): Promise<any>;
}
declare module "@salesforce/apex/ChatterMessengerController.sendMessage" {
  export default function sendMessage(param: {text: any, recipients: any}): Promise<any>;
}
declare module "@salesforce/apex/ChatterMessengerController.searchUsers" {
  export default function searchUsers(param: {query: any}): Promise<any>;
}
declare module "@salesforce/apex/ChatterMessengerController.publishNewMessageEvent" {
  export default function publishNewMessageEvent(param: {conversationId: any, messageId: any}): Promise<any>;
}
