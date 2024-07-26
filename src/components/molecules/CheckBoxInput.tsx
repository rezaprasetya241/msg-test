import { Checkbox } from "../ui/checkbox";

interface Props {
  description: string;
}
const CheckBoxInput = ({ description }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Checkbox />
      <p>{description}</p>
    </div>
  );
};

export default CheckBoxInput;
