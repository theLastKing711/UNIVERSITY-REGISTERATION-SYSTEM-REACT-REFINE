import { PusherChannel } from './../node_modules/laravel-echo/src/channel/pusher-channel';
import { LiveEvent, LiveProvider } from "@refinedev/core";
import Echo from "laravel-echo";
import { apiClient } from './libs/axios/config';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<"reverb">;
  }
}

window.Pusher = Pusher; // This line is crucial for Laravel Echo

window.Echo = new Echo<"reverb">({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    apiClient.post('broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                    .then(response => {
                        callback(null , response.data);
                    })
                    .catch(error => {
                        callback(error, null);
                    });
                }
            };
    },
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});


export const liveProvider = (client: Echo<"reverb">): LiveProvider => {
  return {
    subscribe: ({ channel, types, params, callback }) => {
    console.log("channel", client);

    console.log("subscribing to channel with name", channel);

      const channelInstance = 
        client
        .private(channel);

      //names of the backend events, which are here laravel eventClass name like ["newTeacherAdded", ".created"]
      console.log("types", types);
      
      console.log("params", params);

      const listener = (message: any) => {

        callback(message);
        // if (types.includes("*") || types.includes(message.data.type)) {
        //   if (
        //     message.data.type !== "created" &&
        //     params?.ids !== undefined &&
        //     message.data?.payload?.ids !== undefined
        //   ) {
        //     if (
        //       params.ids
        //         .map(String)
        //         .filter((value) =>
        //           message.data.payload.ids?.map(String).includes(value),
        //         ).length > 0
        //     ) {
        //       callback(message.data as LiveEvent);
        //     }
        //   } else {
        //     callback(message.data);
        //   }
        // }
      };
      
      channelInstance
        .subscribe();

      types.forEach((eventName) => 
        {

            console.log("subscribing to event with name", eventName);
            
            channelInstance
                .listen(
                    eventName,
                    (event: LiveEvent) => callback(event)
                );
        }
    );


      return { channelInstance };
    },

    unsubscribe: (payload: {
      channelInstance: PusherChannel<"reverb">
    }) => {
      const { channelInstance } = payload;
      channelInstance.unsubscribe();
    },

    publish: (event: LiveEvent) => {
    //   const channelInstance = client.channels.get(event.channel);

    //   channelInstance.publish(event.type, event);
    },
  };
};
