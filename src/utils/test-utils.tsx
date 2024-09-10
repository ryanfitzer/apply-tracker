import type { AppStore, RootState } from '../store';
import { JobSalaryType, JobStatusType } from '../lib/types';
import React, { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import type { RenderOptions } from '@testing-library/react';
import { appListInitialState } from "../store/applications-slice";
import i18n from '../i18n';
import setupStore from '../store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export const renderHookWithProviders = (hook: any,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {},) => {
    function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
        return <I18nextProvider i18n={i18n}><Provider store={store}>{children}</Provider></I18nextProvider>;
    }

    return { store, ...renderHook(hook, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithProviders = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
        return <I18nextProvider i18n={i18n}><Provider store={store}>{children}</Provider></I18nextProvider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const defaultPreloadedState = {
    preloadedState: {
        ui: {
            modalIsVisible: true,
            chartsModalIsVisible: false
        },
        appList: {
            ...appListInitialState,
            editingJob: "123",
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