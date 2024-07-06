import TagsInput from "@/View/Components/TagsInput"
import { useState } from "react"

const Example = () => {
  const [selected, setSelected] = useState(["papaya"]);

  return (
    <TagsInput
      value={selected}
      onChange={setSelected}
      name="fruits"
      placeHolder="enter fruits"
    />
  );
};

export default Example;