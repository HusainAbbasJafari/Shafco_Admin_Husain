import ComponentContainerCard from '@/components/ComponentContainerCard';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import PageTItle from '@/components/PageTItle';
import UIExamplesList from '@/components/UIExamplesList';
import React from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'react-bootstrap';
const BasicExample = () => {
  return <ComponentContainerCard id="basic" title="Basic Example" description={'Set data-choices attribute to set a default single select.'}>
      <div className="w-50 mb-3">
        <ChoicesFormInput className="form-control" data-choices id="choices-single-default">
          <option>This is a placeholder</option>
          <option value="Choice 1">Choice 1</option>
          <option value="Choice 2">Choice 2</option>
          <option value="Choice 3">Choice 3</option>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const OptionGroups = () => {
  return <ComponentContainerCard id="options-group" title=" Option Groups Example" description={<>
          Set <code>data-choices data-choices-groups&quot;</code> attribute to set option group.
        </>}>
      <div className="w-50 mb-3">
        <label htmlFor="choices-single-groups" className="form-label text-muted">
          Option Groups
        </label>
        <ChoicesFormInput className="form-control" id="choices-single-groups" data-choices data-choices-groups data-placeholder="Select City">
          <option>Choose a city</option>
          <optgroup label="UK">
            <option value="London">London</option>
            <option value="Manchester">Manchester</option>
            <option value="Liverpool">Liverpool</option>
          </optgroup>
          <optgroup label="FR">
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
          </optgroup>
          <optgroup label="DE" disabled>
            <option value="Hamburg">Hamburg</option>
            <option value="Munich">Munich</option>
            <option value="Berlin">Berlin</option>
          </optgroup>
          <optgroup label="US">
            <option value="New York">New York</option>
            <option value="Washington" disabled>
              Washington
            </option>
            <option value="Michigan">Michigan</option>
          </optgroup>
          <optgroup label="SP">
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Malaga">Malaga</option>
          </optgroup>
          <optgroup label="CA">
            <option value="Montreal">Montreal</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
          </optgroup>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const OptionsAddedVia = () => {
  return <ComponentContainerCard id="options-add-no-search" title="Options added via config with no search" description={<>
          Set <code>data-choices data-choices-search-false data-choices-removeItem</code>
        </>}>
      <div className="w-50 mb-3">
        <ChoicesFormInput className="form-control" id="choices-single-no-search" data-choices data-choices-search-false data-choices-removeitem>
          <option value="Zero">Zero</option>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
          <option value="Four">Four</option>
          <option value="Five">Five</option>
          <option value="Six">Six</option>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const Sorting = () => {
  return <ComponentContainerCard id="options-add-no-sorting" title="Options added via config with no sorting" description={<>
          Set <code>data-choices data-choices-sorting-false</code> attribute.
        </>}>
      <div className="w-50 mb-3">
        <ChoicesFormInput className="form-control" id="choices-single-no-sorting" data-choices data-choices-sorting-false>
          <option value="Madrid">Madrid</option>
          <option value="Toronto">Toronto</option>
          <option value="Vancouver">Vancouver</option>
          <option value="London">London</option>
          <option value="Manchester">Manchester</option>
          <option value="Liverpool">Liverpool</option>
          <option value="Paris">Paris</option>
          <option value="Malaga">Malaga</option>
          <option value="Washington" disabled>
            Washington
          </option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Hamburg">Hamburg</option>
          <option value="Munich">Munich</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Berlin">Berlin</option>
          <option value="Montreal">Montreal</option>
          <option value="New York">New York</option>
          <option value="Michigan">Michigan</option>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const MultipleSelectInput = () => {
  return <ComponentContainerCard id="multiple-select" title="Multiple select input" description={<>
          Set <code>data-choices multiple</code> attribute.
        </>}>
      <div className="w-50 mb-3">
        <ChoicesFormInput className="form-control" id="choices-multiple-default" data-choices multiple>
          <option value="Choice 1" selected>
            Choice 1
          </option>
          <option value="Choice 2">Choice 2</option>
          <option value="Choice 3">Choice 3</option>
          <option value="Choice 4" disabled>
            Choice 4
          </option>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const MultipleWithRemove = () => {
  return <ComponentContainerCard id="multiple-select-remove" title="Multiple select With remove button input" description={<>
          Set <code>data-choices data-choices-removeItem multiple</code> attribute.
        </>}>
      <div className="w-50 mb-3">
        <ChoicesFormInput className="form-control" id="choices-multiple-remove-button" data-choices data-choices-removeitem options={{
        removeItemButton: true
      }} multiple>
          <option value="Choice 1" selected>
            Choice 1
          </option>
          <option value="Choice 2">Choice 2</option>
          <option value="Choice 3">Choice 3</option>
          <option value="Choice 4">Choice 4</option>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const MultipleWithGroups = () => {
  return <ComponentContainerCard id="multiple-groups" title="Multiple select With Option groups" description={<>
          Set <code>data-choices data-choices-multiple-groups=&quot;true&quot; multiple</code> attribute.
        </>}>
      <div className="w-50 mb-3">
        <label htmlFor="choices-multiple-groups" className="form-label text-muted">
          Option groups
        </label>
        <ChoicesFormInput className="form-control" id="choices-multiple-groups" data-choices data-choices-multiple-groups="true" multiple>
          <option>Choose a city</option>
          <optgroup label="UK">
            <option value="London">London</option>
            <option value="Manchester">Manchester</option>
            <option value="Liverpool">Liverpool</option>
          </optgroup>
          <optgroup label="FR">
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
          </optgroup>
          <optgroup label="DE" disabled>
            <option value="Hamburg">Hamburg</option>
            <option value="Munich">Munich</option>
            <option value="Berlin">Berlin</option>
          </optgroup>
          <optgroup label="US">
            <option value="New York">New York</option>
            <option value="Washington" disabled>
              Washington
            </option>
            <option value="Michigan">Michigan</option>
          </optgroup>
          <optgroup label="SP">
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Malaga">Malaga</option>
          </optgroup>
          <optgroup label="CA">
            <option value="Montreal">Montreal</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
          </optgroup>
        </ChoicesFormInput>
      </div>
    </ComponentContainerCard>;
};
const TextInput = () => {
  return <ComponentContainerCard id="text-input" title="Text Inputs" description={<>
          Set <code>data-choices data-choices-limit=&quot;Required Limit&quot; data-choices-removeItem</code> attribute.
        </>}>
      <Row>
        <Col lg={6}>
          <label htmlFor="choices-text-remove-button" className="form-label text-muted">
            Set limit values with remove button
          </label>
          <ChoicesFormInput options={{
          removeItemButton: true,
          maxItemCount: 3
        }} allowInput className="form-control" data-choices data-choices-limit={3} data-choices-removeitem defaultValue="Task-1" />
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const TextInputsWithUniqueValue = () => {
  return <ComponentContainerCard id="unique-values" title=" Text inputs in Unique values only, no pasting" description={<>
          Set <code>data-choices data-choices-text-unique-true</code> attribute.
        </>}>
      <Row>
        <Col lg={6}>
          <label htmlFor="choices-text-unique-values" className="form-label text-muted">
            Unique values only, no pasting
          </label>
          <ChoicesFormInput options={{
          duplicateItemsAllowed: false,
          paste: false
        }} allowInput className="form-control" id="choices-text-unique-values" data-choices data-choices-text-unique-true defaultValue="Project-A, Project-B" />
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const DisabledInput = () => {
  return <ComponentContainerCard id="disabled-values" title="Disabled Text Inputs" description={<>
          Set <code>data-choices data-choices-text-disabled-true</code> attribute.
        </>}>
      <div className="w-50 mb-3">
        <label htmlFor="choices-text-disabled" className="form-label text-muted">
          Disabled
        </label>
        <input disabled className="form-control" id="choices-text-disabled" data-choices data-choices-text-disabled-true type="text" defaultValue="josh@joshuajohnson.co.uk, joe@bloggs.co.uk" />
      </div>
    </ComponentContainerCard>;
};
export const metadata = {
  title: 'Select'
};
const SelectPage = () => {
  return <>
      <PageTItle title="FORM SELECT" />
      <Container>
        <Row>
          <Col xl={9}>
            <Card>
              <CardBody>
                <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                  Overview{' '}
                  <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://github.com/Choices-js/Choices" target="_blank">
                    {' '}
                    Official Website{' '}
                  </a>
                </CardTitle>
                <p className="text-muted mb-3">
                  Choices.js is a A vanilla, lightweight, configurable select box/text input plugin. Similar to Select2 and Selectize but without the
                  jQuery dependency.
                </p>
              </CardBody>
            </Card>
            <BasicExample />
            <OptionGroups />
            <OptionsAddedVia />
            <Sorting />
            <MultipleSelectInput />
            <MultipleWithRemove />
            <MultipleWithGroups />
            <TextInput />
            <TextInputsWithUniqueValue />
            <DisabledInput />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic',
            label: 'Basic Example'
          }, {
            link: '#options-group',
            label: 'Option Groups Example'
          }, {
            link: '#options-add-no-search',
            label: 'Options added via config with no search'
          }, {
            link: '#options-add-no-sorting',
            label: 'Options added via config with no sorting'
          }, {
            link: '#multiple-select',
            label: 'Multiple select input'
          }, {
            link: '#multiple-select-remove',
            label: 'Multiple select With remove button input'
          }, {
            link: '#multiple-groups',
            label: 'Multiple select With Option groups'
          }, {
            link: '#text-input',
            label: 'Text inputs'
          }, {
            link: '#unique-values',
            label: 'Text inputs in Unique values only,no pasting'
          }, {
            link: '#disabled-values',
            label: 'Disabled Text Inputs'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default SelectPage;