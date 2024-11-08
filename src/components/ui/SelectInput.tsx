import * as Select from "@radix-ui/react-select";

interface SelectOptionData {
    value: string;
    label: string;
}

const SelectInput = ({
    options,
    onChangeData,
    name
}: {
    options: SelectOptionData[];
    onChangeData: (id: string, value: string) => void;
    name: string;
}) => {
    return (
        <Select.Root onValueChange={(value) => onChangeData(name, value)}>
            <Select.Trigger>
                <Select.Value placeholder="Select a value" />
                <Select.Icon />
            </Select.Trigger>
            <Select.Content>
                {options.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                        {option.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default SelectInput;
