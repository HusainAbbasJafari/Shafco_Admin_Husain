'use client';
import React from 'react'
import Attribute from './Attribute'
import AttributeSet from './AttributeSet'
import { Tab, Tabs } from 'react-bootstrap'

const ManageAttribute = () => {
    return (
        <div className="custom-tab-wrapper">
        <Tabs defaultActiveKey="attributes" id="attributes-manage-tabs"  >
            <Tab eventKey={"attributes"} title="Attributes" className="pt-0">
            <Attribute/>
            </Tab>
            <Tab eventKey={"attributesset"} title="Attributes Set">
            <AttributeSet/>
            </Tab>
        </Tabs>

        </div>
    )
}

export default ManageAttribute
