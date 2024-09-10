import {
    defaultPreloadedState,
    renderHookWithProviders
} from "../utils/test-utils";

import { act } from "react";
import useCharts from "./chart-hooks";

describe("chart-hook", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers();
    });
    it("sets data for charts", () => {
        let render;
        act(() => {
            render = renderHookWithProviders(
                () => useCharts(),
                defaultPreloadedState
            );
        });
        const date = new Date("2024-07-17T05:00:00.000Z");
        vi.setSystemTime(date);
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
                    [date, 1]
                ]
            },
            false
        ]);
    });
});
