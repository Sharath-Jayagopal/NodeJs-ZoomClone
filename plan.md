#   Action Plan        
-> initialize our node.js project.  done
-> initialize our first view.   done
-> create Room id. done  
-> Add functionality to add our own video. done
    ->To work with video and audio we make use of the 
    ->navigator.mediaDevices.getUserMedia fn 
    -> this will specify if we have to use audio and video
    ->then we will receive a stream as a promise
    ->we pass this to a variable
    ->call a fn to add this stream to our video object
    ->fn name will be addVideoStream(vid , stream)
        -> the fn will pass the stream object into the 
        ->video.srcObject(which can be a stream, source or blob or file)
        ->after we pass this to srcObject we call an event listner of loadedmetadata and play.video()
        ->After that we will append this obj to our grid
        in our html 

-> FUNCTIONALITY TO stream others videos. done  
    ->To add the video from other people or client we use socket programming.
    ->Here we use socket io for this 
    -> we basically use server and client communication but to actually register a new user we have to use peer to peer communication using peerJs 
        ->What peer js does is sent video Streams of diff users to the server 

-> Add styling. 
-> Add functionality for messages. 
-> mute and stop video button.
Node js -> express js -> socket io -> peer js -> uuid lib -> ejs -> Web RTC (connect two peers &
            (server)        (chat)     (video streaming )     enable them to share audio and video)

