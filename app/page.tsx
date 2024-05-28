"use client";

import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import useImage from "use-image";

import Table from "./components/table";
import CanvasContainer from "./components/canvas-container";
import { IVariable } from "./models/variable.interface";
import { IPrintOptions, print } from "./utils/print";

const PAGE_SIZES: {
  [key: string]: {
    widthMm: number;
    heightMm: number;
    widthPt: number;
    heightPt: number;
  };
} = {
  A4: { widthMm: 210, heightMm: 297, widthPt: 595.28, heightPt: 841.89 },
  Letter: { widthMm: 215.9, heightMm: 279.4, widthPt: 612, heightPt: 792 },
  Legal: { widthMm: 215.9, heightMm: 355.6, widthPt: 612, heightPt: 1008 },
};

const ORIENTATION: { [key: string]: "l" | "p" } = {
  Landscape: "l",
  Portrait: "p",
};

const Home: NextPage = () => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [variables, setVariables] = useState<IVariable[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<string>("Letter");
  const [orientation, setOrientation] = useState<"l" | "p">("l");

  const [image] = useImage(imageSrc || "");

  const { widthPt, heightPt } = PAGE_SIZES[pageSize];

  const width = orientation === "p" ? widthPt : heightPt;
  const height = orientation === "p" ? heightPt : widthPt;

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.target.files?.item(0);

    if (item) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(item);
    }
  };

  const printHandler = () => {
    if (!image) return;

    const options: IPrintOptions = {
      data,
      variables,
      image,
      orientation,
      width: widthPt,
      height: heightPt,
    };

    void print(options);
  };

  return (
    <>
      <div className="join">
        <input
          type="file"
          className="file-input file-input-bordered join-item"
          accept="image/png"
          onChange={handleImageUpload}
        />

        <select
          className="select select-bordered join-item"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        >
          {Object.keys(PAGE_SIZES).map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered join-item"
          value={orientation}
          onChange={(e) => setOrientation(e.target.value as "p" | "l")}
        >
          {Object.keys(ORIENTATION).map((value, index) => (
            <option key={index} value={ORIENTATION[value]}>
              {value}
            </option>
          ))}
        </select>

        <button
          className="btn join-item btn-neutral"
          disabled={!image}
          onClick={printHandler}
        >
          Print
        </button>
      </div>

      {image && (
        <CanvasContainer
          image={image}
          variables={variables}
          width={width}
          height={height}
          onUpdateVariables={setVariables}
        />
      )}

      <Table
        columns={variables}
        rows={data}
        image={image!}
        onColumnsUpdate={setVariables}
        onRowsUpdate={setData}
      />
    </>
  );
};

export default Home;
