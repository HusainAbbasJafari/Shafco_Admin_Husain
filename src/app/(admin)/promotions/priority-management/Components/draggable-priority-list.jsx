'use client'

import IconifyIcon from "@/components/wrappers/IconifyIcon";
import {
    useSortable
} from "@dnd-kit/sortable";
import { Card, CardBody } from "react-bootstrap";
import { CSS } from "@dnd-kit/utilities";

const DraggablePriorityList = ({ rule }) => {

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: rule.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };



    return (
        <Card className="border" ref={setNodeRef} style={style} {...attributes}>
            <CardBody>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <IconifyIcon icon="solar:hamburger-menu-outline" className="fs-18 cursor-grab"  {...listeners} />
                        <div>
                            <h6 className="fw-semibold fs-16">
                                {rule.name}
                            </h6>
                            <p className="p-0 m-0">{rule.description}</p>
                        </div>
                    </div>
                    <p className="p-0 m-0">
                        Priority: {rule.priority}
                    </p>
                </div>
            </CardBody>
        </Card>

    )
}

export default DraggablePriorityList
