import { JobSalaryType, JobStatusType } from "../lib/types";

import { act } from "react";
import { renderWithProviders } from "../utils/test-utils";
import useCharts from "./chart-hooks";

describe("chart-hook", () => {
    it("something", async () => {
        const blah = {
            preloadedState: {
                appList: {
                    items: {
                        "123": {
                            jobTitle: "first job",
                            jobCompany: "company",
                            jobApplyDate: "2024-07-17",
                            jobCompanyLink: "https://company.com",
                            jobLink: "https://company.com/jobs/123",
                            jobSalary: "",
                            jobSalaryMax: 0,
                            jobSalaryMin: 0,
                            jobSalaryType: JobSalaryType.YR,
                            jobStatus: JobStatusType.APPLIED,
                            jobId: "123"
                        }
                    }
                }
            }
        };
        let render;
        await act(() => {
            render = renderWithProviders(() => useCharts(), blah, true);
        });
        expect(render.result.current).toEqual([
            {
                meta: {
                    total: 1,
                    companyList: [
                        {
                            name: "company",
                            link: "https://company.com"
                        }
                    ]
                },
                pie: [
                    ["Phase", "Number"],
                    ["Applied (1)", 1],
                    ["Denied (0)", 0],
                    ["On Hold (0)", 0],
                    ["Interviewed Scheldued (0)", 0],
                    ["Interviewed (0)", 0]
                ],
                calendar: [
                    [
                        {
                            id: "Date",
                            type: "date"
                        },
                        {
                            id: "Applications Sent",
                            type: "number"
                        }
                    ],
                    [new Date("2024-07-17T05:00:00.000Z"), 1]
                ]
            },
            false
        ]);
    });
});
