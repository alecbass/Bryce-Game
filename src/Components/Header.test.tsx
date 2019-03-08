import * as React from "react";
import { render, fireEvent, cleanup, act, wait } from "react-testing-library";
import "jest-dom/extend-expect";

import Header from "./Header";

const defaultProps: {
    title: string;
    style?: React.CSSProperties;
} = {
    title: "Main Header",
    style: {
        backgroundColor: "red"
    }
};

afterEach(cleanup);

it("creates a header with text", () => {
    const { container, getByText } = render(
        <Header title={defaultProps.title} style={defaultProps.style} />
    );
    // title
    const testTitle = getByText(defaultProps.title);
    expect(testTitle).toBeInTheDocument();
    expect(testTitle).toBeInstanceOf(HTMLSpanElement);
    expect((testTitle as HTMLSpanElement).innerHTML).toBe(defaultProps.title);

    // surrounding div container
    expect(container).toBeInstanceOf(HTMLDivElement);
    expect((container as HTMLDivElement).firstChild).toBeInstanceOf(HTMLDivElement);
    expect((container as HTMLDivElement).firstChild).toBeEmpty;
    expect(container.firstChild).toHaveStyle(`background-color: ${defaultProps.style!.backgroundColor}`);
    expect(container).toMatchSnapshot(`
        <div>
            <span>Main Header</span>
        </div>
    `);
});