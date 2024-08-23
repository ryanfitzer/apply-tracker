import Footer from "./Footer";
import { I18nextProvider } from "react-i18next";
import { act } from "react";
import i18n from "../i18n";
import { render } from "@testing-library/react";

describe("Footer", () => {
    let loadingText: string = "";

    beforeAll(() => {
        loadingText = "Loading...";
    });
    it("renders before loading", async () => {
        const container = render(<I18nextProvider i18n={i18n}><Footer /></I18nextProvider>);
        expect(container.getByTestId("version").textContent).toBe(loadingText);
    });
    it("renders after loading", async () => {
        let container;
        await act(() => {
            container = render(<Footer />);
        });
        expect(container.getByTestId("version").textContent).toBe("Version: ");
    });
});