import { RenderHookResult, renderHook } from "@testing-library/react";

import { act } from "react";
import useVersion from "./version-hook";

const fetchSpy = vi.spyOn(global, "fetch");
describe("useVersion", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    describe("calls", () => {
        describe("with valid data", () => {
            beforeEach(() => {
                fetchSpy.mockResolvedValue({
                    json: vi.fn().mockResolvedValue({ version: "1234" })
                });
            });
            it("does things", async () => {
                let render: RenderHookResult;
                await act(() => {
                    render = renderHook(() => useVersion());
                });
                console.log(render);
                expect(render.result.current).toEqual(["1234", false]);
            });
        });
        describe("with invalid data", () => {
            beforeEach(() => {
                fetchSpy.mockResolvedValue({
                    json: vi.fn().mockResolvedValue(Promise.reject())
                });
            });
            it("does things", async () => {
                let render: RenderHookResult;
                await act(() => {
                    render = renderHook(() => useVersion());
                });
                expect(render.result.current).toEqual(["Error", false]);
            });
        });
    });
});
