import { ChangeEvent, useState } from "react";
import { SortDirection, UiState } from "../lib/types";
import { applicationsActions, selectApplicationSort } from "../store/applications-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import AddJob from "./AddJob";
import Modal from "./Modal";
import { uiActions } from "../store/ui-slice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useAppDispatch();
    const applicationListSort = useAppSelector(selectApplicationSort);
    const uiItem = useSelector((state: UiState) => state.ui);
    const [editOpen, setEditIsOpen] = useState(false);
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
            className={`flex flex-shrink-0 flex-col gap-3 pl-[10px] pt-[10px] sm:w-full sm:flex-row sm:justify-between sm:px-4 sm:py-2 ${
                uiItem.showMenu ? "w-[200px]" : "w-auto"
            }`}
        >
            <button className="text-left text-3xl sm:hidden" onClick={() => dispatch(uiActions.toggleMenu())}>
                {t("menu")}
            </button>
            <button
                className={`text-center text-4xl sm:hidden ${uiItem.showMenu ? "hidden" : "block"}`}
                onClick={() => dispatch(uiActions.toggleModal(true))}
            >
                +
            </button>
            <div
                className={`flex flex-col overflow-hidden sm:w-full sm:flex-row sm:justify-between ${
                    uiItem.showMenu ? "w-full" : "w-0"
                }`}
            >
                <div className="flex flex-col sm:flex-row">
                    <div className="flex">
                        <Modal open={editOpen} onOpenChange={setEditIsOpen}>
                            <Modal.Button>Add Job</Modal.Button>
                            <Modal.Content title="Add Job">
                                <AddJob afterSave={() => setEditIsOpen(false)} />
                            </Modal.Content>
                        </Modal>
                    </div>
                    <div className="flex flex-col items-center sm:ml-2 sm:border-l-2 sm:pl-2 md:flex-row">
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
                                <option value={SortDirection.ASCENDING}>Ascending</option>
                                <option value={SortDirection.DESCENDING}>Descending</option>
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
                    <div className="flex flex-col items-center sm:ml-2 sm:border-l-2 sm:pl-2 md:flex-row">
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
                            <label htmlFor="langEl" className="ml-4 cursor-pointer">
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
                    <div className="flex sm:ml-2 sm:border-l-2 sm:pl-2">
                        <button onClick={() => dispatch(uiActions.toggleChartsModal(true))}>{t("stats")}</button>
                    </div>
                </div>
                <button className="text-left sm:text-center" onClick={clearAllJobs}>
                    Clear All Jobs
                </button>
            </div>
        </header>
    );
};

export default Header;
