import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import Playground from "../shared/Playground";

export type DemoCodeData = { lang: string; name: string; code: string };

export type DemoCodeProps = {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  codeData: DemoCodeData[];
  relatedFAQ: string[];
  shortDescription?: string;
};

export type NestedDemoListProps = {
  data: DemoCodeProps[];
  title: ReactNode;
  description: ReactNode;
  shortDescription?: string;
};

export type DemoListProps = {
  data: (DemoCodeProps | NestedDemoListProps)[];
};

export default function DemoList({ data }: DemoListProps) {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.50rem", marginBlock: "2rem" }}
      >
        {data.map((item, indexOuter) => {
          if ("title" in item && "data" in item && "description" in item) {
            const title = item.title;
            const description = item.description;
            const shortDescription = item.shortDescription;
            return (
              <Accordion key={indexOuter}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>{title}</Typography>
                  {shortDescription && (
                    <Typography sx={{ color: "text.secondary" }}>{shortDescription}</Typography>
                  )}
                </AccordionSummary>
                <AccordionDetails sx={{ paddingBottom: 4, paddingInline: 4 }}>
                  <Box paddingBottom={2} paddingTop={0}>
                    <Typography gutterBottom>{description}</Typography>
                  </Box>
                  {item.data.map(({ children, title, ...props }, index) => (
                    <Playground displayBullets key={index} title={title} {...props}>
                      {children}
                    </Playground>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          }

          return (
            <Playground key={indexOuter} {...item}>
              {item.children}
            </Playground>
          );
        })}
      </div>
    </>
  );
}
