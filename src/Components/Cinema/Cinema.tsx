import * as React from "react";

import { Video } from "Components";
import styled from "@emotion/styled";

const Screen = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Input = styled("textarea")`
    flex: 1;
`;

interface Props {
    placeholder?: string;
}

interface State {
    videoUrl: string;
}

class ScreenCinema extends React.PureComponent<Props, State> {
    state: State = {
        videoUrl: ""
    };

    screenRef: HTMLDivElement | null = null;

    handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ videoUrl: e.target.value });
    }

    render() {
        const { placeholder } = this.props;
        const { videoUrl } = this.state;

        return (
            <Screen ref={ref => this.screenRef = ref}>
                <Input placeholder={placeholder} onChange={this.handleUrlChange} />
                <p>Current URL: {videoUrl}</p>
                <Video url={videoUrl} height={1000} width={this.screenRef && this.screenRef.style.width ? parseInt(this.screenRef.style.width, 10) - 64 : 1000} />
            </Screen>
        )
    }
}

export default ScreenCinema;