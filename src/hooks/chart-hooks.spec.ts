import { defaultPreloadedState, renderHookWithProviders } from "../utils/test-utils";

import { act } from "react";
import useCharts from "./chart-hooks";

describe("chart-hook", () => {
    it("sets data for charts", async () => {
        const render = await act(() => {
            return renderHookWithProviders(() => useCharts(), defaultPreloadedState);
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
                    ["Rejected (0)", 0],
                    ["On Hold (0)", 0],
                    ["Interviewed Scheldued (0)", 0],
                    ["Interviewing (0)", 0],
                    ["Interviewed (0)", 0],
                    ["Offered (0)", 0],
                    ["Recruiter Contacted (0)", 0]
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
                    [new Date("2024-07-17T00:00:00.000Z"), 1]
                ]
            },
            false
        ]);
    });
});
