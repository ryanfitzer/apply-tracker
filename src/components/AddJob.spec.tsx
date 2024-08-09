import AddJob from "./AddJob";
import { appListInitialState } from "../store/applications-slice";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";

describe("AddJob Component", () => {
    it("renders component", () => {
        const { getByTestId } = renderWithProviders(<AddJob />);

        expect(getByTestId("jobTitle")).toBeInTheDocument();
    });
    describe("with job to edit", () => {
        it("renders component", () => {
            const { getByTestId } = renderWithProviders(<AddJob />, {
                preloadedState: {
                    ui: {
                        modalIsVisible: true
                    },
                    appList: {
                        ...appListInitialState,
                        editingJob: '123',
                        items: {
                            '123': {
                                jobTitle: 'first job',
                                jobCompany: 'company',
                                jobApplyDate: '2024-07-17'
                            }
                        }
                    }
                }
            });

            expect(getByTestId("jobTitle")).toHaveValue('first job');
            expect(getByTestId("jobCompany")).toHaveValue('company');
            expect(getByTestId("jobApplyDate")).toHaveValue('2024-07-17');
            fireEvent.click(getByTestId("buttonSubmit"));
        });
    });
});
