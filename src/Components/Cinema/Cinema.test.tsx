import * as React from "react";
import { render, fireEvent, cleanup, act, wait } from "react-testing-library";
import "jest-dom/extend-expect";

import Cinema from "./Cinema";

const placeholder = "Search";

afterEach(cleanup);

it("creates a test div", () => {
    const { container, getByPlaceholderText } = render(
        <div>
            <textarea placeholder={placeholder} />
            <span>Span</span>
        </div>
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLTextAreaElement);
    expect((input as HTMLTextAreaElement).value).toBe("");
    expect(container).toMatchSnapshot(`
        <div>
            <textarea placeholder="Search" />
            <span>Span</span>
        </div>
    `);
});

it("creates a cinema", () => {
    const { container, getByPlaceholderText } = render(
        <Cinema placeholder={placeholder} />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLTextAreaElement);
    expect((input as HTMLTextAreaElement).value).toBe("");
    expect(input).toMatchSnapshot(`
        <input placeholder="Search" style="flex: 1;" />
    `);
});