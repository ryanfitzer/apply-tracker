import { JobStatusType } from "../lib/types";
import { act } from "react";
import { applicationsActions } from "../store/applications-slice";
import { renderHook } from "@testing-library/react";
import useCharts from "./chart-hooks";
const spy = vi.spyOn(applicationsActions, "replaceApplications");

describe.skip("chart-hook", () => {
    it("something", async () => {
        spy.mockReturnValue({
            //@ts-expect-error: stuff
            "123": {
                jobStatus: JobStatusType.APPLIED
            }
        });
        let render;
        await act(() => {
            render = renderHook(() => useCharts());
        });
        expect(render.result.current).toEqual(["1234", false]);
    });
});
