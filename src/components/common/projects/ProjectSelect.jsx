import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomSelect({ label, placeholder, value, onChange, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full py-5.5 glass-strong">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="glass-strong text-text-primary text-base ">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
