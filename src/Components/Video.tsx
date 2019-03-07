import * as React from "react";
import YouTube from "react-youtube";

interface Props {
    url: string;
    height?: number;
    width?: number;
}

{/* <YouTube
  videoId={string}                  // defaults -> null
  id={string}                       // defaults -> null
  className={string}                // defaults -> null
  containerClassName={string}       // defaults -> ''
  opts={obj}                        // defaults -> {}
  onReady={func}                    // defaults -> noop
  onPlay={func}                     // defaults -> noop
  onPause={func}                    // defaults -> noop
  onEnd={func}                      // defaults -> noop
  onError={func}                    // defaults -> noop
  onStateChange={func}              // defaults -> noop
  onPlaybackRateChange={func}       // defaults -> noop
  onPlaybackQualityChange={func}    // defaults -> noop
/> */}
class VideoComponent extends React.PureComponent<Props> {

    render() {
        const { url, height, width } = this.props;

        const opts = {
            height: height || "1000",
            width: width || "640",
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
              disablekb: 1
            }
          };
        return (
            <YouTube
                videoId={url}
                id={"video"}
                opts={opts}
            />
        );
    }
}

export default VideoComponent;