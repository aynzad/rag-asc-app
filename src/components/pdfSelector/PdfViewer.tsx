import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { pdfjs, Document, Page } from "react-pdf";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./PdfViewer.css";
import LinkService from "react-pdf/dist/esm/LinkService.js";
import { ScrollPageIntoViewArgs } from "react-pdf/dist/esm/shared/types.js";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const DEFAULT_MAX_WIDTH = 600;

type PDFFile = string | File | null;

interface PdfViewerProps {
  file: PDFFile;
  initialPageNumber?: number;
  maxWidth?: number;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PdfViewer = ({
  file,
  initialPageNumber = 1,
  maxWidth = DEFAULT_MAX_WIDTH,
}: PdfViewerProps) => {
  const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
  const [numPages, setNumPages] = useState<number>(pageNumber);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const documentRef = useRef<{
    linkService: React.RefObject<LinkService>;
    pages: React.RefObject<HTMLDivElement[]>;
    viewer: React.RefObject<{
      scrollPageIntoView: (args: ScrollPageIntoViewArgs) => void;
    }>;
  } | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setPageNumber((prev) => Math.min(prev, nextNumPages));
  }

  useEffect(() => {
    if (initialPageNumber) {
      setPageNumber(initialPageNumber);
    }
  }, [initialPageNumber]);

  return (
    <Box
      sx={{
        width: maxWidth,
        position: "relative",
      }}
    >
      <div className="PdfViewer__container">
        <div className="PdfViewer__container__document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            ref={documentRef}
          >
            <Page
              pageNumber={pageNumber}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
            />
          </Document>
        </div>
      </div>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: "50%",
          transform: "translateX(50%)",
        }}
      >
        <IconButton
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <IconButton
          disabled={pageNumber === numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
