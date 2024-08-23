import Footer from "./Footer";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { render } from "@testing-library/react";
import useVersion from "../hooks/version-hook";
vi.mock("../hooks/version-hook");

describe("Footer", () => {
    let loadingText: string = "";

    beforeAll(() => {
        loadingText = "Loading...";
    });
    describe('something', () => {
        beforeEach(() => {
            vi.mocked(useVersion).mockReturnValue(["", true]);

        });
        it("renders before loading in en", () => {
            const container = render(<I18nextProvider i18n={i18n}><Footer /></I18nextProvider>);
            expect(container.getByTestId("version").textContent).toBe(loadingText);
        });
    });
    describe('something', () => {
        beforeEach(() => {
            vi.mocked(useVersion).mockReturnValue(["1234", false]);
        });
        it("renders after loading", () => {
            const container = render(<I18nextProvider i18n={i18n}><Footer /></I18nextProvider>);
            expect(container.getByTestId("version").textContent).toBe("Version: 1234");
        });
    });
});