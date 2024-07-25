import AddJob from "./AddJob";
import { renderWithProviders } from "../utils/test-utils";

describe("AddJob Component", () => {
    it("renders component", () => {
        const { getByTestId } = renderWithProviders(<AddJob />);

        console.log(getByTestId("jobTitle"));
    });
});
