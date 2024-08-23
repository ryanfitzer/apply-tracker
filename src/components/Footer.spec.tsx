import Footer from "./Footer";
import { renderWithProviders } from "../utils/test-utils";
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
            const container = renderWithProviders(<Footer />);
            expect(container.getByTestId("version").textContent).toBe(loadingText);
        });
    });
    describe('something', () => {
        beforeEach(() => {
            vi.mocked(useVersion).mockReturnValue(["1234", false]);
        });
        it("renders after loading", () => {
            const container = renderWithProviders(<Footer />);
            expect(container.getByTestId("version").textContent).toBe("Version: 1234");
        });
    });
});