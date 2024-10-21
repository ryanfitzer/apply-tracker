import { SortDirection, UiState } from "../lib/types";
import {
    applicationsActions,
    selectApplicationSort
} from "../store/applications-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { ChangeEvent } from "react";
import { uiActions } from "../store/ui-slice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useAppDispatch();
    const applicationListSort = useAppSelector(selectApplicationSort);
    const uiItem = useSelector((state: UiState) => state.ui);

    const clearAllJobs = () => {
        const confirm = window.confirm("are you sure?");

        if (confirm) {
            dispatch(applicationsActions.removeAllItems());
        }
    };

    const changeSortData = (event: ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { id, value }
        } = event;

        dispatch(
            applicationsActions.sortItemList({
                by: id === "sortBy" ? value : applicationListSort.by,
                dir: id === "sortDir" ? value : applicationListSort.dir
            })
        );
    };

    const onChangeLang = (event) => {
        const lang_code = event.target.value;
        i18n.changeLanguage(lang_code);
    };

    return (
        <header
            className={`flex flex-col gap-3 pt-[10px] pl-[10px] sm:px-4 sm:py-2 sm:justify-between sm:flex-row  sm:w-full flex-shrink-0 ${
                uiItem.showMenu ? "w-[200px]" : "w-auto"
            }`}
        >
            <button
                className="sm:hidden text-3xl text-left"
                onClick={() => dispatch(uiActions.toggleMenu())}
            >
                {t("menu")}
            </button>
            <button
                className={`sm:hidden text-4xl text-center ${
                    uiItem.showMenu ? "hidden" : "block"
                }`}
                onClick={() => dispatch(uiActions.toggleModal(true))}
            >
                +
            </button>
            <div
                className={`flex flex-col sm:flex-row sm:justify-between sm:w-full overflow-hidden ${
                    uiItem.showMenu ? "w-full" : "w-0"
                }`}
            >
                <div className="flex flex-col sm:flex-row ">
                    <div className="flex">
                        <button
                            onClick={() =>
                                dispatch(uiActions.toggleModal(true))
                            }
                        >
                            {t("addJob")}
                        </button>
                    </div>
                    <div className="sm:ml-2 sm:border-l-2 sm:pl-2 flex flex-col md:flex-row">
                        <p>Sort By:</p>
                        <div>
                            <select
                                className="cursor-pointer"
                                name="sortBy"
                                id="sortBy"
                                onChange={changeSortData}
                                value={applicationListSort.by}
                            >
                                <option value="jobTitle">Title</option>
                                <option value="jobApplyDate">Date</option>
                            </select>
                            <select
                                className="cursor-pointer"
                                name="sortDir"
                                id="sortDir"
                                onChange={changeSortData}
                                value={applicationListSort.dir}
                            >
                                <option value={SortDirection.ASCENDING}>
                                    Ascending
                                </option>
                                <option value={SortDirection.DESCENDING}>
                                    Descending
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* Disabling for now */}
                    {/* <div className="ml-2 border-l-2 pl-2">
                    View As:
                    <select
                        className="cursor-pointer"
                        value={applicationListViewAs}
                        onChange={(event) =>
                            dispatch(
                                applicationsActions.setViewAs(
                                    event.target.value
                                )
                            )
                        }
                    >
                        <option value="tiles">Tiles</option>
                        <option value="table">Table</option>
                    </select>
                </div> */}
                    <div className="sm:ml-2 sm:border-l-2 sm:pl-2 flex flex-col md:flex-row">
                        <p>Language:&nbsp;</p>
                        <div>
                            <label htmlFor="langEn" className="cursor-pointer">
                                <input
                                    className="cursor-pointer"
                                    id="langEn"
                                    type="radio"
                                    name="lang"
                                    value="en"
                                    onClick={onChangeLang}
                                    defaultChecked={i18n.language === "en"}
                                />
                                <span className="pl-1">EN</span>
                            </label>
                            <label
                                htmlFor="langEl"
                                className="ml-4 cursor-pointer"
                            >
                                {/*
                                Using Greek language code for now till able to
                                make a new code.
                            */}
                                <input
                                    className="cursor-pointer"
                                    id="langEl"
                                    type="radio"
                                    name="lang"
                                    value="el"
                                    onClick={onChangeLang}
                                    defaultChecked={i18n.language === "el"}
                                />
                                <span className="pl-1">Satire</span>
                            </label>
                        </div>
                    </div>
                    <div className="sm:ml-2 sm:border-l-2 sm:pl-2 flex">
                        <button
                            onClick={() =>
                                dispatch(uiActions.toggleChartsModal(true))
                            }
                        >
                            {t("stats")}
                        </button>
                    </div>
                </div>
                <button
                    className="text-left sm:text-center"
                    onClick={clearAllJobs}
                >
                    Clear All Jobs
                </button>
            </div>
        </header>
    );
};

export default Header;
