'use client'
import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import DraggablePriorityList from "./draggable-priority-list";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

const PriorityManagement = () => {

    const [enableStacking, setEnableStacking] = useState(false)
    const [pricingRules, setPricingRules] = useState([
        {
            id: 1,
            name: "Advanced Pricing (Resellers)",
            description: "Sets fixed price of ₹80 for reseller customers",
            priority: 1
        },
        {
            id: 2,
            name: "Category Rule (Shirts)",
            description: "30% discount for resellers on Shirts category",
            priority: 2
        },
        {
            id: 3,
            name: "General Catalog Rule",
            description: "10% off for all customers",
            priority: 3
        },
    ])
    const sensors = useSensors(useSensor(PointerSensor));


    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = pricingRules.findIndex((item) => item.id === active.id);
            const newIndex = pricingRules.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(pricingRules, oldIndex, newIndex).map(
                (item, idx) => ({
                    ...item,
                    priority: idx + 1,
                })
            );

            setPricingRules(newItems);
        }
    };


    return (
        <div>
            <p>Drag and drop to reorded the pricing rules. Toggle to enable disable stacking</p>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Stack Settings</Card.Title>
                    <div className="d-flex align-items-center gap-3 mt-3">
                        <div>
                            Allow stacking of multiple rules
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`flexSwitch`}
                                onChange={(e) => setEnableStacking(e.target.checked)}
                                checked={enableStacking}
                            />
                            <label className="form-check-label" htmlFor={`flexSwitch`}>
                                {enableStacking ? "Enabeled" : "Disabeled"}
                            </label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle tag="h5">
                        Pricing Rules Priority
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={pricingRules.map(rule => rule.id)} strategy={verticalListSortingStrategy}>
                            {pricingRules.map((rule) => (
                                <DraggablePriorityList key={rule.id} rule={rule} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </CardBody>
            </Card>

        </div>
    )
}

export default PriorityManagement
