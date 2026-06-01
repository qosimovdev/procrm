import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
  disabled,
}) {
  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full py-5.5 glass-strong text-text-primary text-base ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="glass-strong text-text-primary text-base">
        <SelectGroup>
          <SelectLabel className="text-base text-text-primary font-bold">
            {label}
          </SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-text-primary text-base"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
