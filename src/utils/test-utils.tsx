import type { AppStore, RootState } from '../store';
import React, { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import type { RenderOptions } from '@testing-library/react';
import i18n from '../i18n';
import setupStore from '../store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement | any,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {},
    isHook: boolean
) {
    function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
        return <I18nextProvider i18n={i18n}><Provider store={store}>{children}</Provider></I18nextProvider>;
    }
    if (isHook) {
        return { store, ...renderHook(ui as any, { wrapper: Wrapper, ...renderOptions }) };
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}