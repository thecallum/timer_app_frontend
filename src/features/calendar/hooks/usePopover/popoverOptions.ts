import { Options } from "@popperjs/core";

export const getPopoverOptions = (containerRef: HTMLDivElement | null) => {
  const options: Options = {
    placement: "right-start",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [20, -60],
        },
      },
      {
        name: "preventOverflow",
        enabled: true,
        options: {
          altAxis: true,
          tether: false,
          escapeWithReference: false,
          boundariesElement: "viewport",
          rootBoundary: containerRef,
        },
      },
    ],
  };

  return options;
};
