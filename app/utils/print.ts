import { jsPDF } from "jspdf";

import { IVariable } from "../models/variable.interface";

interface IPrintOptions {
  image: HTMLImageElement;
  variables: IVariable[];
  data: any[];
  orientation: "l" | "p";
  width: number;
  height: number;
}

const print = async (options: IPrintOptions): Promise<void> => {
  await Promise.all(
    options.data.map(async (item, index) => {
      const doc = new jsPDF(options.orientation, "pt", [
        options.width,
        options.height,
      ]);

      if (options.orientation === "p") {
        doc.addImage(
          options.image.src,
          "PNG",
          0,
          0,
          options.width,
          options.height
        );
      } else if (options.orientation === "l") {
        doc.addImage(
          options.image.src,
          "PNG",
          0,
          0,
          options.height,
          options.width
        );
      }

      options.variables.forEach(({ text, x, y }) => {
        doc.text(item[text!], x!, y!);
      });

      return await doc.save(`${index + 1}.pdf`);
    })
  );
};

export { print, type IPrintOptions };
