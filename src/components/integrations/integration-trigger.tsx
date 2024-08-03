import React from "react";
import Modal from "../custom-modal/modal";
import { Card } from "../ui/card";
import { CloudIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import IntegrationModalBody from "./integrations-modal-body";

type Props = {
  connections: { [key: string]: boolean };
  title: string;
  description: string;
  logo: string;
  name: string;
};

const IntegrationTrigger = ({
  connections,
  title,
  description,
  logo,
  name
}: Props) => {
  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={description}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2 transition-all duration-200 hover:scale-105">
          <CloudIcon />
          {connections[name] ? "connected" : "connect"}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModalBody connections={connections} type={name} />
    </Modal>
  );
};

export default IntegrationTrigger;
