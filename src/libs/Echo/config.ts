import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { apiClient } from "../axios/config";
import { configureEcho } from "@laravel/echo-react";

// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: Echo;
//   }
// }

// configureEcho({
//     broadcaster: "reverb",
//     authorizer: (channel, options) => {
//             return {
//                 authorize: (socketId, callback) => {
//                     apiClient.post('/api/broadcasting/auth', {
//                         socket_id: socketId,
//                         channel_name: channel.name
//                     })
//                     .then(response => {
//                         callback(null , response.data);
//                     })
//                     .catch(error => {
//                         callback(error, null);
//                     });
//                 }
//             };
//     },
// })

// window.Echo = new Echo<"reverb">({
//     broadcaster: 'reverb',
//     key: import.meta.env.VITE_REVERB_APP_KEY,
//     authorizer: (channel, options) => {
//             return {
//                 authorize: (socketId, callback) => {
//                     apiClient.post('/api/broadcasting/auth', {
//                         socket_id: socketId,
//                         channel_name: channel.name
//                     })
//                     .then(response => {
//                         callback(null , response.data);
//                     })
//                     .catch(error => {
//                         callback(error, null);
//                     });
//                 }
//             };
//     },
//     wsHost: import.meta.env.VITE_REVERB_HOST,
//     wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
//     wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
