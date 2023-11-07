import { useState } from "react";
import { ColorPicker } from "./ColorPicker";

function CSSColorField({ value, onUpdate }) {
  return (
    <ColorPicker value={value} />
  );
}

export function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = useState(null);
  const [secondaryColor, setSecondaryColor] = useState(null);
  const [defaultColor, setDefaultColor] = useState(null);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmit}>
      <CSSColorField value={primaryColor} onUpdate={setPrimaryColor} />
      <CSSColorField value={secondaryColor} onUpdate={setSecondaryColor} />
      <CSSColorField value={defaultColor} onUpdate={setDefaultColor} />
    </form>
  );
}
