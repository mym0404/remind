import { useState } from "react";

type Rect = { top: number; right: number; bottom: number; left: number; width: number; height: number };
type Placement = "top" | "bottom";

export const computePopoverPosition = ({ triggerRect }: { triggerRect: Rect; floatingRect: Pick<Rect, "width" | "height">; viewportRect: Rect; preferredPlacement: Placement; offset: number }) => ({
  top: triggerRect.bottom,
  left: triggerRect.left,
  placement: "bottom" as Placement,
});

export const App = () => {
  const [open, setOpen] = useState(false);
  return <main className="app"><section className="panel stack"><p className="eyebrow">Overlay</p><h1>Popover Positioning</h1><button type="button" onClick={() => setOpen((value) => !value)}>필터</button>{open ? <div role="dialog">필터 옵션</div> : null}</section></main>;
};
