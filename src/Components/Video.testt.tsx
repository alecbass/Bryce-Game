import * as React from "react";
import { render, fireEvent, cleanup, act, wait } from "react-testing-library";
import "jest-dom/extend-expect";

import Video from "./Video";

// NOTE: There are a lot of child nodes of this and it's from a library so there's not much point in testing this
const defaultProps: {
    url: string;
    height?: number;
    width?: number;
} = {
    url: "ePJh5Ayiu_k",
    height: 500,
    width: 500
}

afterEach(cleanup);

it("creates a Youtube video", () => {
    const { container } = render(
        <Video url={defaultProps.url} height={defaultProps.height} width={defaultProps.width} />
    );
    expect(container).not.toBeEmpty();
    const video = container.firstChild;
    expect(container).toHaveAttribute("id", "video");
    expect(container).toHaveAttribute("videoId", defaultProps.url);
});