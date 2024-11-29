import "./TagInput.css";

import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

interface Tag {
    id: string;
    text?: string | undefined | null;
    className: string;
    [key: string]: string | undefined | null;
}

/* Need to have a type here so we can use the getTags function. */
export interface TagInputComponent extends React.ForwardRefExoticComponent<{ defaultList: string[] }> {
    getTags: () => string[];
    resetTags: () => void;
}

const TagInput = forwardRef(
    (
        {
            defaultList,
            suggestions = [],
            readOnly = false
        }: { defaultList: string[]; suggestions?: Tag[]; readOnly?: boolean },
        ref
    ) => {
        const [tags, setTags] = useState<Tag[]>([]);
        useImperativeHandle(ref, () => ({
            getTags: () => tags.map((tag) => (tag.id ? tag.id : "")),
            resetTags: () => setTags([])
        }));
        useMemo(() => {
            if (defaultList && defaultList.length > 0) {
                const blah: Tag[] = [];
                for (const thing of defaultList) {
                    blah.push({
                        id: thing,
                        text: thing,
                        className: ""
                    });
                }
                setTags(blah);
            }
        }, [defaultList, setTags]);

        const handleAddition = (tag: Tag) => {
            const newTags: Tag[] = [...tags, tag];
            setTags(newTags);
        };

        const handleDelete = (i: number) => {
            const newTags: Tag[] = tags.filter((_tag, index) => index !== i);
            setTags(newTags);
        };

        const onTagUpdate = (index: number, newTag: Tag) => {
            const updatedTags = [...tags];
            updatedTags.splice(index, 1, newTag);
            setTags(updatedTags);
        };

        const onClearAll = () => {
            setTags([]);
        };

        return (
            <div id="tags">
                <ReactTags
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="top"
                    allowDragDrop={false}
                    editable={true}
                    onTagUpdate={onTagUpdate}
                    separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                    suggestions={suggestions || []}
                    maxTags={10}
                    readOnly={readOnly}
                />
            </div>
        );
    }
);

export default TagInput;
