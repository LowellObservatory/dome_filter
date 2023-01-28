import React from 'react';
import {
    Form,
    Row,
    Col,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilterForm.css';

function FilterForm() {

    return (

        <Form className="filterform">
            <Form.Text className="filterform_text"> Filter </Form.Text>
            <p />
            <Row className="align-items-center">
                <Col>
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Primary Observer
                    </Form.Label>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text className="input-label">* Primary Observer</InputGroup.Text>
                        <FormControl id="inlineFormInputGroup" placeholder="Primary Observer" />
                    </InputGroup>
                </Col>
                <Col>
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Observer's Email Address
                    </Form.Label>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text className="input-label">* Observer's Email</InputGroup.Text>
                        <FormControl id="inlineFormInputGroup" placeholder="Observer's Email Address" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Text className="peopleform_text">Observer's Location</Form.Text>
                </Col>
                <Col xs="auto">
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mt-1">
                            <Form.Check
                                inline
                                label="Onsite"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <Form.Check
                                inline
                                label="Remote"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                        </div>
                    ))}
                </Col>
                <Col>
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Observer's Email Address
                    </Form.Label>
                    <InputGroup size="sm" className="mt-2">
                        <FormControl id="inlineFormInputGroup" placeholder="if remote, please specify location" />
                    </InputGroup>
                </Col>
            </Row>
            <p />
            <Row className="align-items-center">
                <Col>
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Other Participants
                    </Form.Label>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text className="input-label">Other Participants</InputGroup.Text>
                        <FormControl id="inlineFormInputGroup" placeholder="List others participating in the observation" />
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default FilterForm;