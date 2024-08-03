import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion
} from "../ui/accordion";

type Props = {
  trigger: string;
  content: string;
  className?: string;
};

const Accordian = ({ trigger, content, className }: Props) => {
  return (
    <ShadcnAccordion type="single" collapsible className={className}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};

export default Accordian;
