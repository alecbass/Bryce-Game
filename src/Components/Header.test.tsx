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
    const div = container.firstChild as HTMLDivElement;
    expect(div).toBeInstanceOf(HTMLDivElement);
    expect(div).toBeEmpty;
    expect(div).toHaveStyle(`background-color: ${defaultProps.style!.backgroundColor}`);
    expect(div).toHaveStyle("height: 16%");
    expect(container).toMatchSnapshot(`
        <div>
            <span>Main Header</span>
        </div>
    `);
});